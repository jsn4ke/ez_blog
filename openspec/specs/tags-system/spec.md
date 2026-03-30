### Requirement: Parse tags from frontmatter
系统 SHALL 在解析文章 frontmatter 时读取 `tags` 字段（字符串数组类型），将其包含在 PostMeta 和 Post 的返回数据中。

`tags` 字段为可选项，未设置时 SHALL 返回空数组。

#### Scenario: 文章包含 tags 字段
- **WHEN** 文章 frontmatter 包含 `tags: ["nextjs", "react"]`
- **THEN** 系统返回 `tags: ["nextjs", "react"]`

#### Scenario: 文章不包含 tags 字段
- **WHEN** 文章 frontmatter 不包含 `tags` 字段
- **THEN** 系统返回 `tags: []`

### Requirement: Get all tags
系统 SHALL 提供 `getAllTags()` 函数，返回所有标签及其对应的文章数量，按文章数量降序排列。

返回类型为 `{ tag: string; count: number }[]`。

#### Scenario: 获取所有标签
- **WHEN** 调用 `getAllTags()`
- **THEN** 返回所有标签的列表，每个标签包含名称和文章数量，按 count 降序排列

#### Scenario: 无任何标签
- **WHEN** 没有文章包含 tags 字段
- **THEN** 返回空数组

### Requirement: Get posts by tag
系统 SHALL 提供 `getPostsByTag(tag)` 函数，返回指定标签下的所有文章，按日期降序排列。

#### Scenario: 按标签筛选文章
- **WHEN** 调用 `getPostsByTag("nextjs")` 且存在包含该标签的文章
- **THEN** 返回该标签下的所有文章列表，按日期降序排列

#### Scenario: 标签不存在
- **WHEN** 调用 `getPostsByTag("nonexistent")` 且无文章包含该标签
- **THEN** 返回空数组