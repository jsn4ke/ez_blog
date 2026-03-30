### Requirement: Homepage displays post list
首页 SHALL 展示所有已发布文章的列表，每篇文章显示标题、发布日期和摘要。

文章列表 SHALL 按发布日期降序排列。点击文章标题 SHALL 跳转到文章详情页。

#### Scenario: 访问首页
- **WHEN** 用户访问首页 `/`
- **THEN** 页面显示文章列表，每篇文章包含标题、日期、摘要，列表按日期降序排列

#### Scenario: 首页无文章
- **WHEN** 没有已发布的文章
- **THEN** 首页 SHALL 显示友好的空状态提示

#### Scenario: 点击文章标题
- **WHEN** 用户点击文章标题
- **THEN** 浏览器 SHALL 导航到 `/posts/<slug>` 详情页

### Requirement: Post detail page
文章详情页 SHALL 渲染 Markdown 内容为 HTML，显示文章标题、发布日期，并提供返回首页的导航。

#### Scenario: 访问存在的文章
- **WHEN** 用户访问 `/posts/<slug>` 且文章存在
- **THEN** 页面显示文章标题、发布日期和渲染后的 Markdown 内容

#### Scenario: 访问不存在的文章
- **WHEN** 用户访问 `/posts/<slug>` 且文章不存在
- **THEN** 页面 SHALL 显示 404 错误页面

#### Scenario: Markdown 代码块渲染
- **WHEN** 文章中包含代码块（fenced code block）
- **THEN** 代码块 SHALL 保留原始格式，并进行语法高亮渲染

### Requirement: About page
系统 SHALL 提供关于页面 `/about`，展示博客和作者的基本介绍信息。

#### Scenario: 访问关于页
- **WHEN** 用户访问 `/about`
- **THEN** 页面显示博客介绍和作者信息

### Requirement: Site navigation
所有页面 SHALL 包含一致的导航栏，包含博客名称、首页链接和关于页链接。

#### Scenario: 导航栏显示
- **WHEN** 用户访问任意页面
- **THEN** 页面顶部 SHALL 显示导航栏，包含博客名称（点击返回首页）、首页链接和关于页链接