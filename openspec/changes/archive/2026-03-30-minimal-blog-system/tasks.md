## 1. 项目初始化

- [x] 1.1 使用 `npx create-next-app@latest` 初始化 Next.js 项目（TypeScript、Tailwind CSS、App Router、src 目录）
- [x] 1.2 安装依赖：`gray-matter`、`remark`、`remark-html`、`rehype-pretty-code`、`shiki`、`next-themes`
- [x] 1.3 清理默认模板文件，保留最小化的项目结构

## 2. 站点配置与布局基础

- [x] 2.1 创建 `src/lib/constants.ts`，定义站点信息常量（siteName, siteDescription, author, siteUrl）
- [x] 2.2 创建 `src/app/layout.tsx` 根布局，设置 HTML lang、字体、ThemeProvider（next-themes）
- [x] 2.3 创建 `src/app/globals.css`，配置 Tailwind CSS 和全局样式变量（亮色/暗色主题色）

## 3. 导航和布局组件

- [x] 3.1 创建 `src/components/layout/Header.tsx` 导航栏组件（博客名称、首页链接、关于页链接、主题切换按钮）
- [x] 3.2 创建 `src/components/layout/Footer.tsx` 页脚组件（版权信息）
- [x] 3.3 创建 `src/components/layout/ThemeToggle.tsx` 主题切换按钮组件（太阳/月亮图标）
- [x] 3.4 创建 `src/components/layout/Main.tsx` 主内容容器组件（最大宽度 720px、居中、响应式内边距）

## 4. 内容管理

- [x] 4.1 创建 `content/posts/` 目录，添加 2-3 篔示例 Markdown 文章（含 frontmatter: title, date, excerpt）
- [x] 4.2 创建 `src/lib/posts.ts`，实现 `getAllPosts()` 函数（读取所有文章，按日期降序返回元数据列表）
- [x] 4.3 实现 `getPostBySlug(slug)` 函数（读取单篇文章完整数据，不存在返回 null）
- [x] 4.4 实现 `getAllSlugs()` 函数（返回所有 slug 数组，用于 generateStaticParams）

## 5. 首页

- [x] 5.1 创建 `src/app/page.tsx`，调用 `getAllPosts()` 获取文章列表
- [x] 5.2 创建 `src/components/post/PostCard.tsx` 文章卡片组件（显示标题、日期、摘要，链接到详情页）
- [x] 5.3 实现空状态提示（无文章时的友好提示）

## 6. 文章详情页

- [x] 6.1 创建 `src/app/posts/[slug]/page.tsx`，实现 `generateStaticParams` 和文章详情渲染
- [x] 6.2 创建 `src/components/post/PostBody.tsx`，使用 remark/rehype 将 Markdown 转为 HTML 并渲染
- [x] 6.3 配置 rehype-pretty-code 实现代码块语法高亮
- [x] 6.4 实现 404 处理（文章不存在时调用 `notFound()`）

## 7. 关于页面

- [x] 7.1 创建 `src/app/about/page.tsx`，展示博客介绍和作者信息

## 8. SEO 配置

- [x] 8.1 在 `layout.tsx` 中配置站点级 metadata（title template、description）
- [x] 8.2 在文章详情页中配置文章级 metadata（title、description、Open Graph）
- [x] 8.3 在关于页中配置页面级 metadata（title、description）

## 9. 响应式适配与验证

- [x] 9.1 验证桌面端（>=768px）布局：内容居中、最大宽度 720px
- [x] 9.2 验证移动端（<768px）布局：内容全宽、左右 16px 内边距
- [x] 9.3 验证浅色/深色主题切换正常工作
- [x] 9.4 运行 `next build` 确认构建成功无错误
