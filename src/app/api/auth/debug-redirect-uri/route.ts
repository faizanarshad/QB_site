import { NextResponse } from "next/server";

/**
 * Debug route: returns the redirect_uri NextAuth sends to Google.
 * Hit /api/auth/debug-redirect-uri on production to verify.
 * Add this EXACT value to Google Console → Authorized redirect URIs.
 * Remove this file after fixing redirect_uri_mismatch.
 */
export async function GET() {
  const base = process.env.NEXTAUTH_URL;
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;
  const redirectUri = base
    ? `${base.replace(/\/$/, "")}/api/auth/callback/google`
    : null;
  const redirectUriVercel = vercel
    ? `${vercel.replace(/\/$/, "")}/api/auth/callback/google`
    : null;

  return NextResponse.json({
    NEXTAUTH_URL: base ?? "(not set)",
    VERCEL_URL: process.env.VERCEL_URL ?? "(not set)",
    redirect_uri_used: redirectUri ?? redirectUriVercel ?? "(cannot compute)",
    redirect_uri_vercel: redirectUriVercel,
    fix: "Add the 'redirect_uri_used' value EXACTLY to Google Console → Credentials → your OAuth client → Authorized redirect URIs. Set NEXTAUTH_URL in Vercel to your production domain (e.g. https://www.qbrixsolutions.com) if redirect_uri_used shows a Vercel URL.",
  });
}
