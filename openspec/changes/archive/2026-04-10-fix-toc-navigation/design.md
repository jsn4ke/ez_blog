## Context

Toc.tsx 使用 IntersectionObserver 跟踪当前可见标题并高亮对应目录条目。点击目录条目时通过 `lockedRef` 锁定 Observer 1 秒，防止滚动过程中 activeId 被覆盖。

当前问题：
1. 点击相距较远的目录条目（如从 10 到 8），smooth scroll 耗时可能超过 1s 锁定时间，导致 Observer 在滚动未完成时就重置 activeId
2. 子条目（h3）点击跳转可能存在相同问题

## Goals / Non-Goals

**Goals:**
- 修复向上滚动时 activeId 被过早覆盖的问题
- 确保所有目录条目（h2 和 h3）都能正确点击跳转

**Non-Goals:**
- 不改变目录的视觉样式
- 不改变 IntersectionObserver 的 rootMargin 配置

## Decisions

**1. 改用 scrollend 事件替代 setTimeout 解锁**

替代方案：
- A) 增加 setTimeout 到 2-3s — 简单但不可靠，不同设备/距离耗时不同
- B) 监听 scrollend 事件 — 精确，滚动结束后才解锁（**采用**）
- C) 使用 requestAnimationFrame 轮询 scroll 位置 — 过于复杂

scrollend 事件在 smooth scroll 完成后触发，是 W3C 标准事件。对于不支持的浏览器，添加 fallback setTimeout（如 2s）。

**2. 解锁时验证目标元素是否可见**

scrollend 触发后，检查目标元素是否在视口内（考虑 80px offset）。如果不在视口内，保持锁定不释放 activeId。
