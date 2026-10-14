"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setCartOpen(document.body.dataset.cartActive === "true");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-cart-active"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappLink(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sejfarms on WhatsApp"
      className={cn(
        "fixed right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-all hover:scale-105",
        cartOpen ? "bottom-28" : "bottom-5",
      )}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}