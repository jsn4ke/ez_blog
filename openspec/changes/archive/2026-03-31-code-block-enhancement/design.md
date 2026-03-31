## Context

当前代码块使用 `rehype-pretty-code`（Shiki）做语法高亮，`keepBackground: true` 让 Shiki 给 `<pre>` 设置主题背景色，但 Tailwind 的 `prose-pre:bg-[var(--muted)]` 覆盖了 Shiki 的背景。`--muted`（浅色 `#f5f5f5`、深色 `#1a1a1a`）与页面背景（`#ffffff`、`#0a0a0a`）太接近，导致代码块不够突出。

## Goals / Non-Goals

**Goals:**
- 代码块背景色与页面背景有明确对比度
- 添加复制按钮，点击复制代码内容
- 浅色/深色主题均适配

**Non-Goals:**
- 不改变语法高亮主题
- 不添加行号显示
- 不支持语言标签选择

## Decisions

### D1: 代码块背景色使用硬编码值而非 CSS 变量

选择: 浅色 `#f6f8fa`、深色 `#0d1117`（GitHub 原色）
备选: 修改 `--muted` 变量值

理由: `--muted` 被多处引用（表格表头、内联代码等），修改会影响全局。代码块是特殊元素，单独设色更合理。移除 PostBody 上的 `prose-pre:bg-[var(--muted)]`，让 Shiki 背景色生效，并用 globals.css 的 `.prose pre` 硬编码覆盖确保一致性。

### D2: 复制按钮使用独立 client component

选择: `CodeCopyButton` client component，通过 `useEffect` 在 `prose` 容器内查找所有 `<pre>` 并注入按钮
备选: rehype 插件在构建时插入按钮 HTML

理由: rehype 插件方式插入的按钮是静态 HTML，仍需 client-side JS 实现复制逻辑。client component 方案更直观，且可以在 hydration 后操作 DOM，避免 SSR/hydration 不匹配。

### D3: 复制按钮位置和交互

选择: 代码块右上角悬浮，点击后变为"已复制"文字，2 秒后恢复
理由: GitHub 的交互模式，用户熟悉。文字反馈比图标变化更明确。

## Risks / Trade-offs

- [hydration mismatch] → CodeCopyButton 使用 useEffect（只在客户端执行），不影响 SSR
- [大量代码块性能] → useEffect 只在 mount 时执行一次 DOM 查询，性能影响可忽略
