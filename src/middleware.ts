import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  const isMosneri = host.includes("mosnerifoods.");
  
  if (isMosneri) {
    // If on root, rewrite to the landing page
    if (url.pathname === "/") {
      url.pathname = "/mosnerifoods";
      return NextResponse.rewrite(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [

    "/((?!api|_next/static|_next/image|mosneri-favicon.ico|favicon.ico|icon.*\\.png).*)",
  ],
};