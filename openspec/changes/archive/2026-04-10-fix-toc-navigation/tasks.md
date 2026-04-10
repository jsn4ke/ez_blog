## 1. 修复点击跳转锁定机制

- [x] 1.1 将 handleClick 中的 setTimeout 解锁替换为用户手动滚动（wheel/touchmove/keydown）才解锁
- [x] 1.2 修复 ID 生成不一致：getHeadings 改用 github-slugger（与 rehype-slug 一致）

## 2. 验证

- [ ] 2.1 启动 dev server，在长文章中测试：从目录底部点击顶部条目，确认高亮不回跳
- [ ] 2.2 测试 h3 子条目点击跳转是否正常
