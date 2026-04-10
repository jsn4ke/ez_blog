## ADDED Requirements

### Requirement: 搜索对话框
Header 导航栏 SHALL 提供搜索入口，点击后弹出搜索对话框。

#### Scenario: 点击搜索按钮打开搜索
- **WHEN** 用户点击 Header 中的搜索按钮
- **THEN** 居中弹出搜索对话框，输入框自动聚焦

#### Scenario: 键盘快捷键打开搜索
- **WHEN** 用户按下 `Ctrl+K`（Windows/Linux）或 `Cmd+K`（macOS）
- **THEN** 居中弹出搜索对话框，输入框自动聚焦

#### Scenario: Escape 关闭搜索
- **WHEN** 搜索对话框打开时用户按下 Escape
- **THEN** 搜索对话框关闭

#### Scenario: 点击遮罩关闭搜索
- **WHEN** 搜索对话框打开时用户点击半透明遮罩
- **THEN** 搜索对话框关闭

### Requirement: 实时搜索
搜索对话框 SHALL 在用户输入时实时过滤文章。

#### Scenario: 输入关键词过滤
- **WHEN** 用户在搜索框输入关键词
- **THEN** 实时显示匹配的文章列表（标题和摘要模糊匹配）

#### Scenario: 无匹配结果
- **WHEN** 用户输入的关键词无匹配
- **THEN** 显示"无搜索结果"提示

### Requirement: 搜索结果导航
搜索结果 SHALL 支持点击跳转和键盘导航。

#### Scenario: 点击搜索结果跳转
- **WHEN** 用户点击搜索结果中的某篇文章
- **THEN** 跳转到该文章详情页，搜索对话框关闭

#### Scenario: 键盘导航
- **WHEN** 搜索结果列表显示时用户按上下箭头
- **THEN** 高亮切换到上一个/下一个结果，按 Enter 跳转
