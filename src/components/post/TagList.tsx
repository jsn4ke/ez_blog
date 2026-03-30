import Link from "next/link";

interface TagListProps {
  tags: string[];
  size?: "sm" | "md";
}

export default function TagList({ tags, size = "sm" }: TagListProps) {
  if (tags.length === 0) return null;

  const sizeClasses =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : "text-sm px-3 py-1";

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag}`}
          className={`${sizeClasses} rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
