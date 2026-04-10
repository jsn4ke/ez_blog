## ADDED Requirements

### Requirement: 系列声明
文章 frontmatter SHALL 支持 `series` 和 `order` 字段。

#### Scenario: 文章属于某个系列
- **WHEN** 文章 frontmatter 包含 `series: "MMO 服务端架构"` 和 `order: 1`
- **THEN** 该文章被归类到 "MMO 服务端架构" 系列，系列内排序为第 1 篇

#### Scenario: 文章不属于任何系列
- **WHEN** 文章 frontmatter 不包含 `series` 字段
- **THEN** 该文章不参与系列导航

### Requirement: 系列导航
文章详情页底部 SHALL 显示同系列内的上一篇和下一篇导航。

#### Scenario: 系列内非首尾文章
- **WHEN** 用户阅读系列中排序为 2 的文章
- **THEN** 底部显示系列导航栏，左侧为上一篇（排序 1），右侧为下一篇（排序 3）

#### Scenario: 系列首篇文章
- **WHEN** 用户阅读系列中排序为 1 的文章
- **THEN** 底部导航左侧无上一篇链接，右侧为下一篇（排序 2）

#### Scenario: 不属于系列的文章
- **WHEN** 用户阅读不属于任何系列的文章
- **THEN** 底部不显示系列导航

### Requirement: 系列总览页
`/series` 页面 SHALL 展示所有系列及其文章列表。

#### Scenario: 查看所有系列
- **WHEN** 用户访问 `/series`
- **THEN** 页面展示所有系列的卡片，每个卡片包含系列名、文章数量、文章列表

### Requirement: Header 导航
Header 导航栏 SHALL 添加 Series 链接。

#### Scenario: 导航到系列页
- **WHEN** 用户点击 Header 中的 "Series" 链接
- **THEN** 跳转到 `/series` 页面
