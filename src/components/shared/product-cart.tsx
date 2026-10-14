"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

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

export function ProductCart({ products }: { products: SanityProduct[] }) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [open, setOpen] = useState(false);

  const items = Object.values(cart);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  // Flag the body when cart has items so the WhatsApp float can shift up
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
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...item, quantity: nextQuantity } };
    });
  }

  function removeItem(id: string) {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
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
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const inCart = cart[product._id]?.quantity ?? 0;
          return (
            <div
              key={product._id}
              className="flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:shadow-lift"
            >
              {product.image ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-brand/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/3] bg-brand/5" />
              )}
              <div className="flex flex-1 flex-col p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {product.category}
                </span>
                <h3 className="mt-1.5 font-display text-base font-semibold text-charcoal">
                  {product.name}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-xs text-muted">
                  {product.description}
                </p>
                <p className="mt-3 font-display text-lg font-bold text-charcoal">
                  ₦{product.price.toLocaleString()}
                  <span className="ml-1.5 text-xs font-normal text-muted">
                    / {product.unit}
                  </span>
                </p>
                {product.sizes && product.sizes.length > 0 && (
                  <p className="mt-1 text-xs text-muted">
                    Sizes: {product.sizes.join(" · ")}
                  </p>
                )}
                <div className="mt-4">
                  {inCart > 0 ? (
                    <div className="flex items-center justify-between rounded-button border border-brand bg-brand/5">
                      <button
                        onClick={() => updateQuantity(product._id, -1)}
                        className="flex h-10 w-10 items-center justify-center text-brand hover:bg-brand/10"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-display text-sm font-semibold text-brand">
                        {inCart} in cart
                      </span>
                      <button
                        onClick={() => updateQuantity(product._id, 1)}
                        className="flex h-10 w-10 items-center justify-center text-brand hover:bg-brand/10"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product)}
                      size="sm"
                      variant="primary"
                      className="w-full"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating cart bar */}
      {totalItems > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white p-4 shadow-lift md:p-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-3 text-left"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
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
              variant="whatsapp"
              size="lg"
              external
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
                className="rounded-full p-2 text-muted hover:bg-brand/5 hover:text-charcoal"
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
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-brand/5">
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
                            className="flex h-7 w-7 items-center justify-center rounded border border-border hover:bg-brand/5"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-semibold">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product._id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded border border-border hover:bg-brand/5"
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
                  variant="whatsapp"
                  size="lg"
                  external
                  className="w-full"
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