## ADDED Requirements

### Requirement: Responsive layout
博客 SHALL 在桌面端和移动端均有良好的显示效果。

桌面端：文章内容区域最大宽度 720px，居中显示。
移动端：内容区域占满屏幕宽度，左右保留适当内边距。

#### Scenario: 桌面端显示
- **WHEN** 屏幕宽度 >= 768px
- **THEN** 文章内容区域最大宽度为 720px，水平居中

#### Scenario: 移动端显示
- **WHEN** 屏幕宽度 < 768px
- **THEN** 内容区域宽度为 100%，左右内边距为 16px

### Requirement: Dark mode support
系统 SHALL 支持浅色和深色两种主题，用户可手动切换。

默认主题 SHALL 跟随系统偏好设置。用户的选择 SHALL 保存在 localStorage 中，下次访问时自动应用。

#### Scenario: 系统偏好为深色
- **WHEN** 用户首次访问且操作系统设置为深色模式
- **THEN** 博客 SHALL 使用深色主题

#### Scenario: 系统偏好为浅色
- **WHEN** 用户首次访问且操作系统设置为浅色模式
- **THEN** 博客 SHALL 使用浅色主题

#### Scenario: 手动切换主题
- **WHEN** 用户点击主题切换按钮
- **THEN** 博客 SHALL 立即切换到另一个主题，并将选择保存到 localStorage

#### Scenario: 记住用户选择
- **WHEN** 用户之前选择过深色主题并再次访问
- **THEN** 博客 SHALL 使用深色主题（而非跟随系统设置）

### Requirement: Theme toggle button
导航栏 SHALL 包含一个主题切换按钮，允许用户在浅色和深色主题之间切换。

#### Scenario: 主题切换按钮可见
- **WHEN** 用户查看导航栏
- **THEN** 导航栏中 SHALL 显示一个可点击的主题切换按钮（太阳/月亮图标）

### Requirement: Page footer
所有页面 SHALL 包含页脚，显示版权信息。

#### Scenario: 页脚显示
- **WHEN** 用户查看任意页面底部
- **THEN** 页脚 SHALL 显示版权信息，格式为 `© <year> <author>`
