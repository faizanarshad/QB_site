import { NextRequest, NextResponse } from "next/server";

/**
 * Debug route: returns the redirect_uri NextAuth actually sends to Google.
 *
 * On Vercel, NextAuth uses the REQUEST HOST (X-Forwarded-Host or Host), NOT
 * NEXTAUTH_URL, because process.env.VERCEL is set. So we replicate that logic
 * and show both "from env" and "from request".
 *
 * Hit this URL from the SAME domain you use for sign-in (e.g. www.qbrixsolutions.com).
 * Add add_this_exact_value_to_google to Google Console → Authorized redirect URIs.
 * Remove this file after fixing redirect_uri_mismatch.
 */
export async function GET(req: NextRequest) {
  const headers = req.headers;
  const forwardedHost = headers.get("x-forwarded-host") ?? headers.get("host") ?? null;
  const proto = (headers.get("x-forwarded-proto") ?? "https") as string;
  const scheme = proto === "http" ? "http" : "https";

  // Replicate NextAuth detectOrigin: on Vercel, origin = request host
  const useRequestHost = !!(process.env.VERCEL || process.env.AUTH_TRUST_HOST);
  const originFromRequest =
    forwardedHost ? `${scheme}://${forwardedHost}` : null;
  const originFromEnv = process.env.NEXTAUTH_URL?.replace(/\/$/, "") ?? null;

  const originUsed = useRequestHost ? originFromRequest : originFromEnv;
  const base = originUsed
    ? `${originUsed}${originUsed.endsWith("/api/auth") ? "" : "/api/auth"}`
    : null;
  const redirectFromRequest = base
    ? `${base}/callback/google`
    : null;
  const redirectFromEnv = originFromEnv
    ? `${originFromEnv}/api/auth/callback/google`
    : null;

  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`.replace(/\/$/, "")
    : null;
  const redirectFromVercelEnv = vercelUrl
    ? `${vercelUrl}/api/auth/callback/google`
    : null;

  const addThisExactValue =
    redirectFromRequest ??
    redirectFromEnv ??
    redirectFromVercelEnv ??
    "(cannot compute: check NEXTAUTH_URL and request host)";

  return NextResponse.json({
    VERCEL: !!process.env.VERCEL,
    AUTH_TRUST_HOST: !!process.env.AUTH_TRUST_HOST,
    use_request_host: useRequestHost,
    host_from_request: forwardedHost,
    origin_from_request: originFromRequest,
    origin_from_NEXTAUTH_URL: originFromEnv ?? "(not set)",
    NEXTAUTH_URL: originFromEnv ?? "(not set)",
    VERCEL_URL: process.env.VERCEL_URL ?? "(not set)",
    redirect_uri_nextauth_uses: addThisExactValue,
    redirect_from_env_only: redirectFromEnv,
    add_this_exact_value_to_google: addThisExactValue,
    fix: "Add 'add_this_exact_value_to_google' EXACTLY to Google Console → Credentials → OAuth client → Authorized redirect URIs. On Vercel we use the request host, not NEXTAUTH_URL. Hit this debug URL from the same domain you use for login.",
  });
}
