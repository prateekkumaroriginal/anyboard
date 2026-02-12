"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10">
        <span
          className="text-lg tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          AnyBoard
        </span>
        <nav className="flex gap-12">
          <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">
            Product
          </Link>
          <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">
            Pricing
          </Link>
          <Link href="/showcase" className="opacity-60 hover:opacity-100 transition-opacity">
            Showcase
          </Link>
          <Link
            href="/"
            className="px-5 py-2 border border-white/30 hover:bg-white hover:text-black transition-all"
          >
            Start Free
          </Link>
        </nav>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-32">
        <div className="mb-4 text-amber-400/80 text-sm tracking-widest uppercase">
          Data dashboards, redefined
        </div>
        <h1
          className="text-[clamp(3rem,10vw,7rem)] leading-[0.95] tracking-tighter mb-8"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          DEFINE YOUR
          <br />
          <span className="text-amber-400">DATA.</span>
          <br />
          VISUALIZE IT.
        </h1>
        <p className="max-w-xl text-lg text-white/70 leading-relaxed mb-12">
          Connect any source. Build any dashboard. Pay one flat fee. Unlimited
          dashboards within your tier. No surprises.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-amber-400 text-black font-medium hover:bg-amber-300 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/"
            className="px-8 py-4 border border-white/20 hover:border-white/50 transition-colors"
          >
            See Demo
          </Link>
        </div>
      </main>

      {/* Dashboard preview blocks */}
      <div className="relative z-10 px-8 pb-24">
        <div className="max-w-6xl mx-auto border border-white/10 p-1">
          <div className="grid grid-cols-12 gap-1 bg-black/50 p-4">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="col-span-3 h-24 bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span className="text-white/20 text-xs">{i < 12 ? "CHART" : "DATA"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
