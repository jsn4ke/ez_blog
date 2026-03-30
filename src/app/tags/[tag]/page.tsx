import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Main from "@/components/layout/Main";
import PostCard from "@/components/post/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}"`,
    description: `All blog posts tagged with ${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Main>
      <Link
        href="/tags"
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] inline-block mb-6"
      >
        &larr; All tags
      </Link>
      <h1 className="text-2xl font-bold mb-8">
        Posts tagged &ldquo;{tag}&rdquo;
      </h1>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </Main>
  );
}
