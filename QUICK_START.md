# 快速开始：使用官方 Playwright MCP 与 Edge 浏览器

## 配置步骤

### 1. 选择配置

**基本配置（推荐）：**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--browser",
        "msedge",
        "--extension"
      ],
      "env": {
        "PLAYWRIGHT_MCP_EXTENSION_TOKEN": "ZcgdS5kSBPamE5N5O67QvMtHOv_4K5xdfTNjMRVHCaU"
      }
    }
  }
}
```

**使用现有 Edge 配置文件：**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--browser",
        "msedge",
        "--user-data-dir",
        "C:\\Users\\xiaom\\AppData\\Local\\Microsoft\\Edge\\User Data",
        "--extension"
      ],
      "env": {
        "PLAYWRIGHT_MCP_EXTENSION_TOKEN": "ZcgdS5kSBPamE5O67QvMtHOv_4K5xdfTNjMRVHCaU"
      }
    }
  }
}
```

### 2. 启动连接

1. 将以上配置添加到你的 MCP 客户端
2. 在浏览器中打开 Playwright MCP Bridge 插件
3. 确保插件显示已连接状态

## 常用操作示例

### 自动搜索流程

1. **启动浏览器**
   ```
   工具: launch_browser
   ```

2. **导航到网页**
   ```
   工具: goto
   参数: {"url": "https://www.baidu.com"}
   ```

3. **输入搜索内容**
   ```
   工具: type
   参数: {"selector": "#kw", "text": "搜索内容"}
   ```

4. **点击搜索按钮**
   ```
   工具: click
   参数: {"selector": "#su"}
   ```

5. **截取屏幕截图**
   ```
   工具: screenshot
   参数: {"path": "screenshot.png"}
   ```

6. **关闭浏览器**
   ```
   工具: close_browser
   ```

## 可用工具列表

- **launch_browser**: 启动 Edge 浏览器
- **goto**: 导航到指定 URL
- **click**: 点击页面元素
- **type**: 在输入框中输入文本
- **press**: 按键操作
- **waitForSelector**: 等待元素出现
- **screenshot**: 截取屏幕截图
- **getContent**: 获取页面内容
- **close_browser**: 关闭浏览器

## 常见问题

**Q: 如何找到元素选择器？**
A: 在 Edge 浏览器中右键点击元素，选择"检查"，然后在开发者工具中右键点击元素，选择"复制 > 复制选择器"。

**Q: 如何处理加载慢的页面？**
A: 使用 `waitForSelector` 工具等待关键元素加载完成后再进行操作。

**Q: 如何在无头模式下运行？**
A: 在配置中添加 `"--headless"` 参数：
```json
"args": [
  "@playwright/mcp@latest",
  "--browser",
  "msedge",
  "--headless",
  "--extension"
]
```

**Q: 插件连接失败怎么办？**
A: 检查以下几点：
- 确保令牌 `PLAYWRIGHT_MCP_EXTENSION_TOKEN` 正确
- 确保浏览器中的插件已启用
- 尝试刷新插件页面或重启浏览器

## 进阶技巧

1. **使用特定设备模拟**：
   添加 `"--device", "iPhone 15"` 参数可以模拟移动设备浏览

2. **设置视口大小**：
   添加 `"--viewport-size", "1280x720"` 参数可以设置浏览器窗口大小

3. **保存会话**：
   添加 `"--save-session"` 参数可以保存会话数据到输出目录

4. **忽略 HTTPS 错误**：
   添加 `"--ignore-https-errors"` 参数可以忽略 HTTPS 证书错误
```

现在你已经有了使用官方 Playwright MCP 包与 Edge 浏览器的完整指南！只需选择一个配置文件，将其添加到你的 MCP 客户端，然后就可以开始自动化浏览器操作了。