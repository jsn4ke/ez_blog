## Why

当前 MMO 系列有 6 篇相关文章（施法状态机、效果管线、目标选择、Aura 架构、法术冷却、脚本扩展），但它们只是散落的独立文章，缺乏组织关系。读者无法直观感知这些文章的先后顺序和关联性。

## What Changes

- 支持 `series` frontmatter 字段（文章所属系列）
- 支持系列内的文章排序（`order` 字段）
- 文章详情页底部显示系列导航（上一篇/下一篇）
- 新增系列总览页 `/series`
- 系列总览页展示所有系列及其包含的文章列表

## Capabilities

### New Capabilities
- `article-series`: 文章系列组织和导航

### Modified Capabilities
- `content-management`: PostMeta 接口新增 series 和 order 字段

## Impact

- `src/lib/posts.ts` — PostMeta 新增 `series?: string`, `order?: number`；新增 `getAllSeries()`, `getPostsBySeries()` 函数
- `src/app/posts/[slug]/page.tsx` — 系列导航
- `src/app/series/page.tsx` — 系列总览页（新建）
- `content/posts/*.md` — MMO 系列文章添加 series/order frontmatter
- `src/components/layout/Header.tsx` — 导航添加 Series 链接
