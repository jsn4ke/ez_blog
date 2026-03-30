## Why

需要一个简洁的博客系统作为个人技术博客，当前项目为空白状态。目标是搭建一个最小化的 MVP，覆盖博客核心功能（文章发布、列表展示、详情阅读），同时保持清晰的架构设计，方便后续扩展评论系统、搜索、标签分类、RSS 等功能。

## What Changes

- 初始化 Next.js 项目，配置 TypeScript 和 ESLint
- 搭建项目目录结构（页面、组件、内容、样式、工具）
- 实现基于 Markdown 文件的文章内容管理（读取、解析、渲染）
- 创建首页：博客文章列表（标题、日期、摘要）
- 创建文章详情页：Markdown 渲染、代码高亮
- 创建关于页面
- 配置基础 SEO（meta tags、Open Graph）
- 响应式布局适配移动端
- 添加浅色/深色主题切换

## Capabilities

### New Capabilities

- `content-management`: 基于 Markdown 文件的内容管理，包括文章的读取、解析（frontmatter + body）和渲染
- `blog-pages`: 博客核心页面——首页（文章列表）、文章详情页、关于页
- `theme-and-layout`: 响应式布局系统、全局样式、浅色/深色主题切换
- `seo-config`: 基础 SEO 配置，包括 meta tags、Open Graph、sitemap

### Modified Capabilities

(无已有功能需要修改)

## Impact

- **代码结构**: 全新项目，从零搭建
- **依赖**: Next.js、React、TypeScript、gray-matter（frontmatter 解析）、remark/rehype（Markdown 处理）、next-themes（主题切换）
- **内容**: Markdown 文件存储在 `content/posts/` 目录下
- **部署**: 后续可部署到 Vercel、Netlify 等平台
