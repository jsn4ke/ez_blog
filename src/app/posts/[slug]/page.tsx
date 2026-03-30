import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Main from "@/components/layout/Main";
import PostBody from "@/components/post/PostBody";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { siteName } from "@/lib/constants";

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
      <Link
        href="/"
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] inline-block mb-6"
      >
        &larr; Back to home
      </Link>
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
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
        </header>
        <PostBody content={post.content} />
      </article>
    </Main>
  );
}
