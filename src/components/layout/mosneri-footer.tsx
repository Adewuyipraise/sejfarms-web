import Link from "next/link";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { CopyrightYear } from "./copyright-year";

export function MosneriFooter() {
  return (
    <footer className="mt-24 border-t-4 border-mosneri-orange bg-mosneri-black text-white">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold text-white">
              <span className="text-mosneri-orange">Mosneri</span>foods
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Value-added fish products by Sejfarms Group.
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-medium text-mosneri-yellow">
              {site.contacts.mosnerifoods.whatsapp}
            </p>
            <p className="text-sm text-white/80">
              {site.contacts.mosnerifoods.email}
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60 md:flex-row">
          
          <p>© <CopyrightYear /> Mosnerifoods. All rights reserved. Designed & Devloped by <Link href="https://pesedierasheed.netlify.app" className="text-mosneri-orange hover:underline">Pesedie Rasheed</Link></p>
          <p>
            Powered by <Link href="https://sejfarmsgroup.com" className="text-mosneri-orange hover:underline">Sejfarms Consults Limited</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}