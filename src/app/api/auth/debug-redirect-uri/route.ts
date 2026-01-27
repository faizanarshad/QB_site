import { NextResponse } from "next/server";

/**
 * Debug route: returns the redirect_uri NextAuth sends to Google.
 * We do NOT use trustHost, so redirect_uri always comes from NEXTAUTH_URL.
 * Hit /api/auth/debug-redirect-uri on production. Add add_this_exact_value to Google Console.
 * Remove this file after fixing redirect_uri_mismatch.
 */
export async function GET() {
  const base = process.env.NEXTAUTH_URL?.replace(/\/$/, "") ?? "";
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`.replace(/\/$/, "")
    : null;
  const redirectFromNextAuth = base
    ? `${base}/api/auth/callback/google`
    : null;
  const redirectFromVercel = vercel
    ? `${vercel}/api/auth/callback/google`
    : null;
  const addThisExactValue =
    redirectFromNextAuth ?? redirectFromVercel ?? "(cannot compute: set NEXTAUTH_URL in Vercel)";

  return NextResponse.json({
    NEXTAUTH_URL: base || "(not set)",
    VERCEL_URL: process.env.VERCEL_URL ?? "(not set)",
    redirect_uri_used: addThisExactValue,
    redirect_uri_if_vercel_fallback: redirectFromVercel,
    add_this_exact_value_to_google: addThisExactValue,
    fix: "Add 'add_this_exact_value_to_google' EXACTLY to Google Console → Credentials → OAuth client → Authorized redirect URIs. If it shows a Vercel URL, set NEXTAUTH_URL in Vercel to https://www.qbrixsolutions.com and redeploy.",
  });
}
