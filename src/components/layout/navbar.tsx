"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    setMoreOpen(false);
  }, []);


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled
          ? "border-b border-border bg-cream/95 backdrop-blur-md"
          : "bg-cream/80",
      )}
    >
      <Container className="flex h-20 items-center justify-between md:h-24">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/sejfarms-logo.png"
            alt="Sejfarms Consults Limited"
            width={200}
            height={52}
            priority
            className="h-12 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            if ("children" in item && item.children) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  <button
                    className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-brand"
                    aria-expanded={moreOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        moreOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {moreOpen && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="min-w-[200px] rounded-card border border-border bg-white p-2 shadow-lift">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-brand/5 hover:text-brand"
                            onClick={() => setMoreOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-charcoal transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/work-with-us" size="md">
            Work With Us
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>

      {open && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto border-t border-border bg-cream p-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => {
              if ("children" in item && item.children) {
                return (
                  <div key={item.label} className="py-2">
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base font-medium text-charcoal hover:bg-brand/5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-charcoal hover:bg-brand/5"
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-4">
              <Button href="/work-with-us" size="lg" className="w-full">
                Work With Us
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}