## 1. 搜索核心

- [ ] 1.1 安装 `fuse.js`
- [ ] 1.2 创建 `src/lib/search.ts`：构建 Fuse 索引，搜索函数

## 2. 搜索对话框组件

- [ ] 2.1 创建 `src/components/search/SearchDialog.tsx`：命令面板风格搜索对话框，实时过滤，键盘导航，Escape 关闭

## 3. 集成

- [ ] 3.1 在 `src/components/layout/Header.tsx` 中添加搜索按钮
- [ ] 3.2 在 `src/app/layout.tsx` 中挂载 SearchDialog（全局可用）
- [ ] 3.3 在构建时生成文章搜索数据 JSON（`src/lib/search-data.ts`）

## 4. 样式

- [ ] 4.1 在 `globals.css` 中添加搜索对话框样式

## 5. 验证

- [ ] 5.1 `npm run build` 构建通过
- [ ] 5.2 本地预览，测试搜索、键盘快捷键、结果导航
