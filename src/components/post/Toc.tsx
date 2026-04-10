"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/posts";

interface TocProps {
  headings: Heading[];
}

export default function Toc({ headings }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lockedRef = useRef(false);
  const unlockCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockedRef.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[visible.length - 1].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Clean up previous unlock listeners
    if (unlockCleanupRef.current) {
      unlockCleanupRef.current();
      unlockCleanupRef.current = null;
    }

    lockedRef.current = true;
    setActiveId(id);
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMobileOpen(false);

    // Unlock only when user manually scrolls (wheel, touch, or keyboard)
    const onUserScroll = () => {
      lockedRef.current = false;
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
    };

    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll);
    unlockCleanupRef.current = cleanup;
  };

  const tocItems = (
    <nav>
      <h3 className="text-sm font-semibold mb-3 text-[var(--foreground)]">
        目录
      </h3>
      <ul className="space-y-1.5 text-sm">
        {headings.map((h, i) => (
          <li key={`${h.id}-${i}`}>
            <button
              type="button"
              onClick={() => handleClick(h.id)}
              className={`text-left transition-colors hover:text-[var(--accent)] ${
                activeId === h.id
                  ? "text-[var(--accent)] font-medium"
                  : "text-[var(--muted-foreground)]"
              } ${h.level === 3 ? "pl-4" : ""}`}
            >
              {h.text}
            </button>
            {activeId === h.id && (
              <span className="block h-px bg-[var(--accent)] mt-1" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block w-48 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">{tocItems}</div>
      </aside>

      {/* Mobile: floating button + panel */}
      <div className="lg:hidden fixed bottom-6 right-6 z-10">
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed bottom-16 right-6 bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 shadow-lg w-64 max-h-[60vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute top-2 right-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-lg leading-none"
              >
                &times;
              </button>
              {tocItems}
            </div>
          </>
        )}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          aria-label="Toggle table of contents"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
