# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目基本规则 (Project Basic Rules)

**语言使用规范：**
- 所有回答和交流必须使用中文
- 专业名词、函数名、变量名、技术术语等保持原文不翻译
- 代码注释、错误信息、日志等内容保持原文
- 文件名、目录名、包名等保持原文

示例：
- ✅ 正确："这个组件使用了 `useEditor` hook 来管理编辑器状态"
- ❌ 错误："这个组件使用了 `使用编辑器` 钩子来管理编辑器状态"

## 基础开发命令 (Essential Development Commands)

```bash
npm run dev      # 在 localhost:3000 启动开发服务器
npm run build    # 创建生产构建
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint 检查
```

## 项目架构 (Project Architecture)

**NotionLike** 是一个基于 Next.js 16、React 19 和 TipTap 3 构建的复杂富文本编辑器，模拟 Notion 的编辑体验并具有拖拽功能。

### 技术栈 (Technology Stack)
- **框架**: Next.js 16.0.3 with App Router
- **编辑器**: TipTap 3.11.0 (基于 ProseMirror 的无头编辑器)
- **语言**: TypeScript (严格模式)
- **样式**: Tailwind CSS 4.1.17 + SCSS 用于复杂组件
- **UI 基础组件**: Radix UI 用于无障碍组件
- **图标**: Lucide React + 自定义 SVG 图标
- **测试**: Playwright 用于浏览器自动化

### 核心架构模式 (Core Architecture Patterns)

1. **基于扩展的编辑器**: 所有功能都作为 TipTap extensions 实现
2. **组件组合**: 高度模块化、可重用的组件系统
3. **自定义 Hooks**: 复杂逻辑提取到可重用的 hooks 中
4. **路径别名**: `@/*` 映射到 `./src/*` 用于清晰的导入

## 关键目录结构 (Key Directory Structure)

```
src/
├── app/
│   ├── page.tsx                 # 主入口 → 渲染 SimpleEditor
│   └── layout.tsx               # 全局应用设置，使用 Inter 字体
├── components/
│   ├── tiptap-templates/        # 编辑器实现
│   │   └── simple/              # 主要编辑器模板，带主题切换
│   ├── tiptap-ui/               # 特定功能的 UI 组件
│   │   ├── heading-dropdown-menu/
│   │   ├── color-highlight-popover/
│   │   ├── link-popover/
│   │   └── [component]/         # 每个组件包含: .tsx, use-[component].ts, index.tsx
│   ├── tiptap-ui-primitive/     # 可重用的基础组件
│   │   ├── button/
│   │   ├── toolbar/
│   │   ├── popover/
│   │   └── [primitive]/         # 带 SCSS 样式的基础 UI
│   ├── tiptap-node/             # 自定义 TipTap node 实现
│   │   ├── heading-node/
│   │   ├── paragraph-node/
│   │   ├── code-block-node/
│   │   └── [node]/              # 特定编辑器节点的样式
│   └── tiptap-icons/            # 自定义 SVG 图标组件
├── hooks/                       # 自定义 React hooks
│   ├── use-cursor-visibility.ts
│   ├── use-is-breakpoint.ts
│   ├── use-table.ts
│   └── [hook].ts
├── lib/                         # 工具函数和助手
│   ├── tipap-utils.ts           # 编辑器特定工具
│   ├── utils.ts                 # 通用辅助函数
│   └── image-upload.ts          # 图片处理逻辑
└── styles/                      # 全局样式
    ├── _variables.scss          # SCSS 变量
    └── _keyframe-animations.scss # CSS 动画
```

## 核心编辑器功能和扩展 (Core Editor Features & Extensions)

### 使用的 TipTap 扩展 (TipTap Extensions Used)
- `@tiptap/starter-kit` - 基础编辑功能
- `@tiptap/extension-drag-handle-react` - 块级拖拽
- `@tiptap/extension-code-block-lowlight` - 语法高亮
- `@tiptap/extension-table` - 可调整大小的表格
- `@tiptap/extension-task-list` - 可勾选的待办事项
- `@tiptap/extension-link` - 智能链接处理
- `@tiptap/extension-image` - 图片上传和操作
- `@tiptap/extension-text-align` - 文本对齐选项
- `@tiptap/extension-highlight` - 文本颜色高亮
- `@tiptap/extension-typography` - 智能字符替换

