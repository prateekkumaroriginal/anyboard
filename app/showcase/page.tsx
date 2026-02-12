import Link from "next/link";

const variations = [
  {
    id: 1,
    title: "Compact & Dense",
    desc: "Tight spacing, small type, sharp edges. Built for power users and data-heavy screens.",
  },
  {
    id: 2,
    title: "Bold & Oversized",
    desc: "Big type, thick borders, generous padding. High-impact and impossible to miss.",
  },
  {
    id: 3,
    title: "Soft & Rounded",
    desc: "Rounded corners, subtle shadows, gentle glow. Friendly but still dark.",
  },
  {
    id: 4,
    title: "Outlined & Glowing",
    desc: "Wireframe aesthetic, amber-tinted borders, neon glow on interaction.",
  },
  {
    id: 5,
    title: "Spacious & Borderless",
    desc: "No borders, background fills only, generous whitespace. Ultra-minimal.",
  },
];

export default function ShowcaseIndex() {
  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      <div className="fixed inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[48px_48px]" />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10">
        <Link
          href="/"
          className="text-lg tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity"
        >
          AnyBoard
        </Link>
        <nav>
          <Link
            href="/"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-8 pt-16 pb-24">
        <div className="mb-4 text-amber-400/80 text-sm tracking-widest uppercase">
          Design system
        </div>
        <h1
          className="text-4xl md:text-5xl leading-tight tracking-tighter mb-4"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          STYLE VARIATIONS
        </h1>
        <p className="text-white/60 mb-16 max-w-lg">
          Five different design-system tunings of the same components. Same dark
          + amber theme, different personality.
        </p>

        <div className="space-y-4">
          {variations.map((v) => (
            <Link
              key={v.id}
              href={`/showcase/${v.id}`}
              className="group block border border-white/10 p-6 hover:border-amber-400/30 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-amber-400 text-lg font-medium tracking-tight">
                  {v.title}
                </h2>
                <span className="text-white/30 text-sm tabular-nums">
                  0{v.id} / 05
                </span>
              </div>
              <p className="text-white/50 text-sm">{v.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
