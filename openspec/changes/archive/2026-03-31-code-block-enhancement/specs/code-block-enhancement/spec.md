## ADDED Requirements

### Requirement: 代码块背景色
代码块（`<pre>`）SHALL 有与页面背景明显区分的背景色，接近 GitHub 风格。

#### Scenario: 浅色主题下代码块背景
- **WHEN** 浅色主题下渲染代码块
- **THEN** 代码块背景色为 `#f6f8fa`，与白色页面背景有明显区分

#### Scenario: 深色主题下代码块背景
- **WHEN** 深色主题下渲染代码块
- **THEN** 代码块背景色为 `#0d1117`，与深色页面背景有明显区分

### Requirement: 代码块圆角和内边距
代码块 SHALL 有圆角和适当内边距。

#### Scenario: 代码块圆角
- **WHEN** 渲染代码块
- **THEN** 代码块有 `6px` 圆角

### Requirement: 复制按钮显示
每个代码块右上角 SHALL 显示一个复制按钮。

#### Scenario: 代码块显示复制按钮
- **WHEN** 页面渲染包含代码块的文章
- **THEN** 每个代码块右上角悬浮显示一个 clipboard 图标按钮

#### Scenario: 行内代码不显示复制按钮
- **WHEN** 页面包含行内代码（`` `code` ``）
- **THEN** 行内代码不显示复制按钮

### Requirement: 复制按钮交互
点击复制按钮 SHALL 复制代码内容到剪贴板，并提供视觉反馈。

#### Scenario: 点击复制
- **WHEN** 用户点击代码块右上角的复制按钮
- **THEN** 代码纯文本内容复制到系统剪贴板

#### Scenario: 复制成功反馈
- **WHEN** 用户点击复制按钮且复制成功
- **THEN** 按钮文字变为"已复制"，2 秒后恢复为 clipboard 图标

#### Scenario: 复制失败反馈
- **WHEN** 用户点击复制按钮但复制失败（如浏览器不支持）
- **THEN** 按钮文字变为"复制失败"
