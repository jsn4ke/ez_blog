## MODIFIED Requirements

### Requirement: Homepage displays post list
首页 SHALL 展示所有已发布文章的列表，每篇文章显示标题、发布日期、摘要、标签和阅读状态。

已读文章 SHALL 显示已读指示标记。

#### Scenario: 访问首页
- **WHEN** 用户访问首页 `/`
- **THEN** 页面显示文章列表，每篇文章包含标题、日期、摘要、标签和已读状态

#### Scenario: 已读文章显示
- **WHEN** 用户已读过某篇文章
- **THEN** 该文章卡片 SHALL 显示已读指示标记

#### Scenario: 未读文章不显示标记
- **WHEN** 用户未读过某篇文章
- **THEN** 该文章卡片不显示已读标记

### Requirement: Post detail page
文章详情页 SHALL 渲染 Markdown 内容为 HTML，显示文章标题、发布日期、上次阅读时间、标签，并提供返回首页的导航。

文章详情页 SHALL 在桌面端采用两栏布局：左侧文章内容，右侧文章目录。

访问文章详情页时 SHALL 自动记录阅读时间到 localStorage。

#### Scenario: 访问存在的文章
- **WHEN** 用户访问 `/posts/<slug>` 且文章存在
- **THEN** 页面显示文章标题、发布日期、上次阅读时间、标签和渲染后的 Markdown 内容，桌面端右侧显示目录，localStorage 中记录阅读时间

#### Scenario: 首次访问无阅读时间
- **WHEN** 用户首次访问某篇文章
- **THEN** 不显示上次阅读时间（或显示为空状态）
