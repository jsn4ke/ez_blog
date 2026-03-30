---
title: "用 Claude Code + OpenSpec 一天搭了个博客"
date: "2026-03-30"
excerpt: "记录如何用 Claude Code 和 OpenSpec 工作流在一天内从零搭建了一个功能完善的个人博客系统，包含完整的技术选型、开发过程和思考。"
tags:
  - claude-code
  - openspec
  - nextjs
  - ai-development
---

# 用 Claude Code + OpenSpec 一天搭了个博客

今天做了一个实验：让 AI 帮我从零搭建一个博客系统，但不是随便聊聊就写代码，而是用了一套规范化的工作流 —— Claude Code + OpenSpec。

这篇文章会**具体到每一条命令**，你可以完全复刻。

---

## 我的目标

在开始之前，我先想清楚了这个博客需要满足什么：

1. **最小化启动** — 不要一上来就搞复杂的全栈架构，先用最简单的方式跑起来
2. **扩展性优先** — 代码结构要清晰，后续加标签、搜索、评论时有明确的扩展点
3. **内容管理简单** — 用 Markdown + Git 管理文章，不要数据库，不要后台
4. **AI 辅助全程** — 从设计到实现到迭代，整个流程都通过 AI 完成，但要有规范约束
5. **可复现** — 任何人读这篇文章，都能复刻出类似的结果

---

## 工具和准备工作

