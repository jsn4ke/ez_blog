## Why

长文章浏览后需要手动滚回顶部，体验不佳。需要一个"回到顶部"浮动按钮，点击后平滑滚动到页面顶部。

## What Changes

- 在文章详情页添加"回到顶部"浮动按钮
- 按钮在滚动超过一定距离后显示，点击平滑滚动到顶部

## Capabilities

### New Capabilities
- `scroll-to-top`: 回到顶部浮动按钮

### Modified Capabilities

## Impact

- 新增 `src/components/post/ScrollToTop.tsx`（client component）
- `src/app/posts/[slug]/page.tsx` — 引入 ScrollToTop
