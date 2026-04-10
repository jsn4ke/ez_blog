## ADDED Requirements

### Requirement: 代码块 header bar
每个代码块（非 mermaid）顶部 SHALL 显示 header bar，包含语言标签和复制按钮。

#### Scenario: TypeScript 代码块
- **WHEN** 渲染一个 ````typescript` 围栏代码块
- **THEN** 代码块顶部 header bar 左侧显示 "typescript"，右侧显示复制按钮

#### Scenario: 无语言标记的代码块
- **WHEN** 渲染一个没有指定语言的围栏代码块
- **THEN** 代码块顶部 header bar 左侧显示 "code"

#### Scenario: Mermaid 代码块不显示 header bar
- **WHEN** 渲染 ````mermaid` 围栏代码块
- **THEN** 不显示 header bar（由 MermaidRenderer 接管）

### Requirement: 复制按钮在 header bar 中
复制按钮 SHALL 位于 header bar 右侧，点击复制代码。

#### Scenario: 点击 header bar 中的复制按钮
- **WHEN** 用户点击 header bar 右侧的复制按钮
- **THEN** 代码内容复制到剪贴板，按钮显示"已复制"反馈

### Requirement: 深色模式代码块背景一体
代码块在深色模式下 SHALL 背景色一体，无行间间隙。

#### Scenario: 深色模式多行代码块
- **WHEN** 深色主题下渲染多行代码块
- **THEN** 代码块背景色统一（#0d1117），各行之间无间隙或色差
