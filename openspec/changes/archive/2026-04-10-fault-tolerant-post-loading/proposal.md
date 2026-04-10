## Why

当文章 Markdown 文件缺少 frontmatter 中的 title 或 date 字段时，`getAllPosts()` 和 `getPostBySlug()` 直接抛出异常，导致整个站点 500 崩溃。一篇格式错误的文章不应影响其他文章的正常展示。

## What Changes

- `getAllPosts()` 中跳过无效文章（console.warn + filter），而非 throw
- `getPostBySlug()` 中对无效文章返回 null，而非 throw

## Capabilities

### New Capabilities
- `fault-tolerant-post-loading`: 文章加载容错处理

### Modified Capabilities

## Impact

- `src/lib/posts.ts` — getAllPosts() 和 getPostBySlug() 的错误处理策略从 throw 改为 warn + skip/return null
