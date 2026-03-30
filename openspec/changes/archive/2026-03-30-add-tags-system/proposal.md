## Why

当前博客文章无分类机制，随着文章数量增长，读者难以快速找到感兴趣的内容。需要添加标签系统，支持按标签筛选文章，提升内容可发现性和浏览体验。

## What Changes

- 文章 frontmatter 新增 `tags` 字段（字符串数组）
- `src/lib/posts.ts` 新增标签相关函数：`getAllTags()`、`getPostsByTag(tag)`
- 新增标签页 `/tags`，展示所有标签及对应文章数量
- 新增标签筛选页 `/tags/[tag]`，展示该标签下的文章列表
- 首页文章卡片显示标签
- 文章详情页显示标签
- 导航栏新增 Tags 入口
- 更新现有示例文章的 frontmatter，添加 tags

## Capabilities

### New Capabilities

- `tags-system`: 标签数据层（解析、聚合、按标签筛选文章）
- `tags-pages`: 标签页面（标签总览页 `/tags`、标签筛选页 `/tags/[tag]`）

### Modified Capabilities

- `content-management`: PostMeta/Post 接口新增 `tags` 字段，frontmatter 解析支持 tags
- `blog-pages`: 首页 PostCard 显示标签，文章详情页显示标签，导航栏增加 Tags 链接

## Impact

- `src/lib/posts.ts` — 接口和函数变更（向后兼容，tags 为可选字段）
- `src/app/page.tsx` — PostCard 传递 tags
- `src/components/post/PostCard.tsx` — 渲染标签
- `src/app/posts/[slug]/page.tsx` — 渲染标签
- `src/components/layout/Header.tsx` — 导航增加 Tags 链接
- 新增页面：`/tags`、`/tags/[tag]`
- 现有 Markdown 文章需补充 tags 字段
