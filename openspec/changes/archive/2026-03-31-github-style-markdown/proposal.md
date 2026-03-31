## Why

博客文章的 Markdown 渲染效果与 GitHub 原生渲染差距明显，特别是长文章（如 building-blog 那篇）。缺少等宽字体、行高偏松、引用块样式简陋、表格无斑马纹、行内代码无背景色等问题，导致阅读体验不佳。

## What Changes

- 添加 GitHub 风格的 Markdown 渲染样式（全局 CSS 覆盖）
- 优化 prose 区域排版：行高、字号、段间距
- 添加等宽字体栈（代码块和行内代码）
- 改善引用块（左边框颜色、背景色、圆角）
- 添加表格斑马纹和边框样式
- 添加行内代码背景色
- 改善分隔线样式
- 添加列表样式优化
- 改善代码块标题栏样式（与 rehype-pretty-code 配合）

## Capabilities

### New Capabilities
- `github-markdown-style`: GitHub 风格的 Markdown 内容渲染样式

### Modified Capabilities

## Impact

- `src/app/globals.css` — 新增 Markdown 渲染样式规则
- `src/components/post/PostBody.tsx` — 可能微调 prose class 配置
- 无新增依赖