### 关键功能 (Key Features)
- **拖拽**: 通过可视化拖拽手柄进行块重排序
- **代码高亮**: 通过 highlight.js 实现多语言语法高亮
- **深色模式**: 带系统偏好检测的主题切换
- **移动端响应式**: 自适应 UI，带可折叠工具栏
- **表格**: 可调整大小的列，支持完整的表格操作
- **任务列表**: 嵌套的、可勾选的待办事项

## 组件开发模式 (Component Development Patterns)

### UI 组件 (`tiptap-ui/`)
每个组件遵循以下模式：
- `[component].tsx` - 主要组件实现
- `use-[component].ts` - 组件逻辑的自定义 hook
- `index.tsx` - 导出桶

### UI 基础组件 (`tiptap-ui-primitive/`)
带有 SCSS 样式的基础组件，可以组合成更高级的组件。

### 节点组件 (`tiptap-node/`)
为特定 TipTap 编辑器节点（段落、标题、代码块等）的自定义样式和行为。

## 开发工作流程 (Development Workflow)

### 添加新编辑器功能
1. 在 `src/lib/extensions/` 中创建 TipTap 扩展（如果是自定义的）
2. 将扩展添加到 `src/components/tiptap-templates/simple/simple-editor.tsx` 中的编辑器配置
3. 在 `src/components/tiptap-ui/` 中创建 UI 组件
4. 在 `src/components/tiptap-node/` 中添加节点样式
5. 如需要，更新工具栏

### 自定义样式
- 在组件目录中使用 SCSS 的组件特定样式
- `src/styles/` 中的全局样式
- 用于快速开发的 Tailwind 工具类
- `tailwind.config.js` 中的自定义设计令牌

### 状态管理
- 编辑器状态由 TipTap 的 useEditor hook 管理
- 组件状态提取到 `src/hooks/` 中的自定义 hooks
- 当前未使用外部状态管理库

## 重要配置 (Important Configuration)

### TypeScript
- 启用严格模式
- 路径别名: `@/*` → `./src/*`
- 启用 React JSX 转换

### Tailwind CSS
- 自定义 Notion 风格的调色板
- 用于主题化的 CSS 变量系统
- 使用 `class` 策略的深色模式支持

### 测试
- 配置了 Playwright 用于浏览器自动化
- 建立了组件测试模式

## 代码审查原则 (Code Review Principles)
1. **安全性优先**: 检查 XSS、SQL注入、CSRF等安全漏洞
2. **性能意识**: 关注 bundle 大小、渲染性能和内存使用
3. **类型安全**: 确保 TypeScript 类型正确性
4. **用户体验**: 考虑加载状态、错误处理和响应式设计

## 编辑器功能指导 (Editor Feature Guidelines)
### TipTap 扩展开发
- 扩展应该符合 TipTap 的 Node 和 Mark 规范
- 优先使用官方扩展，必要时开发自定义扩展
- 确保扩展的 undo/redo 功能正常工作

### 富文本功能
- 实现基础的文本格式化（粗体、斜体、下划线）
- 支持标题层级 (H1-H6)
- 实现列表功能（有序、无序、任务列表）
- 支持链接、图片和表格
- 考虑实现块引用和代码块

## UI/UX 设计原则 (UI/UX Design Principles)
1. **Notion 风格**: 遵循 Notion 的简洁、现代设计语言
2. **响应式设计**: 移动端优先，适配各种屏幕尺寸
3. **交互反馈**: 提供即时的视觉和交互反馈
4. **键盘快捷键**: 支持常用编辑器快捷键

## 代码规范 (Coding Standards)

