## Context

当前项目为空白状态（仅有 README 和 openspec 配置）。需要从零搭建一个最小化的博客系统，作为个人技术博客使用。目标是先建立核心功能，后续逐步扩展。

## Goals / Non-Goals

**Goals:**
- 搭建可运行的博客 MVP，包含文章列表和详情页
- 基于 Markdown 文件的内容管理，无需数据库
- 清晰的项目结构和模块划分，便于扩展
- 响应式设计，适配桌面和移动端
- 基础 SEO 支持

**Non-Goals:**
- 用户认证和后台管理系统（后续扩展）
- 评论系统（后续扩展）
- 搜索功能（后续扩展）
- 标签/分类系统（后续扩展）
- 国际化 i18n（后续扩展）
- 数据库集成（当前使用 Markdown 文件）

## Decisions

### D1: 使用 Next.js App Router

**选择**: Next.js 14+ App Router + TypeScript

**理由**:
- App Router 是 Next.js 推荐的最新路由方案，支持 Server Components、布局嵌套
- 内置 SSG（静态站点生成），博客场景天然适合
- 生态成熟，后续添加 API 路由、中间件等非常方便
- TypeScript 提供类型安全，减少运行时错误

**备选方案**:
- Pages Router：较旧，功能不如 App Router 灵活
- Astro：内容优先，但后续需要复杂交互时不如 Next.js 灵活
- Hugo：最快的静态生成器，但模板系统学习曲线高，扩展性受限

### D2: Markdown 文件内容管理

**选择**: Markdown 文件 + gray-matter（frontmatter 解析）+ remark/rehype（内容处理）

**理由**:
- Markdown 是开发者最熟悉的内容格式
- Git 版本控制，内容变更可追溯
- 无需数据库，部署简单
- gray-matter 解析 frontmatter 获取元数据（标题、日期、摘要）
- remark/rehype 生态提供 Markdown 到 HTML 的完整处理管道

**备选方案**:
- MDX：支持 JSX 组件，但增加复杂度，后续需要时再引入
- Headless CMS：功能强大但引入外部依赖，不符合最小化原则

### D3: 项目目录结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页（文章列表）
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx    # 文章详情页
│   └── about/
│       └── page.tsx        # 关于页
├── components/             # React 组件
│   ├── layout/             # 布局组件（Header, Footer, Navigation）
│   └── post/               # 文章相关组件（PostCard, PostBody）
├── lib/                    # 工具函数和配置
│   ├── posts.ts            # 文章读取和解析逻辑
│   └── constants.ts        # 站点配置常量
└── styles/                 # 全局样式
content/
└── posts/                  # Markdown 文章文件
public/
└── images/                 # 静态图片资源
```

**理由**: 按功能领域组织（app/pages/components），职责清晰，后续添加新功能（如 API、标签系统）时有明确的扩展位置。

### D4: 样式方案 — Tailwind CSS

**选择**: Tailwind CSS v4

**理由**:
- 原子化 CSS，快速构建 UI
- 内置响应式和暗色模式支持
- 与 Next.js 集成良好
- 无需维护单独的 CSS 文件

**备选方案**:
- CSS Modules：样式隔离好但开发效率低
- styled-components：运行时开销，SSG 场景不理想

### D5: 代码高亮

**选择**: rehype-pretty-code（基于 Shiki）

**理由**:
- 编译时高亮，零运行时开销
- 支持大量语言和主题
- 可同时支持亮色和暗色主题

### D6: 主题切换

**选择**: next-themes

**理由**:
- 专为 Next.js 设计
- 支持 SSR/SSG
- 自动处理闪烁问题（flash of unstyled content）

## Risks / Trade-offs

- **Markdown 文件作为内容源** → 文章数量增长后构建时间会增加，但个人博客规模下不是问题。后续可迁移至数据库。
- **静态生成 (SSG)** → 内容更新需要重新构建部署，但个人博客发布频率低，可接受。后续可通过 ISR 或 on-demand revalidation 优化。
- **无后台管理** → 需要直接编辑 Markdown 文件，对非技术用户不友好，但符合当前个人使用的定位。
