## Context

`posts.ts` 中 `isValidPostMeta` 校验失败时直接 throw Error，导致 Next.js SSG 构建和页面渲染失败。

## Goals / Non-Goals

**Goals:**
- 无效文章不影响其他文章展示
- 开发时能通过控制台日志发现问题

**Non-Goals:**
- 不做前端错误提示（用户无感知）
- 不做 frontmatter 自动修复

## Decisions

### D1: 静默跳过 + console.warn

选择: `console.warn` 警告 + 跳过无效文章 / 返回 null
备选: 收集错误列表，渲染页面显示"以下文章格式有误"

理由: 对读者透明，开发者能在终端看到警告。前端展示错误列表增加复杂度且无实际价值。
