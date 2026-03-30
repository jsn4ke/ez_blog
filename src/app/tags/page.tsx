import type { Metadata } from "next";
import Link from "next/link";
import Main from "@/components/layout/Main";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all blog posts by tag.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <Main>
      <h1 className="text-2xl font-bold mb-8">Tags</h1>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-sm px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              {tag} ({count})
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted-foreground)]">
          No tags yet.
        </p>
      )}
    </Main>
  );
}
