## Context

文章详情页当前为单栏布局，PostBody 组件使用 rehype-slug 已为标题自动添加 id 属性。当前无任何用户状态持久化机制。

## Goals / Non-Goals

**Goals:**
- 使用 localStorage 记录每篇文章的最后访问时间
- 文章详情页显示"上次阅读时间"（如"2 小时前"、"3 天前"）
- 首页文章列表显示已读/未读状态
- 自动提取 h2/h3 标题生成目录
- 目录高亮当前滚动位置
- 桌面端右侧固定目录，移动端可展开/收起

**Non-Goals:**
- 服务端追踪阅读数据（纯客户端 localStorage）
- 跨设备同步阅读历史
- 支持 h1/h4+ 层级（仅 h2/h3）
- 阅读进度百分比（可后续扩展）

## Decisions

### D1: 阅读历史存储 — localStorage

**选择**: 使用 localStorage 以 `readHistory:{slug}` 为 key 存储时间戳。

**理由**: 纯客户端实现，零服务端依赖，符合最小化原则。每篇文章独立 key，查询和更新简单。

数据结构：
```
localStorage:
  readHistory:hello-world → "1743369600000"
  readHistory:nextjs-guide → "1743350000000"
```

### D2: 时间显示 — 相对时间

**选择**: 使用相对时间格式（"刚刚"、"5 分钟前"、"2 小时前"、"3 天前"），超过 30 天显示具体日期。

**理由**: 相对时间更直观，用户一眼就能判断阅读时间远近。

### D3: 已读判定

**选择**: 只要 localStorage 中存在对应 key 即视为已读。

**理由**: 简单明确。首次访问自动标记为已读，无需额外交互。

### D4: 目录提取 — 从 Markdown AST 提取

**选择**: 在 Server Component 中通过 remark 插件从 Markdown AST 提取 h2/h3 标题的 id 和文本，作为 props 传给客户端 Toc 组件。

**理由**: 无需解析 HTML，数据干净。Server 端提取后传给客户端组件仅做滚动监听和高亮，职责清晰。

### D5: 目录布局 — CSS sticky + 响应式

**选择**: 桌面端（>=1024px）使用 `position: sticky` 固定在右侧。移动端隐藏目录，顶部显示可点击的 TOC 按钮展开悬浮面板。

### D6: 滚动高亮 — IntersectionObserver

**选择**: 使用 IntersectionObserver 监听各标题进入视口，高亮当前可见的标题。

## Risks / Trade-offs

- **localStorage 无跨设备同步** → 单设备体验即可，个人博客场景可接受
- **清除浏览器数据会丢失历史** → 不严重，只是显示状态变化
- **目录在短文章中价值有限** → 标题少于 3 个时不显示目录
