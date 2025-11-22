# TipTap Editor - 拖拽式富文本编辑器

一个基于 **Next.js 16** 和 **TipTap 3** 构建的现代化富文本编辑器，集成拖拽功能、代码高亮、暗色模式等丰富特性。

## ✨ 核心特性

### 🎯 编辑器核心
- **TipTap 3.11.0** - 强大的无头富文本编辑器
- **StarterKit** - 包含基础编辑功能的扩展包
- **拖拽功能** - 使用 `@tiptap/extension-drag-handle-react` 实现块元素拖拽重排
- **实时协作** - 支持实时编辑和同步

### 🎨 格式化功能
- **文本格式**: 粗体、斜体、下划线、删除线、代码
- **上标下标**: 支持数学公式和特殊符号
- **文本颜色**: 多颜色高亮功能
- **文本对齐**: 左对齐、居中、右对齐、两端对齐
- **排版增强**: 自动转换特殊符号（如箭头、破折号等）

### 📝 内容结构
- **标题**: H1-H6 多级标题支持
- **段落**: 智能段落格式化
- **引用**: 优雅的引用块样式
- **代码块**: 语法高亮 + 多语言支持
- **水平分割线**: 内容分隔
- **任务列表**: 可勾选的待办事项
- **有序/无序列表**: 多层级嵌套支持
- **表格**: 可调整大小的表格

### 🔗 链接与媒体
- **智能链接**: 自动识别和转换链接
- **链接预览**: 链接弹窗编辑
- **图片上传**: 支持拖拽上传和文件选择
- **图片工具**: 图片大小调整和对齐

### 🌙 主题与界面
- **暗色模式**: 一键切换明暗主题
- **响应式设计**: 移动端优化，支持触摸操作
- **可折叠工具栏**: 移动端简化界面
- **Notion 风格**: 简洁现代的视觉设计

## 🛠️ 技术栈

### 前端框架
- **Next.js 16.0.3** - React 全栈框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS 4.1.17** - 原子化 CSS 框架
- **PostCSS** - CSS 后处理器

### 编辑器生态
- **@tiptap/react** - React 集成
- **@tiptap/starter-kit** - 基础功能包
- **@tiptap/extension-drag-handle-react** - 拖拽功能
- **@tiptap/extension-code-block-lowlight** - 代码高亮
- **@tiptap/extension-highlight** - 文本高亮
- **@tiptap/extension-link** - 链接功能
- **@tiptap/extension-table** - 表格支持
- **@tiptap/extension-task-list** - 任务列表
- **@tiptap/extension-text-align** - 文本对齐
- **@tiptap/extension-typography** - 排版增强
- **@tiptap/extension-image** - 图片支持

### 代码高亮
- **highlight.js** - 语法高亮引擎
- **支持语言**: JavaScript, TypeScript, HTML, CSS, JSON, Python, Java, C++, Bash 等

### UI 组件
- **自定义组件库** - 完全自建的 UI 组件系统
- **图标系统** - 统一的图标设计语言
- **工具栏组件** - 可配置的编辑器工具栏

## 🚀 快速开始

### 环境要求
- Node.js 18.0+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

### 代码质量
```bash
# 运行 ESLint 检查
npm run lint
```

## 📁 项目架构

```
src/
├── components/
│   ├── tiptap-templates/          # 编辑器模板
│   │   └── simple/               # 简单版编辑器
│   ├── tiptap-ui/                # UI 组件库
│   │   ├── heading-dropdown-menu/
│   │   ├── color-highlight-popover/
│   │   ├── link-popover/
│   │   ├── image-upload-button/
│   │   └── ...
│   ├── tiptap-ui-primitive/      # 基础 UI 原语
│   │   ├── button/
│   │   ├── toolbar/
│   │   ├── popover/
│   │   └── ...
│   ├── tiptap-node/              # 节点样式
│   │   ├── heading-node/
│   │   ├── paragraph-node/
│   │   ├── code-block-node/
│   │   └── ...
│   └── tiptap-icons/             # 图标组件
├── hooks/                        # 自定义 Hooks
│   ├── use-cursor-visibility.ts
│   ├── use-is-breakpoint.ts
│   ├── use-table.ts
│   └── ...
├── lib/                          # 工具函数
│   ├── tipap-utils.ts
│   └── utils.ts
├── styles/                       # 全局样式
│   ├── _variables.scss
│   └── _keyframe-animations.scss
└── types/                        # 类型定义
    └── block.ts
```

## 🎮 使用指南

### 基础编辑
- 选择文本后点击工具栏按钮进行格式化
- 使用键盘快捷键（Cmd/Ctrl + B 加粗，I 斜体等）
- 输入 `/` 或 `>` 快速插入内容块

### 拖拽功能
- 悬停在任意内容块上显示拖拽手柄
- 点击并拖拽手柄重新排列内容顺序
- 支持段落、标题、列表、表格等所有块元素

### 表格操作
- 点击表格按钮插入新表格
- 拖拽表格边框调整大小
- 使用 Tab 键在单元格间导航

### 任务列表
- 使用列表菜单中的任务列表选项
- 点击复选框标记任务完成状态
- 支持多级嵌套任务结构

### 代码高亮
- 插入代码块时自动语言检测
- 支持代码复制和格式化
- 主题切换时代码高亮自动适配

## 🔧 自定义配置

### 扩展编辑器功能
编辑 `src/components/tiptap-templates/simple/simple-editor.tsx` 文件：

```typescript
// 添加新的 TipTap 扩展
const editor = useEditor({
  extensions: [
    StarterKit,
    // 在这里添加新扩展
    YourCustomExtension.configure({
      // 配置选项
    }),
  ],
})
```

### 自定义样式
修改 `src/components/tiptap-node/` 目录下的 SCSS 文件来自定义节点样式。

### 创建新组件
参考现有组件结构，在 `src/components/tiptap-ui/` 下创建新的 UI 组件。

## 🌟 高级特性

- **性能优化**: 虚拟滚动、懒加载
- **SEO 友好**: 服务端渲染支持
- **无障碍访问**: ARIA 标签和键盘导航
- **国际化**: 多语言支持预留
- **插件系统**: 可扩展的插件架构

## 📱 移动端支持

- **触摸优化**: 支持触摸拖拽和手势操作
- **响应式工具栏**: 移动端简化界面
- **自适应布局**: 各种屏幕尺寸完美适配

## 🤝 贡献指南

查看 `.claude/` 目录下的项目规则和协作指南：

- 遵循代码规范和最佳实践
- 提交前运行测试和代码检查
- 使用语义化的提交信息

## 📄 许可证

ISC License - 详见 [LICENSE](LICENSE) 文件

---

**⭐ 如果这个项目对你有帮助，请考虑在 GitHub 上给个 Star！**