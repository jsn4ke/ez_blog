## MODIFIED Requirements

### Requirement: Homepage displays post list
首页 SHALL 展示所有已发布文章的列表，每篇文章显示标题、发布日期、摘要和标签。

文章列表 SHALL 按发布日期降序排列。点击文章标题 SHALL 跳转到文章详情页。点击标签 SHALL 跳转到该标签的筛选页。

#### Scenario: 访问首页
- **WHEN** 用户访问首页 `/`
- **THEN** 页面显示文章列表，每篇文章包含标题、日期、摘要和标签，列表按日期降序排列

#### Scenario: 点击标签
- **WHEN** 用户点击文章卡片上的标签
- **THEN** 浏览器 SHALL 导航到 `/tags/<tag>` 标签筛选页

### Requirement: Post detail page
文章详情页 SHALL 渲染 Markdown 内容为 HTML，显示文章标题、发布日期、标签，并提供返回首页的导航。

#### Scenario: 访问存在的文章
- **WHEN** 用户访问 `/posts/<slug>` 且文章存在
- **THEN** 页面显示文章标题、发布日期、标签和渲染后的 Markdown 内容

#### Scenario: 点击详情页标签
- **WHEN** 用户点击文章详情页上的标签
- **THEN** 浏览器 SHALL 导航到 `/tags/<tag>` 标签筛选页

### Requirement: Site navigation
所有页面 SHALL 包含一致的导航栏，包含博客名称、首页链接、关于页链接和标签页链接。

#### Scenario: 导航栏显示
- **WHEN** 用户访问任意页面
- **THEN** 页面顶部 SHALL 显示导航栏，包含博客名称（点击返回首页）、首页链接、关于页链接和标签页链接（Tags）
