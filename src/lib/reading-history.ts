const STORAGE_PREFIX = "readHistory:";

export function recordRead(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(STORAGE_PREFIX + slug) !== null) return;
    localStorage.setItem(STORAGE_PREFIX + slug, String(Date.now()));
  } catch {
    // localStorage unavailable
  }
}

export function isPostRead(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_PREFIX + slug) !== null;
  } catch {
    return false;
  }
}

export function getLastReadTime(slug: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + slug);
    if (!raw) return null;
    return Number(raw);
  } catch {
    return null;
  }
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  if (days < 30) return `${days} 天前`;

  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
