import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function MosneriNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-mosneri-orange bg-mosneri-black text-white shadow-soft">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="text-mosneri-orange">Mosneri</span>
          <span className="text-white">foods</span>
          <Image
                      src="/images/businesses/mosnerifoods.jpg"
                      alt="Mosnerifoods Logo"
                      width={200}
                      height={52}
                      priority
                      className="h-10 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {/* Changed this to point to the new page */}
          <Link href="/mosnerifoods/products" className="text-sm font-medium text-white/90 transition-colors hover:text-mosneri-orange">
            Products
          </Link>
          <Link href="/mosnerifoods#about" className="text-sm font-medium text-white/90 transition-colors hover:text-mosneri-orange">
            About Us
          </Link>
          <Link href="/mosnerifoods#training" className="text-sm font-medium text-white/90 transition-colors hover:text-mosneri-orange">
            Training
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Button 
            href="https://wa.me/2347045941045" 
            variant="whatsapp" 
            external 
            size="md"
            className="border-none bg-mosneri-orange text-white hover:bg-mosneri-orange/90"
          >
            Order on WhatsApp
          </Button>
        </div>
      </Container>
    </header>
  );
}