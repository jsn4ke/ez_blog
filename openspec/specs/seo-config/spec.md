### Requirement: Page title and meta description
每个页面 SHALL 包含适当的 `<title>` 和 `<meta name="description">` 标签。

首页标题格式：`<site-name> | <site-description>`
文章详情页标题格式：`<post-title> | <site-name>`
关于页标题格式：`About | <site-name>`

#### Scenario: 首页 meta 标签
- **WHEN** 用户访问首页
- **THEN** 页面 `<title>` 为 `<site-name> | <site-description>`，`<meta name="description">` 为站点描述

#### Scenario: 文章详情页 meta 标签
- **WHEN** 用户访问文章详情页
- **THEN** 页面 `<title>` 为 `<post-title> | <site-name>`，`<meta name="description">` 使用文章摘要

### Requirement: Open Graph tags
文章详情页 SHALL 包含 Open Graph 标签（og:title, og:description, og:type），便于社交媒体分享。

#### Scenario: 文章 Open Graph
- **WHEN** 用户访问文章详情页
- **THEN** 页面 SHALL 包含 `og:title`（文章标题）、`og:description`（文章摘要）、`og:type`（article）

### Requirement: Site configuration
站点信息（名称、描述、作者、URL）SHALL 集中配置在 `lib/constants.ts` 中，各页面统一引用。

#### Scenario: 修改站点信息
- **WHEN** 开发者修改 `lib/constants.ts` 中的站点配置
- **THEN** 所有页面的标题、meta 信息、页脚等 SHALL 自动使用新配置