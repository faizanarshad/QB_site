import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
          404
        </p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
        <p className="text-slate-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
