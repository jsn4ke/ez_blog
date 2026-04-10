import Link from "next/link";

interface SeriesNavProps {
  series: string;
  order?: number;
}

export default async function SeriesNav({ series, order }: SeriesNavProps) {
  const { getSeriesPosts } = await import("@/lib/posts");
  const posts = getSeriesPosts(series);

  if (posts.length < 2) return null;

  const currentIndex = posts.findIndex((p) => p.order === order);
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <nav className="mt-12 pt-6 border-t border-[var(--border)]">
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors text-left"
          >
            <span className="block text-xs mb-0.5">上一篇</span>
            <span className="block truncate max-w-[200px]">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/series"
          className="text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors shrink-0"
        >
          {series} ({posts.length})
        </Link>
        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors text-right"
          >
            <span className="block text-xs mb-0.5">下一篇</span>
            <span className="block truncate max-w-[200px]">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
