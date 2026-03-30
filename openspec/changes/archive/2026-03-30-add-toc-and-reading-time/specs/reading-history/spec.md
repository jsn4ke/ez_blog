## ADDED Requirements

### Requirement: Record last read time
系统 SHALL 在用户访问文章详情页时，将该文章的 slug 和当前时间戳记录到 localStorage 中。

Key 格式为 `readHistory:{slug}`，值为时间戳字符串。

#### Scenario: 首次访问文章
- **WHEN** 用户访问 `/posts/<slug>` 且 localStorage 中无该文章记录
- **THEN** 系统 SHALL 在 localStorage 中写入 `readHistory:<slug>` = 当前时间戳

#### Scenario: 重复访问文章
- **WHEN** 用户再次访问已记录过的文章
- **THEN** 系统 SHALL 更新 `readHistory:<slug>` 为最新时间戳

### Requirement: Get read status
系统 SHALL 提供 `isPostRead(slug)` 函数，判断文章是否已读。

返回值为 boolean，localStorage 中存在对应 key 即为已读。

#### Scenario: 已读文章
- **WHEN** 调用 `isPostRead("hello-world")` 且 localStorage 中存在记录
- **THEN** 返回 `true`

#### Scenario: 未读文章
- **WHEN** 调用 `isPostRead("new-post")` 且 localStorage 中无记录
- **THEN** 返回 `false`

### Requirement: Format relative time
系统 SHALL 提供 `formatRelativeTime(timestamp)` 函数，将时间戳转为相对时间描述。

格式规则：
- < 1 分钟 → "刚刚"
- < 60 分钟 → "X 分钟前"
- < 24 小时 → "X 小时前"
- < 30 天 → "X 天前"
- >= 30 天 → 具体日期（YYYY-MM-DD）

#### Scenario: 刚刚阅读
- **WHEN** 时间戳为当前时间
- **THEN** 返回 "刚刚"

#### Scenario: 小时前
- **WHEN** 时间戳为 3 小时前
- **THEN** 返回 "3 小时前"

#### Scenario: 超过 30 天
- **WHEN** 时间戳超过 30 天前
- **THEN** 返回具体日期格式（如 "2026-02-28"）
