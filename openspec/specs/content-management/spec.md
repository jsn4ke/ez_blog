### Requirement: Post file format
每篇文章 SHALL 以 Markdown 文件存储在 `content/posts/` 目录下，文件名使用英文短横线命名（如 `my-first-post.md`）。

文章文件 SHALL 包含 YAML frontmatter，格式如下：

```yaml
---
title: "文章标题"
date: "2026-03-30"
excerpt: "文章摘要，不超过 200 字"
---
```

`title` 和 `date` 字段 SHALL 为必填项。`excerpt` 为可选项，未提供时 SHALL 使用文章正文前 200 字符作为摘要。

#### Scenario: 读取有效的文章文件
- **WHEN** 系统读取一篇格式正确的 Markdown 文件
- **THEN** 系统 SHALL 解析 frontmatter 为结构化数据（title, date, excerpt）并返回 Markdown 正文内容

#### Scenario: 读取缺少必填字段的文章文件
- **WHEN** 文章文件缺少 `title` 或 `date` 字段
- **THEN** 系统 SHALL 在构建时报错并提示缺少的字段名

### Requirement: List all posts
系统 SHALL 提供 `getAllPosts()` 函数，读取 `content/posts/` 下所有 Markdown 文件，返回按日期降序排列的文章列表。

每篇文章的返回数据 SHALL 包含：slug、title、date、excerpt。

#### Scenario: 获取文章列表
- **WHEN** 调用 `getAllPosts()`
- **THEN** 返回所有文章的元数据列表，按 `date` 降序排列

#### Scenario: 空目录
- **WHEN** `content/posts/` 目录下没有 Markdown 文件
- **THEN** 返回空数组

### Requirement: Get single post by slug
系统 SHALL 提供 `getPostBySlug(slug)` 函数，根据 slug 读取对应的 Markdown 文件并返回完整的文章数据。

返回数据 SHALL 包含：slug、title、date、excerpt、content（Markdown 原文）。

#### Scenario: 获取存在的文章
- **WHEN** 调用 `getPostBySlug("my-first-post")` 且文件存在
- **THEN** 返回该文章的完整数据（slug, title, date, excerpt, content）

#### Scenario: 获取不存在的文章
- **WHEN** 调用 `getPostBySlug("non-existent")` 且文件不存在
- **THEN** 返回 `null`

### Requirement: Get all slugs
系统 SHALL 提供 `getAllSlugs()` 函数，返回所有文章的 slug 列表，用于 Next.js 的 `generateStaticParams`。

#### Scenario: 获取所有 slug
- **WHEN** 调用 `getAllSlugs()`
- **THEN** 返回字符串数组，包含所有文章的 slug