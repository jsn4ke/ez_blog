## Why

代码块缺少语言标签，深色模式下 Shiki 每行背景色与 `.prose pre` 的 `!important` 背景色冲突导致分块/间隙，复制按钮位置孤立。需要像 VSCode/GitHub 那样：顶部 header bar 显示语言标签 + 复制按钮，代码块背景一体无间隙。

## What Changes

- 添加代码块顶部 header bar：左上角显示语言标签，右上角复制按钮
- 修复深色模式代码块分块问题：统一背景色，去除 Shiki 行级背景
- 复制按钮从 CodeCopyButton 移入 header bar

## Capabilities

### New Capabilities
- `code-block-header-bar`: 代码块顶部栏（语言标签 + 复制按钮）+ 深色模式分块修复

### Modified Capabilities

## Impact

- `src/app/globals.css` — header bar 样式 + 代码块背景修复
- `src/components/post/CodeCopyButton.tsx` — 重构为生成 header bar（语言标签 + 复制按钮）
- `src/components/post/PostBody.tsx` — 关闭 `keepBackground` 避免 Shiki 行级背景冲突
