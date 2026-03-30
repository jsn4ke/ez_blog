## Why

长文章缺少导航手段，读者难以快速定位感兴趣的内容。同时读者无法知道上次阅读某篇文章的时间，无法区分已读和未读文章。这两个功能实现成本低、体验提升明显，是个人博客的高性价比优化。

## What Changes

- 文章详情页标题下方显示上次阅读时间（如"上次阅读: 2 小时前"）
- 使用 localStorage 记录每篇文章的最后阅读时间
- 首页文章列表中显示阅读状态（已读/未读指示）
- 文章详情页右侧显示文章目录（Table of Contents），自动提取 h2/h3 标题生成锚点导航
- 目录高亮当前阅读位置（滚动联动）
- 移动端目录折叠为可展开面板

## Capabilities

### New Capabilities

- `reading-history`: 基于 localStorage 的文章阅读时间记录，客户端组件追踪和显示上次阅读时间
- `table-of-contents`: 从 Markdown 提取标题生成目录，支持滚动高亮和移动端适配

### Modified Capabilities

- `blog-pages`: 文章详情页 header 增加上次阅读时间，首页文章卡片增加已读状态指示，页面布局增加目录侧栏

## Impact

- `src/lib/reading-history.ts` — 新增阅读历史工具函数（localStorage 读写）
- `src/components/post/ReadingTime.tsx` — 新增客户端组件，显示上次阅读时间
- `src/components/post/ReadStatus.tsx` — 新增已读/未读状态指示组件
- `src/components/post/Toc.tsx` — 新增目录组件（客户端组件）
- `src/app/posts/[slug]/page.tsx` — 页面布局改为两栏（内容 + 目录），header 增加阅读时间
- `src/components/post/PostCard.tsx` — 显示已读状态
