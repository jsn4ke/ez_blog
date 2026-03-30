"use client";

import { useEffect } from "react";
import { recordRead } from "@/lib/reading-history";

interface ReadStatusTrackerProps {
  slug: string;
}

export default function ReadStatusTracker({ slug }: ReadStatusTrackerProps) {
  useEffect(() => {
    recordRead(slug);
  }, [slug]);

  return null;
}
