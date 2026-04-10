## 1. 安装依赖

- [x] 1.1 安装 `mermaid` npm 包

## 2. Mermaid 渲染组件

- [x] 2.1 创建 `src/components/post/MermaidRenderer.tsx` client component：动态导入 mermaid，查找 `pre` 中 language=mermaid 的 code 块，调用 `mermaid.render()` 替换为 SVG
- [x] 2.2 实现主题监听：监听 theme 变化，切换时重新渲染图表
- [x] 2.3 实现错误处理：渲染失败时显示错误提示

## 3. 样式

- [x] 3.1 在 `globals.css` 中添加 mermaid 容器样式（居中、圆角、背景、Shiki 高亮覆盖）

## 4. 集成

- [x] 4.1 在 `src/app/posts/[slug]/page.tsx` 中引入 MermaidRenderer

## 5. 验证

- [x] 5.1 `npm run build` 构建通过
- [ ] 5.2 本地预览 spell-state-machine-article，确认 mermaid 状态图正常渲染
- [ ] 5.3 切换主题，确认图表重新渲染