你需要：

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — 终端内运行的 AI 编程助手
- [OpenSpec](https://github.com/nicepkg/openspec) — 结构化工作流框架
- Node.js 18+

```bash
# 安装 OpenSpec
npm install -g openspec

# 创建项目
mkdir my-blog && cd my-blog
git init
```

技术栈我没有自己选。在 proposal 阶段，AI 根据项目需求自动做了技术选型（下一节会讲到）。

---

## OpenSpec 工作流速览

整个开发过程中，所有工作都通过以下 6 个步骤循环：

| 步骤 | 命令 | 做什么 | 产出 |
|------|------|--------|------|
| 提案 | `/opsx:propose 描述需求` | AI 生成提案、设计、规范、任务 | proposal.md, design.md, specs/, tasks.md |
| 实现 | `/opsx:apply` | AI 按任务清单逐个写代码 | 代码文件 |
| 验证 | `npm run build` | 构建验证 | 确认无错误 |
| 测试 | `npm run dev` | 本地预览 | 浏览器查看效果 |
| 修复 | (直接告诉 AI) | AI 修改代码 | 代码变更 |
| 归档 | `/opsx:archive` | 保留设计决策，同步规范 | 归档目录 |

核心原则：**每做一个功能，都走完 proposal → apply → build → dev → archive 的完整流程**。

---

## 第一阶段：最小化博客

### 提出需求

项目是空的，只有 README 和 git init。我对 Claude Code 说：

```
/opsx:propose 搭建一个最小化的博客系统，方便后面扩展
```

AI 花了几秒钟，生成了完整的 change 目录 `openspec/changes/minimal-blog-system/`，包含四个文件：

**proposal.md** — 回答"为什么做"和"做什么"：

```
## Why
需要一个简洁的博客系统作为个人技术博客，当前项目为空白状态。
目标是搭建一个最小化的 MVP，覆盖博客核心功能，同时保持清晰的架构设计。

## What Changes
- 初始化 Next.js 项目
- 基于 Markdown 文件的文章内容管理
- 首页（文章列表）、文章详情页、关于页
- 响应式布局、浅色/深色主题切换、基础 SEO

## Capabilities
- content-management: 基于 Markdown 的内容管理
- blog-pages: 博客核心页面
- theme-and-layout: 响应式布局和主题切换
- seo-config: 基础 SEO 配置
```

**design.md** — 回答"怎么做"，主动做了 6 个技术决策：

```
### D1: 使用 Next.js App Router
选择: Next.js 14+ App Router + TypeScript
备选: Astro（内容优先但扩展性受限）、Hugo（快但学习曲线高）

### D2: Markdown 文件内容管理
选择: Markdown + gray-matter + remark/rehype
理由: Git 版本控制，无需数据库

### D3: Tailwind CSS v4
选择: 原子化 CSS
备选: CSS Modules（效率低）、styled-components（运行时开销）

### D4: 项目目录结构
src/app/ → src/components/ → src/lib/ → content/posts/

### D5: rehype-pretty-code（代码高亮）
### D6: next-themes（主题切换）
```

每个决策都列出了理由和备选方案。这个环节最让我惊喜 —— 我不用自己查资料对比框架，AI 帮我做了完整的分析。

**specs/** — 四个 capability 各自一个规范文件，用 WHEN/THEN 格式定义行为。比如 `content-management/spec.md`：

```
### Requirement: List all posts
#### Scenario: 获取文章列表
- **WHEN** 调用 `getAllPosts()`
- **THEN** 返回所有文章的元数据列表，按 `date` 降序排列

#### Scenario: 空目录
- **WHEN** `content/posts/` 目录下没有 Markdown 文件
- **THEN** 返回空数组
```

**tasks.md** — 29 个带编号的任务：

```
## 1. 项目初始化
- [ ] 1.1 初始化 Next.js 项目
- [ ] 1.2 安装依赖
- [ ] 1.3 清理默认模板文件

## 2. 站点配置与布局基础
- [ ] 2.1 创建 constants.ts
- [ ] 2.2 创建根布局
...
```

### 审查

AI 生成完之后，我快速过了一遍 proposal 和 design。技术选型没问题（Next.js + TypeScript + Tailwind 是经典组合），目录结构合理。唯一需要注意的是 —— AI 建议用 `create-next-app`，但实际运行时交互式 prompt 会卡住，所以后来改成了手动创建配置文件。

### 实现

确认没问题后：

```
/opsx:apply
```

Claude Code 按 29 个任务逐个实现。我全程基本只看输出，确认方向正确。遇到 `create-next-app` 的问题时，AI 自动切换到手动创建配置文件的方式。

构建完成后，目录结构长这样：

```
src/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式
│   ├── posts/[slug]/page.tsx  # 文章详情页
│   └── about/page.tsx      # 关于页
├── components/
│   ├── layout/             # Header, Footer, ThemeToggle, Main
│   └── post/               # PostCard, PostBody
└── lib/
    ├── constants.ts        # 站点配置
    └── posts.ts            # 文章读取、解析
content/posts/              # 3 篇示例文章
```

验证：

```
npm run build   # 构建成功，8 个页面全部静态生成
npm run dev     # 浏览器打开 http://localhost:3000
```

### 归档

确认没问题后：

```
/opsx:archive
```

所有设计文档移到 `openspec/changes/archive/` 目录，同时把 specs 同步到主规范目录。提交推送：

```bash
git add .
git commit -m "feat: init minimal blog system with Next.js App Router"
git push
```

**到这里，最小化博客已经上线了。** 接下来才是有意思的部分 —— 逐步迭代。

---

## 第二阶段：标签系统

博客跑起来了，3 篇示例文章，基本的阅读功能没问题。接下来我想要标签系统。

### 提出需求

```
/opsx:propose 标签/分类系统
```

AI 生成了新的 change，这次 proposal 里明确列出了影响范围：

```
## Impact
- src/lib/posts.ts — PostMeta/Post 接口新增 tags 字段
- src/components/post/PostCard.tsx — 渲染标签
- src/app/posts/[slug]/page.tsx — 详情页显示标签
- src/components/layout/Header.tsx — 导航增加 Tags 链接
- 新增页面：/tags、/tags/[tag]
```

design 里做了三个关键决策：

- `tags` 为可选字段（向后兼容现有文章）
- 路由用 `/tags` + `/tags/[tag]`（简洁直观）
- 数据函数放在 `posts.ts` 而不是单独的文件（标签数据源自文章，保持内聚）

specs 定义了两个新 capability：`tags-system`（数据层）和 `tags-pages`（页面层），同时修改了已有的 `content-management` 和 `blog-pages`。

tasks 有 10 个任务：

```
## 1. 数据层改造 (4个任务)
- posts.ts 新增 tags 字段、解析逻辑、getAllTags()、getPostsByTag()

## 2. 更新现有内容 (1个任务)
- 给 3 篇示例文章加 tags 字段

## 3. 组件更新 (3个任务)
- TagList 组件、PostCard 显示标签、详情页显示标签

## 4. 导航更新 (1个任务)
- Header 增加 Tags 链接

## 5. 标签页面 (2个任务)
- /tags 总览页、/tags/[tag] 筛选页
```

### 实现

```
/opsx:apply
```

10 个任务一次通过。构建后生成了 7 个标签页面（blog, intro, nextjs, react, tutorial, markdown, writing），全部静态生成。

### 验证和归档

本地预览没问题，归档提交。

```bash
git add .
git commit -m "feat: add tag system for blog posts"
git push
```

**从提出需求到上线，大约 15 分钟。**

---

## 第三阶段：文章目录 + 阅读历史

### 提出需求

```
/opsx:propose 文章目录+阅读时间
```

### 需求澄清

这里有个小插曲。我说的"阅读时间"，AI 理解成了"预估阅读时长"（根据字数算 3 min read）。proposal 里写的是：

```
- 显示预估阅读时间（如"3 min read"）
- 计算规则：中文字符数 + 英文单词数 = 总字数，200 字/分钟
```

我看了一眼，这不是我想要的。我想要的是**记录用户什么时候读过这篇文章**。于是跟 AI 说：

```
我得阅读时间是指上次阅读时间，调整下
```

AI 直接更新了所有 artifacts：

- proposal 改为"基于 localStorage 的文章阅读时间记录"
- 新增 `reading-history` capability（替代原来的 `reading-time`）
- design 新增了 localStorage 存储方案、相对时间格式、已读判定的决策
- specs 完全重写为 reading-history 的规范

改完后又提了一个需求：

```
在文章外面最好也能显示什么时候读过的，现在只有发布时间
```

AI 又更新了 specs，在首页 PostCard 里加上"阅读于 X 时间前"的显示。

**这种即时的需求澄清和修改，在有规范约束的情况下非常高效 —— 改 specs 比改代码容易得多。**

### 最终的设计

design 里做了这几个关键决策：

- **首次阅读 vs 上次阅读** — 只记录首次阅读的时间戳，不覆盖（重复访问不更新）
- **存储方式** — localStorage，key 格式 `readHistory:{slug}`，值为时间戳
- **时间显示** — 相对时间（"刚刚"、"5 分钟前"、"3 天前"），超过 30 天显示日期
- **目录提取** — 从 Markdown AST 提取 h2/h3，少于 3 个标题时不显示
- **桌面端** — sticky 侧栏，IntersectionObserver 高亮当前标题
- **移动端** — 右下角浮动按钮，点击展开面板

12 个任务，一次实现。

### 验证

```
npm run dev
```

打开浏览器，进一篇文章，返回首页，标题旁边出现了蓝色已读圆点和"阅读于 刚刚"。刷新页面，时间变成了"X 分钟前"。

---

## 第四阶段：修 Bug 和其他

### GFM 表格不渲染

测试时发现 Markdown 文章里的表格没渲染出来。因为 `remark` 默认不启用 GitHub Flavored Markdown 扩展。

```
npm install remark-gfm
```

在 PostBody.tsx 里加了一行：

```typescript
import remarkGfm from "remark-gfm";

// 在 remark() 管道中加 .use(remarkGfm)
```

搞定。

### 更新 README

每完成一个功能，都更新了 README：

```
/opsx:propose 更新readme
/opsx:apply
```

---

## 最终效果

一天下来，从零到上线：

```
时间线：
10:00  /opsx:propose 搭建一个最小化的博客系统
10:05  审查 proposal 和 design，确认方向
10:10  /opsx:apply → 29 个任务，最小化博客完成
11:00  本地测试，npm run build 通过
11:30  /opsx:archive，git push

14:00  /opsx:propose 标签/分类系统
14:05  /opsx:apply → 10 个任务
14:20  测试通过，/opsx:archive，git push

15:00  /opsx:propose 文章目录+阅读时间
15:05  澄清需求："阅读时间"→"首次阅读时间"
15:10  /opsx:apply → 12 个任务
15:30  本地测试，发现问题："阅读于 刚刚"永远不变
15:35  修改：recordRead 只在首次时写入，不覆盖
15:40  /opsx:archive，git push
```

最终博客功能：

| 功能 | 技术实现 |
|------|----------|
| 文章管理 | Markdown + gray-matter + Git |
| 标签系统 | frontmatter tags + getAllTags() + getPostsByTag() |
| 文章目录 | remark AST 提取 h2/h3 + IntersectionObserver 高亮 |
| 阅读历史 | localStorage + 相对时间格式化 |
| 首页已读状态 | 蓝色圆点 + "阅读于 X" |
| GFM 支持 | remark-gfm（表格、任务列表） |
| 代码高亮 | rehype-pretty-code (Shiki) |
| 主题切换 | next-themes（浅色/深色） |
| 响应式布局 | Tailwind CSS + 桌面/移动端适配 |

---

## 遇到的坑

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| `create-next-app` 卡住 | 交互式 prompt 在终端里无法输入 | 手动创建 package.json、tsconfig.json |
| `unified().use(remark)` 类型错误 | remark() 返回 Processor 不是 Plugin | 直接用 `remark()` 作为入口 |
| 中文标题做锚点乱码 | 正则没处理中文字符 | `/[^\w\u4e00-\u9fff]+/g` |
| `mv` 命令权限不足 | Windows Git Bash | 改用 `cp -r` + `rm -rf` |
| 表格不渲染 | remark 默认不开 GFM | 加 `remark-gfm` 插件 |
| 阅读时间永远是"刚刚" | recordRead 每次都覆盖时间戳 | 加 `if (exists) return` 只记录首次 |

---

## 总结

| | 传统 AI 对话 | OpenSpec 工作流 |
|--|-------------|-----------------|
| 需求 | 随口一说 | proposal.md 明确记录 |
| 设计 | AI 自行决定 | design.md 可审查、可质疑 |
| 标准 | 没有 | specs 用 WHEN/THEN 定义 |
| 实现 | 一坨代码 | 按任务清单逐步推进 |
| 需求变更 | 翻聊天记录找上下文 | 改 specs，重新 apply |
| 追溯 | 基本不可能 | 归档目录永久保留 |
| 复现 | 看运气 | 按本文步骤即可 |

核心体验：**可控感**。每一步都知道 AI 在做什么、为什么这么做。出问题了能快速定位和修复。而不是"AI 给了一坨代码，能跑就行"。

如果你想复刻这个过程，按上面的步骤从 `mkdir my-blog` 开始就行。推荐从一个小项目开始，先感受一下"有纪律的 AI 开发"是什么体验。
