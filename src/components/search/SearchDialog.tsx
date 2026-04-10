"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { searchPosts } from "@/lib/search";

interface SearchDialogProps {
  posts: PostMeta[];
}

export default function SearchDialog({ posts }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ item: { slug: string; title: string; excerpt: string; tags: string[] }; score?: number }[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchPosts(query, posts));
      setActiveIndex(0);
    } else {
      setResults([]);
    }
  }, [query, posts]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter" && results[activeIndex]) {
        setOpen(false);
      }
    },
    [results, activeIndex]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />
      <div className="relative mx-auto max-w-lg mt-[15vh] px-4">
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden">
          <div className="flex items-center px-4 border-b border-[var(--border)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-[var(--muted-foreground)]"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索文章..."
              className="w-full px-3 py-3 bg-transparent text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none text-sm"
            />
          </div>
          <div className="max-h-[50vh] overflow-y-auto">
            {query.trim() && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-[var(--muted-foreground)]">
                无搜索结果
              </div>
            )}
            {results.map((result, i) => (
              <Link
                key={result.item.slug}
                href={`/posts/${result.item.slug}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-[var(--muted)] text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <div className="font-medium">{result.item.title}</div>
                <div className="text-xs mt-0.5 truncate">{result.item.excerpt}</div>
              </Link>
            ))}
          </div>
          <div className="border-t border-[var(--border)] px-4 py-2 text-xs text-[var(--muted-foreground)] flex gap-4">
            <span>↑↓ 导航</span>
            <span>↵ 打开</span>
            <span>esc 关闭</span>
          </div>
        </div>
      </div>
    </div>
  );
}
