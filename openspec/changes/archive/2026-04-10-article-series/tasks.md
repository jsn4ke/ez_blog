## 1. 数据层

- [ ] 1.1 在 `src/lib/posts.ts` 中扩展 PostMeta 接口，新增 `series?: string` 和 `order?: number`
- [ ] 1.2 新增 `getAllSeries()` 和 `getSeriesPosts(series: string)` 函数

## 2. 系列导航组件

- [ ] 2.1 创建 `src/components/post/SeriesNav.tsx`：底部上一篇/下一篇导航

## 3. 页面

- [ ] 3.1 在 `src/app/posts/[slug]/page.tsx` 中引入 SeriesNav
- [ ] 3.2 创建 `src/app/series/page.tsx` 系列总览页

## 4. 数据补充

- [ ] 4.1 为 6 篇 MMO 文章添加 `series: "MMO 服务端架构"` 和对应 `order`

## 5. 导航

- [ ] 5.1 在 Header.tsx 中添加 Series 导航链接

## 6. 验证

- [ ] 6.1 `npm run build` 构建通过
- [ ] 6.2 本地预览，测试系列导航和总览页
