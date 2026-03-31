## 1. 代码块背景色

- [x] 1.1 在 `globals.css` 中添加 `.prose pre` 样式：背景色 `#f6f8fa`（浅色）、`#0d1117`（深色）、圆角 `6px`、内边距 `16px`
- [x] 1.2 在 `PostBody.tsx` 中移除 `prose-pre:bg-[var(--muted)]`，让自定义 CSS 背景色生效

## 2. 复制按钮

- [x] 2.1 创建 `src/components/post/CodeCopyButton.tsx` client component：useEffect 查找 prose 内所有 `<pre>` 并注入复制按钮
- [x] 2.2 实现复制逻辑：`navigator.clipboard.writeText()` + 点击后"已复制"反馈 + 2 秒恢复
- [x] 2.3 在 `globals.css` 中添加复制按钮样式（定位、hover、过渡动画）

## 3. 集成

- [x] 3.1 在文章详情页 `src/app/posts/[slug]/page.tsx` 中引入 `CodeCopyButton`

## 4. 验证

- [x] 4.1 `npm run build` 构建通过
- [ ] 4.2 本地预览，确认代码块背景色和复制按钮正常
