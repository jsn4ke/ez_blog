"use client";

import { useEffect, useState } from "react";
import { getLastReadTime, formatRelativeTime } from "@/lib/reading-history";

interface ReadingTimeProps {
  slug: string;
}

export default function ReadingTime({ slug }: ReadingTimeProps) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const timestamp = getLastReadTime(slug);
    if (timestamp !== null) {
      setText(formatRelativeTime(timestamp));
    }
  }, [slug]);

  if (!text) return null;

  return (
    <span className="text-sm text-[var(--muted-foreground)]">
      首次阅读: {text}
    </span>
  );
}
