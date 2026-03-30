import { author } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-[720px] mx-auto px-4 py-6 text-center text-sm text-[var(--muted-foreground)]">
        &copy; {year} {author}
      </div>
    </footer>
  );
}
