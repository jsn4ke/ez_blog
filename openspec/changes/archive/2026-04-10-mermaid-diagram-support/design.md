## Context

当前渲染管线（remark → remarkRehype → rehypePrettyCode → rehypeStringify）会将 ```mermaid 当作普通代码块交给 Shiki 高亮。需要在客户端识别 mermaid 代码块并用 Mermaid 库渲染为 SVG。

## Goals / Non-Goals

**Goals:**
- ```mermaid 代码块渲染为 SVG 图表
- 浅色/深色主题自动适配
- 保持代码块原始文本可复制（Mermaid 库的 pre 行为）

**Non-Goals:**
- 不支持实时编辑
- 不做 Mermaid 语法校验

## Decisions

### D1: 客户端渲染（Client Component）

选择: 用 useEffect 在客户端查找 ```mermaid 的 `<pre>` 元素，调用 `mermaid.render()` 替换为 SVG
备选: rehype 插件在构建时渲染

理由:
- rehype 插件需要额外依赖且构建时渲染无法响应主题切换
- Mermaid 库本身较大（~1MB），客户端按需加载更合理
- 客户端渲染天然支持主题切换后重新渲染

### D2: 动态导入 Mermaid

选择: `import('mermaid')` 动态导入
理由: Mermaid 库体积大，避免影响首屏加载。仅当页面包含 mermaid 代码块时才加载。

### D3: rehype-pretty-code 排除 mermaid

选择: 在 rehypePrettyCode 配置中设置 `onVisitLine` 跳过 mermaid 块，或在 CSS 中隐藏 Shiki 对 mermaid 的处理
备选: 不处理，让 Shiki 渲染后再替换

理由: Shiki 对 mermaid 语法高亮会产生乱码。通过 CSS 隐藏 Shiki 对 mermaid pre 的背景和文本着色，由 MermaidRenderer 接管显示。

## Risks / Trade-offs

- [首屏闪烁] → mermaid 代码块先显示原始文本，渲染后替换为 SVG。可通过初始隐藏 + loading 状态缓解
- [Mermaid 版本] → 固定版本避免 API 变更
