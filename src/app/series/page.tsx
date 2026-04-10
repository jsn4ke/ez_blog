import Link from "next/link";
import Main from "@/components/layout/Main";
import { getAllSeries } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Series",
  description: "Browse all article series.",
};

export default function SeriesPage() {
  const series = getAllSeries();

  return (
    <Main>
      <h1 className="text-2xl font-bold mb-8">Series</h1>
      {series.length > 0 ? (
        <div className="space-y-8">
          {series.map(({ name, posts }) => (
            <section key={name}>
              <h2 className="text-xl font-semibold mb-3">{name}</h2>
              <ol className="space-y-2">
                {posts.map((post, i) => (
                  <li key={post.slug} className="flex items-start gap-3">
                    <span className="text-sm text-[var(--muted-foreground)] shrink-0 mt-0.5">
                      {i + 1}.
                    </span>
                    <div>
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {post.title}
                      </Link>
                      <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
                        {post.excerpt}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted-foreground)]">No series yet.</p>
      )}
    </Main>
  );
}
