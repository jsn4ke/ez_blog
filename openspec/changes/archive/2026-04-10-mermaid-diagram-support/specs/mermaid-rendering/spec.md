## ADDED Requirements

### Requirement: Mermaid 代码块渲染
页面中的 ```mermaid 代码块 SHALL 被渲染为 SVG 图表。

#### Scenario: 文章包含 mermaid 状态图
- **WHEN** 文章包含 ```mermaid 类型的 stateDiagram-v2 代码块
- **THEN** 该代码块渲染为可交互的 SVG 状态图

#### Scenario: 文章包含 mermaid 流程图
- **WHEN** 文章包含 ```mermaid 类型的 flowchart 代码块
- **THEN** 该代码块渲染为可交互的 SVG 流程图

#### Scenario: 文章不包含 mermaid 代码块
- **WHEN** 文章没有 ```mermaid 代码块
- **THEN** 不加载 Mermaid 库，不影响页面性能

### Requirement: 主题适配
Mermaid 图表 SHALL 根据当前主题使用对应的配色方案。

#### Scenario: 浅色主题
- **WHEN** 浅色主题下渲染 mermaid 图表
- **THEN** 图表使用浅色背景和深色文字

#### Scenario: 深色主题
- **WHEN** 深色主题下渲染 mermaid 图表
- **THEN** 图表使用深色背景和浅色文字

#### Scenario: 主题切换
- **WHEN** 用户切换浅色/深色主题
- **THEN** mermaid 图表重新渲染以适配新主题

### Requirement: 渲染容错
无效的 Mermaid 语法 SHALL 显示错误提示而非崩溃。

#### Scenario: Mermaid 语法错误
- **WHEN** mermaid 代码块包含语法错误
- **THEN** 显示错误提示信息，其他内容正常渲染
