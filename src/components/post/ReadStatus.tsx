"use client";

import { useEffect, useState } from "react";
import { isPostRead } from "@/lib/reading-history";

interface ReadStatusProps {
  slug: string;
}

export default function ReadStatus({ slug }: ReadStatusProps) {
  const [read, setRead] = useState(false);

  useEffect(() => {
    setRead(isPostRead(slug));
  }, [slug]);

  if (!read) return null;

  return (
    <span
      className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] ml-2"
      title="已读"
    />
  );
}
