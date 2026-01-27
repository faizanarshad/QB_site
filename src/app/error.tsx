"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-slate-600 mb-6">
          We ran into an error. You can try again or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
