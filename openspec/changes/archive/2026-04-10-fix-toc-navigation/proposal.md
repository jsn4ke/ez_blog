## Why

TOC（目录）导航存在两个问题：1) 当用户在目录条目 10 时，点击目录条目 8 无法跳转，因为 smooth scroll 距离较远超过 1s 锁定时间，IntersectionObserver 在滚动途中就覆盖了 activeId；2) 子条目（h3 级别）无法正确跳转。

## What Changes

- 修复 smooth scroll 与 IntersectionObserver 锁定机制的竞争条件
- 确保向上滚动（点击靠前条目）时锁定时间足够覆盖整个滚动过程
- 修复子条目（h3）点击跳转功能

## Capabilities

### New Capabilities

_(无新能力)_

### Modified Capabilities

_(无 spec 级别的行为变更，仅修复 bug)_

## Impact

- `src/components/post/Toc.tsx` — 修复 handleClick 锁定逻辑和 IntersectionObserver 交互
