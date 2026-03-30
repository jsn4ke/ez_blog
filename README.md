# EZ Blog

一个基于 Next.js 的最小化个人博客系统，追求简洁和可扩展性。

## 技术栈

| 技术 | 用途 |
|------|------|
| [Next.js 15](https://nextjs.org/) | React 全栈框架（App Router + SSG） |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Tailwind CSS v4](https://tailwindcss.com/) | 原子化 CSS 样式 |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Markdown frontmatter 解析 |
| [remark / rehype](https://github.com/remarkjs/remark) | Markdown 转 HTML 处理管道 |
| [rehype-pretty-code](https://github.com/rehype-pretty-code/rehype-pretty-code) | 代码语法高亮（基于 Shiki） |
| [next-themes](https://github.com/pacocoursey/next-themes) | 浅色/深色主题切换 |

## 已实现功能

- **文章管理** — 基于 Markdown 文件，支持 YAML frontmatter（标题、日期、摘要）
- **首页** — 文章列表，按发布日期降序排列
- **文章详情页** — Markdown 渲染、代码块语法高亮、SEO 元数据
- **关于页** — 博客和作者介绍
- **主题切换** — 浅色/深色模式，跟随系统偏好，手动切换并记住选择
- **响应式布局** — 桌面端和移动端适配
- **SEO** — 页面 meta、Open Graph 标签

## 项目结构

```
src/
├── app/                        # Next.js App Router 页面
│   ├── layout.tsx              # 根布局（ThemeProvider + SEO）
│   ├── page.tsx                # 首页（文章列表）
│   ├── globals.css             # 全局样式和主题变量
│   ├── posts/[slug]/page.tsx   # 文章详情页
│   └── about/page.tsx          # 关于页
├── components/
│   ├── layout/                 # 布局组件（Header, Footer, ThemeToggle, Main）
│   └── post/                   # 文章组件（PostCard, PostBody）
└── lib/
    ├── constants.ts            # 站点配置
    └── posts.ts                # 文章读取、解析逻辑
content/posts/                  # Markdown 文章文件
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 新增文章

在 `content/posts/` 下创建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2026-03-30"
excerpt: "文章摘要"
---

文章正文内容...
```

## 后续规划

- **标签 / 分类系统** — 文章按标签归类，支持按标签筛选
- **全文搜索** — 基于客户端搜索，快速查找文章
- **RSS 订阅** — 生成 RSS feed，支持订阅器
- **评论系统** — 集成 Giscus 或类似方案
- **文章目录（TOC）** — 自动生成侧边目录导航
- **阅读时间估算** — 根据字数计算预计阅读时间
- **图片优化** — Next.js Image 组件 + 图片懒加载
- **国际化（i18n）** — 支持中英文切换
- **后台管理** — 在线编辑和发布文章（替代直接编辑 Markdown）
- **部署自动化** — GitHub Actions CI/CD
