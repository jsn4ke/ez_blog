## Why

代码块渲染与 GitHub 差距明显：背景色与页面背景对比度不足（`--muted` 太接近 `--background`），且缺少代码复制按钮。需要修复背景色并添加 GitHub 风格的复制按钮。

## What Changes

- 修复代码块背景色：浅色 `#f6f8fa`、深色 `#0d1117`，与页面背景有明显区分
- 添加代码复制按钮：代码块右上角显示 clipboard 图标，点击复制代码，复制后显示"已复制"反馈
- 代码块圆角和内边距优化

## Capabilities

### New Capabilities
- `code-block-enhancement`: 代码块背景色修复和复制按钮功能

### Modified Capabilities

## Impact

- `src/app/globals.css` — 代码块样式覆盖
- `src/components/post/PostBody.tsx` — 可能调整 prose-pre class
- 新增 `src/components/post/CodeCopyButton.tsx`（client component）
