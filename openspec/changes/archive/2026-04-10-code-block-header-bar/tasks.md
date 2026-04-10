## 1. 修复深色模式分块

- [x] 1.1 在 `PostBody.tsx` 中将 `keepBackground` 设为 `false`

## 2. Header bar 样式

- [x] 2.1 在 `globals.css` 中添加 `.code-header-bar` 样式（语言标签 + 复制按钮布局，浅色/深色主题适配）
- [x] 2.2 移除旧的 `.code-copy-btn` 样式（由 header bar 取代）

## 3. CodeCopyButton 重构

- [x] 3.1 重构 `CodeCopyButton.tsx`：为每个非 mermaid `<pre>` 生成 header bar（语言标签 + 复制按钮），跳过 mermaid，无语言代码块只显示悬浮复制按钮

## 4. 验证

- [x] 4.1 `npm run build` 构建通过
- [x] 4.2 本地预览，确认 header bar、语言标签、复制按钮正常
- [x] 4.3 深色模式下代码块无分块
