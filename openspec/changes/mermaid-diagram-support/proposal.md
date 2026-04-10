## Why

当前 Markdown 中的 ```mermaid 代码块被当作普通文本渲染，不会生成图表。GitHub 会将 mermaid 代码块自动渲染为 SVG 流程图/状态图等，需要实现类似效果。

## What Changes

- 在文章详情页引入 Mermaid 库，将 ```mermaid 代码块渲染为 SVG 图表
- 支持 Mermaid 常用图表类型：flowchart、sequenceDiagram、stateDiagram、classDiagram 等
- 深色/浅色主题适配

## Capabilities

### New Capabilities
- `mermaid-rendering`: Mermaid 图表渲染支持

### Modified Capabilities

## Impact

- 新增依赖：`mermaid` npm 包
- 新增 `src/components/post/MermaidRenderer.tsx`（client component）
- `src/app/posts/[slug]/page.tsx` — 引入 MermaidRenderer
- `src/app/globals.css` — mermaid 图表容器样式
