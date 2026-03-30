import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="mb-8">
      <h2 className="text-xl font-semibold mb-2">
        <Link href={`/posts/${post.slug}`} className="hover:no-underline">
          {post.title}
        </Link>
      </h2>
      <time
        dateTime={post.date}
        className="text-sm text-[var(--muted-foreground)]"
      >
        {new Date(post.date).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <p className="mt-2 text-[var(--muted-foreground)]">{post.excerpt}</p>
    </article>
  );
}
