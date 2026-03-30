import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export interface TagInfo {
  tag: string;
  count: number;
}

function isValidPostMeta(
  data: Record<string, unknown>
): data is { title: string; date: string; excerpt?: string; tags?: string[] } {
  return typeof data.title === "string" && typeof data.date === "string";
}

function extractExcerpt(rawContent: string, excerpt?: string): string {
  if (excerpt) return excerpt;
  const text = rawContent.replace(/^#+\s+/gm, "").replace(/\n/g, " ").trim();
  return text.length > 200 ? text.slice(0, 200) + "..." : text;
}

function extractTags(data: Record<string, unknown>): string[] {
  const raw = data.tags;
  if (Array.isArray(raw) && raw.every((t) => typeof t === "string")) {
    return raw;
  }
  return [];
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      if (!isValidPostMeta(data)) {
        throw new Error(
          `Post "${slug}" is missing required fields: title and date`
        );
      }

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: extractExcerpt(content, data.excerpt),
        tags: extractTags(data),
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (!isValidPostMeta(data)) {
    throw new Error(
      `Post "${slug}" is missing required fields: title and date`
    );
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: extractExcerpt(content, data.excerpt),
    tags: extractTags(data),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getAllTags(): TagInfo[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.tags.includes(tag)
  );
}
