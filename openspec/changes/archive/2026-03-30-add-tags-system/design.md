## Context

博客当前通过 `src/lib/posts.ts` 管理文章内容，PostMeta 和 Post 接口包含 slug、title、date、excerpt。文章存储在 `content/posts/` 下，frontmatter 使用 gray-matter 解析。

## Goals / Non-Goals

**Goals:**
- 在 frontmatter 中支持 `tags` 字段（字符串数组），向后兼容（tags 可选）
- 提供标签聚合和按标签筛选的数据函数
- 新增标签总览页和标签筛选页
- 在现有页面中展示标签

**Non-Goals:**
- 标签的层级/嵌套分类
- 标签的 CRUD 管理界面
- 标签相关的 SEO 优化（后续可扩展）

## Decisions

### D1: tags 作为可选字段

**选择**: `tags` 为 `string[] | undefined`，未设置的文章视为无标签。

**理由**: 向后兼容现有文章，不需要一次性给所有文章补 tags。

### D2: 标签路由方案

**选择**: `/tags`（总览）+ `/tags/[tag]`（筛选）

**理由**: 简洁直观，符合 RESTful 风格。`/tags` 展示所有标签及文章计数，`/tags/[tag]` 展示该标签下的文章。

### D3: 标签数据函数

**选择**: 在 `posts.ts` 中新增 `getAllTags()` 和 `getPostsByTag(tag)` 两个函数。

**理由**: 标签数据源自文章，与文章管理紧密耦合，放在同一文件内保持内聚。`getAllTags()` 返回 `{ tag: string; count: number }[]`，`getPostsByTag()` 复用 `getAllPosts()` 并过滤。

## Risks / Trade-offs

- **标签大小写敏感** → 当前不强制大小写规范化，用户需自行保持一致。后续可添加自动规范化。
- **空标签页** → 没有任何标签时 `/tags` 页面显示空状态。
