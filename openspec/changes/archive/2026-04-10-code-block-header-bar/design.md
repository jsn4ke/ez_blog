## Context

rehype-pretty-code 用 Shiki 做语法高亮，`keepBackground: true` 时会给每行 `<span>` 添加 inline style 背景。`.prose pre` 的 `background: #0d1117 !important` 覆盖了 `<pre>` 背景，但 Shiki 的行级 inline style 优先级更高（inline > !important 不成立，但 Shiki 会给 `<code>` 内的每行 `<span>` 设背景）。实际上分块原因可能是 Shiki 给 `<code>` 设的背景与 `<pre>` 背景色不一致。

## Goals / Non-Goals

**Goals:**
- 代码块顶部 header bar：左侧语言标签，右侧复制按钮
- 深色/浅色模式下代码块背景一体，无间隙
- Mermaid 代码块被 MermaidRenderer 接管，不显示 header bar

**Non-Goals:**
- 不添加行号
- 不支持多语言 tab 切换

## Decisions

### D1: 关闭 keepBackground

选择: `keepBackground: false`，由 CSS 统一控制背景
理由: Shiki 的 inline 行级背景与 CSS `!important` 冲突导致分块。关闭后由 `.prose pre` 统一背景色，视觉上更干净一体。

### D2: Header bar 由 CodeCopyButton 组件生成

选择: CodeCopyButton 组件改造，为每个 `<pre>` 生成 header bar（语言标签 + 复制按钮），同时跳过 mermaid 的 `<pre>`（由 MermaidRenderer 接管）
理由: CodeCopyButton 已经在遍历 `<pre>` 元素，扩展为生成 header bar 最自然

### D3: Header bar 样式

选择: 半透明背景条，与代码块顶部融合，类似 GitHub 的代码块标题栏
- 浅色: `rgba(175, 184, 193, 0.15)` 背景
- 深色: `rgba(110, 118, 129, 0.15)` 背景
