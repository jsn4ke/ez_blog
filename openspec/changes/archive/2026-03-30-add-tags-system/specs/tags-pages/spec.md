## ADDED Requirements

### Requirement: Tags overview page
系统 SHALL 提供标签总览页 `/tags`，展示所有标签及其对应文章数量。

每个标签 SHALL 为可点击链接，点击后跳转到 `/tags/[tag]` 筛选页。

#### Scenario: 访问标签总览页
- **WHEN** 用户访问 `/tags`
- **THEN** 页面显示所有标签列表，每个标签显示名称和文章数量，点击跳转到对应标签筛选页

#### Scenario: 无标签
- **WHEN** 没有任何标签
- **THEN** 页面显示友好的空状态提示

### Requirement: Tag filter page
系统 SHALL 提供标签筛选页 `/tags/[tag]`，展示该标签下的所有文章。

页面 SHALL 使用 SSG 预生成，通过 `generateStaticParams` 为每个标签生成静态页面。

#### Scenario: 访问存在的标签
- **WHEN** 用户访问 `/tags/nextjs` 且该标签存在
- **THEN** 页面显示标签名称和该标签下的所有文章列表

#### Scenario: 访问不存在的标签
- **WHEN** 用户访问 `/tags/nonexistent`
- **THEN** 页面 SHALL 显示 404 错误页面
