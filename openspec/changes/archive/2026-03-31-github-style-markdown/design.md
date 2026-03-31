## Context

当前博客使用 Tailwind CSS 的 `prose` class 做基础排版，但默认样式与 GitHub Markdown 渲染差距较大。主要问题包括：无等宽字体栈、行高偏松（prose 默认 1.75）、引用块样式简陋、表格无斑马纹、行内代码无背景色、分隔线过于粗糙。

当前渲染管线：remark → remark-gfm → remark-rehype → rehype-slug → rehype-pretty-code → rehype-stringify

## Goals / Non-Goals

**Goals:**
- 渲染效果接近 GitHub Markdown 的视觉风格
- 保持浅色/深色主题兼容
- 仅通过 CSS 覆盖实现，不引入新依赖

**Non-Goals:**
- 不追求像素级还原 GitHub
- 不引入新 npm 包
- 不改变 Markdown 解析管线

## Decisions

### D1: 纯 CSS 覆盖方案

选择: 在 `globals.css` 中通过 `.prose` 选择器添加覆盖样式
备选: 引入 `@tailwindcss/typography` 自定义 theme（过于复杂）

理由: 所有需要的改动都是视觉样式层面的，CSS 覆盖最直接，零依赖。

### D2: 等宽字体栈

选择: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace`
理由: GitHub 使用的字体栈，覆盖 macOS/Windows/Linux 平台。

### D3: 行高与排版参数

选择: 行高 1.6（GitHub 使用约 1.5-1.6），段间距 1.25em
理由: prose 默认 1.75 过于松散，1.6 更接近 GitHub 的紧凑感。

### D4: 颜色方案

选择: 使用现有 CSS 变量 `--foreground`, `--muted-foreground`, `--border`, `--accent` 作为基础，硬编码少量必要值
理由: 保持主题兼容，同时 GitHub 风格的引用块边框、代码背景等需要特定颜色。

## Risks / Trade-offs

- [深色主题细节] → 需要在 `[data-theme="dark"]` 选择器下单独适配关键颜色
- [prose 升级覆盖] → 如果未来升级 @tailwindcss/typography，CSS 优先级需确认
