### Requirement: Extract headings for TOC
系统 SHALL 从 Markdown 内容中提取所有 h2 和 h3 标题，生成目录数据。

每个条目 SHALL 包含：id（用于锚点）、text（标题文本）、level（2 或 3）。

#### Scenario: 提取标题列表
- **WHEN** Markdown 内容包含 h2 和 h3 标题
- **THEN** 返回对应的目录条目数组，保留原始顺序

#### Scenario: 无标题
- **WHEN** Markdown 内容不包含 h2/h3 标题
- **THEN** 返回空数组

### Requirement: TOC display on desktop
桌面端（>=1024px）SHALL 在文章右侧以 sticky 方式固定显示目录。

目录 SHALL 高亮当前滚动位置对应的标题条目。

#### Scenario: 桌面端显示目录
- **WHEN** 用户在桌面端阅读包含 3+ 个标题的文章
- **THEN** 页面右侧显示文章目录，固定在视口中

#### Scenario: 滚动高亮
- **WHEN** 用户滚动文章，某个标题进入视口
- **THEN** 目录中对应的条目 SHALL 高亮显示

#### Scenario: 短文章不显示目录
- **WHEN** 文章标题少于 3 个
- **THEN** 不显示目录

### Requirement: TOC display on mobile
移动端（<1024px）SHALL 隐藏目录，提供可点击的 TOC 按钮展开悬浮目录面板。

#### Scenario: 移动端 TOC 按钮
- **WHEN** 用户在移动端且文章有 3+ 个标题
- **THEN** 页面显示 TOC 按钮，点击后展开悬浮目录面板

#### Scenario: 关闭面板
- **WHEN** 用户点击面板外部或关闭按钮
- **THEN** 悬浮目录面板 SHALL 关闭

### Requirement: TOC item click scrolls to heading
点击目录中的条目 SHALL 平滑滚动到对应的标题位置。

#### Scenario: 点击目录条目
- **WHEN** 用户点击目录中的某个标题条目
- **THEN** 页面 SHALL 平滑滚动到该标题位置