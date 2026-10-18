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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the "More" dropdown with Escape for keyboard users.
  useEffect(() => {
    if (!moreOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [moreOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-cream shadow-soft"
          : "bg-cream",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/sejfarms-logo.png"
            alt="Sejfarms Consults Limited"
            width={200}
            height={52}
            priority
            className="h-10 w-auto md:h-16"
          />
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            if ("children" in item && item.children) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
                  onFocus={() => setMoreOpen(true)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                      setMoreOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setMoreOpen((v) => !v)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-brand"
                    aria-expanded={moreOpen}
                    aria-haspopup="true"
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

        {/* Mobile menu toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-charcoal transition-colors hover:bg-brand/5 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile drawer — fixed, full-viewport overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-charcoal/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border bg-white lg:hidden">
            <nav className="flex flex-col p-4">
              {navigation.map((item) => {
                if ("children" in item && item.children) {
                  return (
                    <div key={item.label} className="py-2">
                      <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
                        {item.label}
                      </p>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-4 py-3 text-base font-medium text-charcoal hover:bg-brand/5"
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
                    className="rounded-lg px-4 py-3 text-base font-medium text-charcoal hover:bg-brand/5"
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-4 px-2">
                <Button href="/work-with-us" size="lg" className="w-full">
                  Work With Us
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}