### 命名约定 (Naming Conventions)
- **组件**: PascalCase (例: `RichTextEditor`)
- **函数**: camelCase (例: `formatContent`)
- **变量**: camelCase (例: `editorInstance`)
- **常量**: UPPER_SNAKE_CASE (例: `DEFAULT_FONT_SIZE`)
- **文件名**: 
  - 组件: PascalCase (例: `RichTextEditor.tsx`)
  - 工具函数: camelCase (例: `formatContent.ts`)
  - 类型定义: camelCase (例: `editorTypes.ts`)

### 编码标准 (Coding Standards)
1. **TypeScript**: 所有新文件必须使用 TypeScript
2. **导入顺序**:
   ```typescript
   // 1. React 相关
   import React, { useState, useEffect } from 'react';
   
   // 2. 第三方库
   import { Editor } from '@tiptap/react';
   import { cn } from '@/lib/utils';
   
   // 3. 内部模块
   import { Button } from '@/components/ui/button';
   import { useEditor } from '@/hooks/useEditor';
   ```
3. **组件导出**: 使用命名导出，默认导出仅用于主组件
4. **类型定义**: 优先使用 `interface`，需要联合类型时使用 `type`

### TipTap 编辑器规范 (TipTap Editor Guidelines)
1. **扩展配置**: 所有 TipTap 扩展在 `lib/editor.ts` 中集中配置
2. **内容渲染**: 使用 `@tiptap/react` 的 `EditorContent` 组件
3. **工具栏**: 实现浮动工具栏和气泡菜单
4. **扩展开发**: 新的 TipTap 扩展放在 `lib/extensions/` 目录

### UI 组件规范 (UI Component Guidelines)
1. **组件库**: 基于 Radix UI 和 shadcn/ui 模式
2. **样式**: 使用 Tailwind CSS 和 `clsx` 进行条件样式
3. **变体**: 使用 `class-variance-authority` 管理组件变体
4. **图标**: 统一使用 Lucide React 图标

## 状态管理 (State Management)
1. **本地状态**: 使用 React Hooks (`useState`, `useReducer`)
2. **复杂状态**: 考虑使用 Context API 或 Zustand
3. **编辑器状态**: 使用 TipTap 的 `useEditor` hook

## 性能优化 (Performance Optimization)
1. **代码分割**: Next.js 自动代码分割
2. **懒加载**: 大型组件使用 `React.lazy()`
3. **防抖**: 编辑器输入使用防抖处理
4. **虚拟化**: 长列表考虑使用虚拟化

## 开发工作流 (Development Workflow)

### 分支策略 (Branch Strategy)
- `main`: 生产环境代码
- `develop`: 开发环境代码
- `feature/*`: 功能分支
- `bugfix/*`: 修复分支

### 提交规范 (Commit Convention)
使用 Conventional Commits:
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 格式调整
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

## 禁止事项 (Prohibited Actions)
1. **禁止**: 直接修改 `node_modules` 中的文件
2. **禁止**: 使用 `any` 类型（除非绝对必要）
3. **禁止**: 硬编码样式（优先使用 Tailwind 类）
4. **禁止**: 忽略 TypeScript 错误
5. **禁止**: 在组件中进行复杂的业务逻辑处理

## 必须遵守 (Must Follow)
1. **必须**: 所有新功能编写测试
2. **必须**: 遵循响应式设计原则
3. **必须**: 考虑无障碍访问性 (a11y)
4. **必须**: 保持代码的可读性和可维护性
5. **必须**: 进行代码审查和重构

## 工具配置 (Tool Configuration)
- **包管理器**: npm
- **代码格式化**: Prettier (建议配置)
- **代码检查**: ESLint (建议配置)
- **Git Hooks**: Husky (建议配置)

## 测试规范 (Testing Guidelines)
1. **单元测试**: Jest + Testing Library
2. **E2E 测试**: Playwright (已配置)
3. **测试文件**: 与源文件同目录，命名为 `*.test.tsx`

## 需要了解的关键文件 (Key Files to Understand)

- `src/components/tiptap-templates/simple/simple-editor.tsx` - 主要编辑器实现
- `src/lib/tiptap-utils.ts` - 编辑器工具函数
- `tailwind.config.js` - 设计系统配置
- `src/app/page.tsx` - 应用程序入口点