## 1. 修复 getAllPosts

- [x] 1.1 将 `getAllPosts()` 中 throw 改为 console.warn + filter 跳过无效文章

## 2. 修复 getPostBySlug

- [x] 2.1 将 `getPostBySlug()` 中 throw 改为 console.warn + return null

## 3. 验证

- [x] 3.1 `npm run build` 构建通过
- [x] 3.2 本地预览首页正常，无效文章被静默跳过
