# NotionLike 项目规则

## 项目概述
这是一个基于 Next.js 和 TipTap 的 Notion 类编辑器项目。

## 项目架构
- **框架**: Next.js 16.0.3
- **语言**: TypeScript
- **样式**: Tailwind CSS 4.1.17
- **编辑器**: TipTap 3.11.0
- **UI 组件**: Radix UI + Lucide React

## 代码规范

### 文件结构
```
src/
├── components/     # React 组件
├── lib/           # 工具函数和配置
├── types/         # TypeScript 类型定义
├── hooks/         # 自定义 React Hooks
├── pages/         # Next.js 页面
└── styles/        # 全局样式
```

### 命名约定
- **组件**: PascalCase (例: `RichTextEditor`)
- **函数**: camelCase (例: `formatContent`)
- **变量**: camelCase (例: `editorInstance`)
- **常量**: UPPER_SNAKE_CASE (例: `DEFAULT_FONT_SIZE`)
- **文件名**: 
  - 组件: PascalCase (例: `RichTextEditor.tsx`)
  - 工具函数: camelCase (例: `formatContent.ts`)
  - 类型定义: camelCase (例: `editorTypes.ts`)

### 编码标准
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

### TipTap 编辑器规范
1. **扩展配置**: 所有 TipTap 扩展在 `lib/editor.ts` 中集中配置
2. **内容渲染**: 使用 `@tiptap/react` 的 `EditorContent` 组件
3. **工具栏**: 实现浮动工具栏和气泡菜单
4. **扩展开发**: 新的 TipTap 扩展放在 `lib/extensions/` 目录

### UI 组件规范
1. **组件库**: 基于 Radix UI 和 shadcn/ui 模式
2. **样式**: 使用 Tailwind CSS 和 `clsx` 进行条件样式
3. **变体**: 使用 `class-variance-authority` 管理组件变体
4. **图标**: 统一使用 Lucide React 图标

### 状态管理
1. **本地状态**: 使用 React Hooks (`useState`, `useReducer`)
2. **复杂状态**: 考虑使用 Context API 或 Zustand
3. **编辑器状态**: 使用 TipTap 的 `useEditor` hook

### 性能优化
1. **代码分割**: Next.js 自动代码分割
2. **懒加载**: 大型组件使用 `React.lazy()`
3. **防抖**: 编辑器输入使用防抖处理
4. **虚拟化**: 长列表考虑使用虚拟化

### 测试规范
1. **单元测试**: Jest + Testing Library
2. **E2E 测试**: Playwright (已配置)
3. **测试文件**: 与源文件同目录，命名为 `*.test.tsx`

## 开发工作流

### 分支策略
- `main`: 生产环境代码
- `develop`: 开发环境代码
- `feature/*`: 功能分支
- `bugfix/*`: 修复分支

### 提交规范
使用 Conventional Commits:
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 格式调整
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

## 禁止事项
1. **禁止**: 直接修改 `node_modules` 中的文件
2. **禁止**: 使用 `any` 类型（除非绝对必要）
3. **禁止**: 硬编码样式（优先使用 Tailwind 类）
4. **禁止**: 忽略 TypeScript 错误
5. **禁止**: 在组件中进行复杂的业务逻辑处理

## 必须遵守
1. **必须**: 所有新功能编写测试
2. **必须**: 遵循响应式设计原则
3. **必须**: 考虑无障碍访问性 (a11y)
4. **必须**: 保持代码的可读性和可维护性
5. **必须**: 进行代码审查和重构

## 工具配置
- **包管理器**: npm
- **代码格式化**: Prettier (建议配置)
- **代码检查**: ESLint (建议配置)
- **Git Hooks**: Husky (建议配置)