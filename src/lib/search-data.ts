import { getAllPosts } from "./posts";
import type { PostMeta } from "./posts";

export interface SearchItem {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

export function getSearchData(): SearchItem[] {
  return getAllPosts().map(({ slug, title, excerpt, tags }) => ({
    slug,
    title,
    excerpt,
    tags,
  }));
}

export function getSearchDataJson(): string {
  return JSON.stringify(getSearchData());
}
