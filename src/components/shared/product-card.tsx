"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils"; // Added cn

type SanityProduct = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  category: string;
  description: string;
  image?: string;
  sizes?: string[];
  available: boolean;
};

type CartItem = {
  product: SanityProduct;
  quantity: number;
};

export function ProductCart({
  products,
  theme = "sejfarms", // Default theme
}: {
  products: SanityProduct[];
  theme?: "sejfarms" | "mosneri";
}) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [open, setOpen] = useState(false);

  const items = Object.values(cart);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  // Theme helpers
  const isMosneri = theme === "mosneri";
  
  const brandText = isMosneri ? "text-mosneri-orange" : "text-brand";
  const brandBg = isMosneri ? "bg-mosneri-orange text-white hover:bg-mosneri-orange/90" : "bg-brand text-white hover:bg-brand-dark";
  const brandBorder = isMosneri ? "border-mosneri-orange" : "border-brand";
  const brandLightBg = isMosneri ? "bg-mosneri-orange/5" : "bg-brand/5";
  const brandHoverBg = isMosneri ? "hover:bg-mosneri-orange/10" : "hover:bg-brand/10";
  const brandIconBg = isMosneri ? "bg-mosneri-black text-mosneri-orange" : "bg-brand text-white";

  useEffect(() => {
    if (totalItems > 0) {
      document.body.dataset.cartActive = "true";
    } else {
      delete document.body.dataset.cartActive;
    }
    return () => {
      delete document.body.dataset.cartActive;
    };
  }, [totalItems]);

  function addToCart(product: SanityProduct) {
    setCart((prev) => {
      const existing = prev[product._id];
      return {
        ...prev,
        [product._id]: {
          product,
          quantity: (existing?.quantity ?? 0) + 1,
        },
      };
    });
  }

  function updateQuantity(id: string, delta: number) {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const nextQuantity = item.quantity + delta;
      if (nextQuantity <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...item, quantity: nextQuantity } };
    });
  }

  function removeItem(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function buildOrderMessage() {
    const lines = [
      "Hello Mosnerifoods, I'd like to place the following order:",
      "",
      ...items.map(
        (item) =>
          `• ${item.product.name} — ${item.quantity} × ₦${item.product.price.toLocaleString()} (${item.product.unit}) = ₦${(item.product.price * item.quantity).toLocaleString()}`,
      ),
      "",
      `Total: ₦${totalPrice.toLocaleString()}`,
      "",
      "Please confirm availability and delivery details.",
    ];
    return lines.join("\n");
  }

  return (
    <>
      {/* Product grid */}
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {products.map((product) => {
          const inCart = cart[product._id]?.quantity ?? 0;
          return (
            <StaggerItem
              key={product._id}
              className="flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:shadow-lift"
            >
              {product.image ? (
                <div className="relative aspect-square overflow-hidden bg-gray-100 sm:aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ) : (
                <div className="relative aspect-square bg-gray-100 sm:aspect-[4/3]" />
              )}
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <span className={cn("text-[10px] font-semibold uppercase tracking-wider sm:text-xs", brandText)}>
                  {product.category}
                </span>
                <h3 className="mt-1 font-display text-sm font-semibold leading-tight text-charcoal sm:mt-1.5 sm:text-base">
                  {product.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-[11px] text-muted sm:mt-2 sm:text-xs">
                  {product.description}
                </p>
                <p className="mt-2 font-display text-base font-bold text-charcoal sm:mt-3 sm:text-lg">
                  ₦{product.price.toLocaleString()}
                  <span className="ml-1 text-[10px] font-normal text-muted sm:ml-1.5 sm:text-xs">
                    / {product.unit}
                  </span>
                </p>
                {product.sizes && product.sizes.length > 0 && (
                  <p className="mt-1 text-[10px] text-muted sm:text-xs">
                    Sizes: {product.sizes.join(" · ")}
                  </p>
                )}
                <div className="mt-3 sm:mt-4">
                  {inCart > 0 ? (
                    <div className={cn("flex items-center justify-between rounded-button border", brandBorder, brandLightBg)}>
                      <button
                        onClick={() => updateQuantity(product._id, -1)}
                        className={cn("flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10", brandText, brandHoverBg)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                      <span className={cn("font-display text-xs font-semibold sm:text-sm", brandText)}>
                        {inCart}
                      </span>
                      <button
                        onClick={() => updateQuantity(product._id, 1)}
                        className={cn("flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10", brandText, brandHoverBg)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product)}
                      size="sm"
                      className={cn("w-full", brandBg)}
                    >
                      <Plus className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Add to Cart</span>
                    </Button>
                  )}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Floating cart bar */}
      {totalItems > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white p-4 shadow-lift md:p-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-3 text-left"
            >
              <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full", brandIconBg)}>
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-charcoal">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
                <p className="text-xs text-muted">
                  ₦{totalPrice.toLocaleString()} total
                </p>
              </div>
            </button>

            <Button
              href={whatsappLink(buildOrderMessage(), "mosnerifoods")}
              size="lg"
              external
              className={cn(brandBg)}
            >
              Order Now on WhatsApp
            </Button>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex justify-end bg-charcoal/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-md flex-col bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="font-display text-h4 font-semibold">
                Your Order
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className={cn("rounded-full p-2 text-muted", brandHoverBg, "hover:text-charcoal")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-center text-sm text-muted">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product._id}
                      className="flex gap-4 border-b border-border pb-4 last:border-0"
                    >
                      {product.image && (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-charcoal">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted">
                          ₦{product.price.toLocaleString()} / {product.unit}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(product._id, -1)}
                            className={cn("flex h-7 w-7 items-center justify-center rounded border border-border", brandHoverBg)}
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-semibold">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product._id, 1)}
                            className={cn("flex h-7 w-7 items-center justify-center rounded border border-border", brandHoverBg)}
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeItem(product._id)}
                            className="ml-auto text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-sm font-semibold">
                    Total
                  </span>
                  <span className="font-display text-lg font-bold text-charcoal">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
                <Button
                  href={whatsappLink(buildOrderMessage(), "mosnerifoods")}
                  size="lg"
                  external
                  className={cn("w-full", brandBg)}
                >
                  Order on WhatsApp
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}