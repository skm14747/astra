import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" className="dark">
      <body
        className="min-h-screen flex flex-col items-center justify-center antialiased"
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#0a0a1a",
          color: "#e4e4e7",
        }}
      >
        <div className="text-center px-6 max-w-lg">
          <p
            className="text-6xl font-light mb-4"
            style={{ color: "#7c5cfc" }}
          >
            404
          </p>
          <h1 className="text-2xl font-medium mb-3">
            Page not found
          </h1>
          <p className="text-sm mb-8" style={{ color: "#a1a1aa" }}>
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ background: "#7c5cfc" }}
            >
              ← Back to Home
            </Link>
            <Link
              href="/vedic/kundli/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: "#3f3f46", color: "#a1a1aa" }}
            >
              Try Kundli Calculator
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
