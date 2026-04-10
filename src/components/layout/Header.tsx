import Link from "next/link";
import { siteName } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";
import SearchButton from "./SearchButton";

export default function Header() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold hover:no-underline">
            {siteName}
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            About
          </Link>
          <Link
            href="/tags"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Tags
          </Link>
          <Link
            href="/series"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Series
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
