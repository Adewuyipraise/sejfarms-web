import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  const orderMessage = `${whatsappMessages.productOrder}\n\n• ${product.name} — ₦${product.price.toLocaleString()} (${product.unit})`;

  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:shadow-lift">
      {product.image && (
        <div className="relative aspect-square overflow-hidden bg-brand/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand">
          {product.category}
        </span>
        <h3 className="mt-2 font-display text-h4 font-semibold text-charcoal">
          {product.name}
        </h3>
        <p className="mt-3 flex-1 text-sm text-muted">{product.description}</p>
        <p className="mt-4 font-display text-h3 font-bold text-charcoal">
          ₦{product.price.toLocaleString()}
          <span className="ml-2 text-sm font-normal text-muted">
            / {product.unit}
          </span>
        </p>
        {product.sizes && product.sizes.length > 0 && (
          <p className="mt-2 text-xs text-muted">
            Available: {product.sizes.join(" · ")}
          </p>
        )}
        <div className="mt-6">
          <Button
            href={whatsappLink(orderMessage, "mosnerifoods")}
            size="md"
            variant="primary"
            external
          >
            Order via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}