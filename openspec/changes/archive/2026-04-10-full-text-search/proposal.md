## Why

文章数量增长后，读者只能通过标签和 TOC 导航，无法按关键词搜索文章内容。缺少搜索功能是博客可用性的核心短板。

## What Changes

- 在 Header 导航栏添加搜索按钮，点击弹出搜索面板
- 搜索面板支持关键词实时过滤文章（标题、摘要、内容）
- 显示搜索结果列表，点击跳转文章
- 键盘快捷键 `Ctrl/Cmd + K` 快速打开搜索

## Capabilities

### New Capabilities
- `full-text-search`: 客户端全文搜索

### Modified Capabilities

## Impact

- 新增依赖：`fuse.js`
- 新增 `src/components/search/SearchDialog.tsx`（client component）
- `src/lib/search.ts` — 搜索索引构建和查询
- `src/components/layout/Header.tsx` — 添加搜索按钮
- `src/app/page.tsx` — 传入文章数据给搜索组件
