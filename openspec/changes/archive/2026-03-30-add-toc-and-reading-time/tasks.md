## 1. 阅读历史

- [x] 1.1 创建 `src/lib/reading-history.ts`，实现 `recordRead(slug)`、`isPostRead(slug)`、`getLastReadTime(slug)`、`formatRelativeTime(timestamp)` 函数

## 2. 阅读时间组件

- [x] 2.1 创建 `src/components/post/ReadingTime.tsx` 客户端组件（显示"上次阅读: X 时间前"，首次访问时不显示）
- [x] 2.2 创建 `src/components/post/ReadStatus.tsx` 客户端组件（已读/未读圆点指示）

## 3. 目录数据提取

- [x] 3.1 在 `src/lib/posts.ts` 中实现 `getHeadings(content: string)` 函数（从 Markdown 提取 h2/h3）
- [x] 3.2 为 Post 接口新增可选字段 `headings`，在 `getPostBySlug()` 中计算并返回

## 4. 目录组件

- [x] 4.1 创建 `src/components/post/Toc.tsx` 客户端组件（IntersectionObserver 高亮，点击平滑滚动）
- [x] 4.2 实现桌面端 sticky 侧栏布局（>=1024px）
- [x] 4.3 实现移动端可展开悬浮面板（<1024px，TOC 按钮触发）
- [x] 4.4 标题少于 3 个时不渲染目录

## 5. 页面集成

- [x] 5.1 修改 `src/app/posts/[slug]/page.tsx`，进入页面时调用 recordRead，header 显示阅读时间，两栏布局（内容 + 目录）
- [x] 5.2 修改 `src/components/post/PostCard.tsx`，显示已读状态标记

## 6. 验证

- [x] 6.1 运行 `next build` 确认构建成功无错误
