"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "2rem", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)" }}>
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#475569", marginBottom: "1.5rem" }}>
            A critical error occurred. Try again or refresh the page.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(to right, #9333ea, #4f46e5)",
                color: "white",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid #cbd5e1",
                color: "#334155",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
