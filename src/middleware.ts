import { NextRequest, NextResponse } from "next/server";

const PRODUCTION_DOMAIN = "https://www.qbrixsolutions.com";

/**
 * Redirect *.vercel.app traffic to the custom domain.
 * This ensures the app is served from www.qbrixsolutions.com so NextAuth
 * uses that host for the OAuth redirect_uri (fixes redirect_uri_mismatch).
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  const path = req.nextUrl.pathname + req.nextUrl.search;
  const dest = new URL(path, PRODUCTION_DOMAIN);

  return NextResponse.redirect(dest, 308);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and _next.
     * Include /api so that /api/auth/* (including callback) is redirected
     * when accessed via vercel.app.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
