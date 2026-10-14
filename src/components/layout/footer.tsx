"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerNav, footerQuicklinks } from "@/content/navigation";
import { site } from "@/content/site";
import { CopyrightYear } from "./copyright-year";

export function Footer() {


  return (
    <footer className="mt-24 border-t border-border bg-charcoal text-cream">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/sejfarms-logo.png"
                alt={site.name}
                width={200}
                height={52}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm text-cream/70">
              {site.tagline}
            </p>
          </div>

          <FooterColumn title="Company"      links={footerNav.company}      />
          <FooterColumn title="Services"     links={footerNav.services}     />
          <FooterColumn title="Subsidiaries" links={footerNav.subsidiaries} />

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-cream/50">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${site.contacts.sejfarms.phone}`}
                  className="text-cream/80 hover:text-white"
                >
                  {site.contacts.sejfarms.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.contacts.sejfarms.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contacts.sejfarms.email}`}
                  className="text-cream/80 hover:text-white"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-8">
          <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-cream/50">
            Quicklinks
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3 md:grid-cols-4">
            {footerQuicklinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-cream/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-cream/50">
              Mosnerifoods
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`https://wa.me/${site.contacts.mosnerifoods.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-white"
                >
                  WhatsApp: {site.contacts.mosnerifoods.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contacts.mosnerifoods.email}`}
                  className="text-cream/80 hover:text-white"
                >
                  {site.contacts.mosnerifoods.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-cream/50">
              Follow
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li><a href={site.social.facebook}  className="text-cream/80 hover:text-white">Facebook</a></li>
              <li><a href={site.social.instagram} className="text-cream/80 hover:text-white">Instagram</a></li>
              <li><a href={site.social.linkedin}  className="text-cream/80 hover:text-white">LinkedIn</a></li>
              <li><a href={site.social.youtube}   className="text-cream/80 hover:text-white">YouTube</a></li>
              <li><a href={site.social.tiktok}    className="text-cream/80 hover:text-white">TikTok</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/60 md:flex-row md:items-center">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-cream/50">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-cream/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}