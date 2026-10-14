import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sejfarmsgroup.com"),
  title: {
    default: "Sejfarms Consults Limited — Empowering Fish Farmers",
    template: "%s | Sejfarms Consults Limited",
  },
  description:
    "An integrated African agribusiness ecosystem connecting aquaculture, agriculture, knowledge, innovation, value addition and market opportunities.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Sejfarms Consults Limited",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}