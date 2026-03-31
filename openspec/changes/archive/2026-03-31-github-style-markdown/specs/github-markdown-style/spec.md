## ADDED Requirements

### Requirement: Prose 排版参数
`.prose` 区域 SHALL 使用紧凑的排版参数：行高 1.6，段间距 1.25em，字号 16px。

#### Scenario: 长文章段落间距
- **WHEN** 渲染包含多个段落的 Markdown 文章
- **THEN** 段落之间有 1.25em 的间距，行高为 1.6

### Requirement: 等宽字体
代码块和行内代码 SHALL 使用 GitHub 风格的等宽字体栈：`'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace`。

#### Scenario: 行内代码字体
- **WHEN** Markdown 中包含行内代码（`` `code` ``）
- **THEN** 文本使用等宽字体渲染

#### Scenario: 代码块字体
- **WHEN** Markdown 中包含围栏代码块（```）
- **THEN** 代码内容使用等宽字体渲染

### Requirement: 行内代码样式
行内代码 SHALL 有浅色背景和圆角，视觉上与正文区分。

#### Scenario: 浅色主题下行内代码
- **WHEN** 浅色主题下渲染行内代码
- **THEN** 行内代码有浅灰色背景（`rgba(175, 184, 193, 0.2)`）和 3px 圆角

#### Scenario: 深色主题下行内代码
- **WHEN** 深色主题下渲染行内代码
- **THEN** 行内代码有深灰色背景（`rgba(110, 118, 129, 0.4)`）和 3px 圆角

### Requirement: 引用块样式
引用块 SHALL 有左边框、浅色背景和适度内边距，接近 GitHub 风格。

#### Scenario: 浅色主题下引用块
- **WHEN** 浅色主题下渲染 `> blockquote`
- **THEN** 左边框为 `#d0d7de`，背景为 `#f6f8fa`，左内边距 1em

#### Scenario: 深色主题下引用块
- **WHEN** 深色主题下渲染 `> blockquote`
- **THEN** 左边框为 `#30363d`，背景为 `rgba(110, 118, 129, 0.1)`

### Requirement: 表格样式
表格 SHALL 有边框和斑马纹（隔行变色），提高可读性。

#### Scenario: 表格边框
- **WHEN** 渲染 Markdown 表格
- **THEN** 表格有 `1px solid var(--border)` 的边框

#### Scenario: 表格斑马纹
- **WHEN** 渲染包含 3 行以上的表格
- **THEN** 偶数行（tbody 内）有浅色背景（浅色 `#f6f8fa`，深色 `rgba(110, 118, 129, 0.1)`）

### Requirement: 分隔线样式
分隔线（`<hr>`）SHALL 使用细线 + 浅色样式，而非默认粗线。

#### Scenario: 渲染分隔线
- **WHEN** Markdown 中包含 `---` 分隔线
- **THEN** 渲染为 1px 高的 `var(--border)` 颜色细线，无边框样式

### Requirement: 列表样式
有序列表和无序列表 SHALL 有适当的缩进和间距。

#### Scenario: 嵌套列表
- **WHEN** 渲染嵌套的无序列表
- **THEN** 嵌套层级有清晰的缩进，列表项之间有适当间距

### Requirement: 链接颜色
prose 区域内的链接 SHALL 使用强调色，hover 时有下划线。

#### Scenario: 浅色主题下链接
- **WHEN** 浅色主题下 prose 区域内渲染链接
- **THEN** 链接颜色为 `#0969da`，hover 时有下划线

#### Scenario: 深色主题下链接
- **WHEN** 深色主题下 prose 区域内渲染链接
- **THEN** 链接颜色为 `#58a6ff`，hover 时有下划线
