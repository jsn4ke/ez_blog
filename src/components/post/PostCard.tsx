"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import TagList from "./TagList";
import ReadStatus from "./ReadStatus";
import { useEffect, useState } from "react";
import { getLastReadTime, formatRelativeTime } from "@/lib/reading-history";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const [readTimeText, setReadTimeText] = useState<string | null>(null);

  useEffect(() => {
    const timestamp = getLastReadTime(post.slug);
    if (timestamp !== null) {
      setReadTimeText(formatRelativeTime(timestamp));
    }
  }, [post.slug]);

  return (
    <article className="mb-8">
      <h2 className="text-xl font-semibold mb-2">
        <Link href={`/posts/${post.slug}`} className="hover:no-underline">
          {post.title}
        </Link>
        <ReadStatus slug={post.slug} />
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
      {readTimeText && (
        <span className="text-sm text-[var(--muted-foreground)] ml-2">
          阅读于 {readTimeText}
        </span>
      )}
      <TagList tags={post.tags} />
      <p className="mt-2 text-[var(--muted-foreground)]">{post.excerpt}</p>
    </article>
  );
}
