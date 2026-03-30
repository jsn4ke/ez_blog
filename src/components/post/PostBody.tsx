import { remark } from "remark";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

interface PostBodyProps {
  content: string;
}

export default async function PostBody({ content }: PostBodyProps) {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: {
        dark: "github-dark-dimmed",
        light: "github-light",
      },
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-pre:bg-[var(--muted)] prose-pre:border prose-pre:border-[var(--border)]
        prose-code:text-sm
        prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
        prose-headings:text-[var(--foreground)]
        prose-p:text-[var(--foreground)] prose-p:leading-relaxed
        prose-li:text-[var(--foreground)]
        prose-strong:text-[var(--foreground)]"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
