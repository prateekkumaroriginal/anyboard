import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
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
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" fallbackRedirectUrl="/projects">
            <Button variant="outline">
              Start Free
            </Button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}
