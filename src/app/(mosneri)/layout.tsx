import type { Metadata } from "next";
import { MosneriNavbar } from "@/components/layout/mosneri-navbar";
import { MosneriFooter } from "@/components/layout/mosneri-footer";

export const metadata: Metadata = {
  title: "Mosnerifoods",
  description: "Premium value-added fish products by Sejfarms.",
  icons: {
    icon: [
      { url: "/mosneri-favicon.ico", type: "image/x-icon" },
    ],
  },
};

export default function MosneriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MosneriNavbar />
      <main>{children}</main>
      <MosneriFooter />
    </>
  );
}