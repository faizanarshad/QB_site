"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  Callback:
    "Sign-in failed after Google redirected back. Check Vercel logs for OAUTH_CALLBACK_HANDLER_ERROR, or try again.",
  OAuthCallback:
    "Google sign-in failed (token exchange). Ensure redirect URI and cookies are correct.",
  OAuthAccountNotLinked:
    "This email is already linked to another sign-in method. Use that method instead.",
  AccessDenied: "You do not have permission to sign in.",
  Configuration: "Server auth configuration error. Check NEXTAUTH_* and provider env vars.",
  Default: "Sign-in failed. Try again or use a different account.",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("callbackUrl") ?? "/";
  const callbackUrl =
    typeof window !== "undefined" && from.startsWith("/")
      ? `${window.location.origin}${from}`
      : from;
  const error = searchParams.get("error") ?? "";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 p-8">
        <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
          Sign in to QBrix
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center text-sm mb-8">
          Use your Google or Microsoft account. Your details will be saved in our
          system.
        </p>
        {error && (
          <div
            className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm"
            role="alert"
          >
            <p className="font-medium">
              {ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default}
            </p>
            {error === "Callback" && (
              <p className="mt-2 text-amber-700 dark:text-amber-300">
                Set <code className="text-xs">NEXTAUTH_DEBUG=1</code> in Vercel
                and redeploy, then check function logs for the real error.
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-800 dark:text-slate-200 font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => signIn("azure-ad", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-800 dark:text-slate-200 font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M1 13h10v10H1z" />
              <path fill="#05a6f0" d="M13 1h10v10H13z" />
              <path fill="#ffba08" d="M13 13h10v10H13z" />
            </svg>
            Continue with Microsoft
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <div className="animate-pulse text-slate-500">Loading…</div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
