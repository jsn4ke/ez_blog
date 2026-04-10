import Fuse from "fuse.js";
import type { PostMeta } from "./posts";

export interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

let fuseInstance: Fuse<SearchResult> | null = null;

function getFuse(posts: PostMeta[]): Fuse<SearchResult> {
  if (!fuseInstance) {
    const items: SearchResult[] = posts.map(({ slug, title, excerpt, tags }) => ({
      slug,
      title,
      excerpt,
      tags,
    }));

    fuseInstance = new Fuse(items, {
      keys: [
        { name: "title", weight: 2 },
        { name: "excerpt", weight: 1 },
        { name: "tags", weight: 0.5 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }
  return fuseInstance;
}

export function searchPosts(query: string, posts: PostMeta[]): { item: SearchResult; score?: number }[] {
  if (!query.trim()) return [];
  return getFuse(posts).search(query);
}
