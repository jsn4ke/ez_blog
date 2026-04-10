"use client";

import { useEffect, useState } from "react";
import SearchDialog from "./SearchDialog";

interface SearchProviderProps {
  searchUrl: string;
}

export default function SearchProvider({ searchUrl }: SearchProviderProps) {
  const [posts, setPosts] = useState<{ slug: string; title: string; excerpt: string; tags: string[] }[]>([]);

  useEffect(() => {
    fetch(searchUrl)
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => {});
  }, [searchUrl]);

  return <SearchDialog posts={posts as any} />;
}
