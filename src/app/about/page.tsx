import type { Metadata } from "next";
import Main from "@/components/layout/Main";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about this blog and the author.",
};

export default function AboutPage() {
  return (
    <Main>
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <div className="space-y-4 text-[var(--foreground)] leading-relaxed">
        <p>
          Welcome to EZ Blog — a minimal blog about technology, programming,
          and things I find interesting along the way.
        </p>
        <p>
          This blog is built with Next.js, TypeScript, and Tailwind CSS.
          Content is written in Markdown and managed through Git.
        </p>
        <p>
          The goal is to keep things simple and focused, sharing what I learn
          and discover in the world of software development.
        </p>
      </div>
    </Main>
  );
}
