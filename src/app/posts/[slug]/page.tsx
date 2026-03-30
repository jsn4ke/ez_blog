import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Main from "@/components/layout/Main";
import PostBody from "@/components/post/PostBody";
import TagList from "@/components/post/TagList";
import ReadingTime from "@/components/post/ReadingTime";
import ReadStatusTracker from "@/components/post/ReadStatusTracker";
import Toc from "@/components/post/Toc";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Main>
      <ReadStatusTracker slug={slug} />
      <Link
        href="/"
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] inline-block mb-6"
      >
        &larr; Back to home
      </Link>
      <div className="flex gap-8">
        <article className="flex-1 min-w-0">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted-foreground)]">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <ReadingTime slug={slug} />
            </div>
            <div className="mt-3">
              <TagList tags={post.tags} size="md" />
            </div>
          </header>
          <PostBody content={post.content} />
        </article>
        <Toc headings={post.headings} />
      </div>
    </Main>
  );
}
