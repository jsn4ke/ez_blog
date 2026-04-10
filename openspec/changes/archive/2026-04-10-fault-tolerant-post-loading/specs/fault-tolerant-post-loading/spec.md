## ADDED Requirements

### Requirement: getAllPosts 容错
`getAllPosts()` 遇到无效文章时 SHALL 跳过该文章并输出警告日志，而非抛出异常。

#### Scenario: 部分文章缺少 title
- **WHEN** content/posts 下有多篇文章，其中一篇缺少 title 字段
- **THEN** getAllPosts() 返回其他有效文章的列表，控制台输出 warn 日志

#### Scenario: 部分文章缺少 date
- **WHEN** content/posts 下有多篇文章，其中一篇缺少 date 字段
- **THEN** getAllPosts() 返回其他有效文章的列表，控制台输出 warn 日志

#### Scenario: 所有文章都无效
- **WHEN** content/posts 下所有文章都缺少必要字段
- **THEN** getAllPosts() 返回空数组

### Requirement: getPostBySlug 容错
`getPostBySlug()` 遇到无效文章时 SHALL 返回 null，而非抛出异常。

#### Scenario: 指定 slug 的文章缺少必要字段
- **WHEN** 请求一篇缺少 title 或 date 的文章
- **THEN** getPostBySlug() 返回 null，控制台输出 warn 日志
