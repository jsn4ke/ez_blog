## 1. 数据层改造

- [x] 1.1 在 `src/lib/posts.ts` 中为 PostMeta 和 Post 接口添加 `tags: string[]` 字段
- [x] 1.2 修改 frontmatter 解析逻辑，提取 tags 字段（缺失时返回空数组）
- [x] 1.3 实现 `getAllTags()` 函数（返回 `{ tag: string; count: number }[]`，按 count 降序）
- [x] 1.4 实现 `getPostsByTag(tag)` 函数（复用 getAllPosts，按 tags 过滤）

## 2. 更新现有内容

- [x] 2.1 为 3 篇示例文章的 frontmatter 添加 `tags` 字段

## 3. 组件更新

- [x] 3.1 创建 `src/components/post/TagList.tsx` 标签列表组件（接收 tags 数组，渲染为可点击链接）
- [x] 3.2 修改 `src/components/post/PostCard.tsx`，显示文章标签
- [x] 3.3 修改 `src/app/posts/[slug]/page.tsx`，在文章头部显示标签

## 4. 导航更新

- [x] 4.1 修改 `src/components/layout/Header.tsx`，导航栏增加 Tags 链接

## 5. 标签页面

- [x] 5.1 创建 `src/app/tags/page.tsx` 标签总览页（展示所有标签及文章数量）
- [x] 5.2 创建 `src/app/tags/[tag]/page.tsx` 标签筛选页（展示该标签下的文章，generateStaticParams + 404 处理）

## 6. 验证

- [x] 6.1 运行 `next build` 确认构建成功无错误
