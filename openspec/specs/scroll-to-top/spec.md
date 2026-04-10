## ADDED Requirements

### Requirement: 回到顶部按钮显示
按钮 SHALL 在页面滚动超过 300px 后显示，否则隐藏。

#### Scenario: 页面顶部不显示
- **WHEN** 页面滚动距离小于 300px
- **THEN** 回到顶部按钮不可见

#### Scenario: 页面滚动后显示
- **WHEN** 页面滚动距离超过 300px
- **THEN** 回到顶部按钮可见

### Requirement: 回到顶部按钮交互
点击按钮 SHALL 平滑滚动到页面顶部。

#### Scenario: 点击回到顶部
- **WHEN** 用户点击回到顶部按钮
- **THEN** 页面平滑滚动到顶部，滚动完成后按钮隐藏
