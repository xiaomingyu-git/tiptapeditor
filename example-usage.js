#!/usr/bin/env node

// 这是一个使用 Playwright MCP 服务器的示例脚本
// 展示了如何通过 MCP 客户端与服务器交互，执行浏览器自动化任务

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 示例1: 自动搜索并截图
async function example1_SearchAndScreenshot() {
  console.log("=== 示例1: 自动搜索并截图 ===");

  // 1. 启动浏览器
  console.log("1. 启动 Edge 浏览器...");
  await executeTool("launch_browser", {
    headless: false
    // 可以添加 userDataDir 来使用已有的 Edge 配置文件
    // userDataDir: "C:\\Users\\xiaom\\AppData\\Local\\Microsoft\\Edge\\User Data"
  });

  // 2. 导航到搜索引擎
  console.log("2. 导航到百度...");
  await executeTool("goto_page", {
    url: "https://www.baidu.com"
  });

  // 3. 等待搜索框加载
  console.log("3. 等待搜索框加载...");
  await executeTool("wait_for_element", {
    selector: "#kw",
    timeout: 5000
  });

  // 4. 输入搜索内容
  console.log("4. 输入搜索内容 'Playwright 自动化'...");
  await executeTool("type_text", {
    selector: "#kw",
    text: "Playwright 自动化"
  });

  // 5. 点击搜索按钮
  console.log("5. 点击搜索按钮...");
  await executeTool("click_element", {
    selector: "#su"
  });

  // 6. 等待搜索结果加载
  console.log("6. 等待搜索结果加载...");
  await executeTool("wait_for_element", {
    selector: ".result",
    timeout: 5000
  });

  // 7. 截取屏幕截图
  console.log("7. 截取屏幕截图...");
  const screenshotPath = join(__dirname, "baidu-search-result.png");
  await executeTool("screenshot", {
    path: screenshotPath
  });
  console.log(`截图已保存到: ${screenshotPath}`);

  // 8. 关闭浏览器
  console.log("8. 关闭浏览器...");
  await executeTool("close_browser");
}

// 示例2: 获取页面内容
async function example2_GetPageContent() {
  console.log("=== 示例2: 获取页面内容 ===");

  // 1. 启动浏览器
  console.log("1. 启动 Edge 浏览器...");
  await executeTool("launch_browser");

  // 2. 导航到目标页面
  console.log("2. 导航到 GitHub...");
  await executeTool("goto_page", {
    url: "https://github.com/microsoft/playwright"
  });

  // 3. 获取页面内容
  console.log("3. 获取页面内容...");
  const result = await executeTool("get_page_content");
  console.log("页面标题:", extractTitle(result.content[0].text));

  // 4. 关闭浏览器
  console.log("4. 关闭浏览器...");
  await executeTool("close_browser");
}

// 示例3: 表单填写
async function example3_FillForm() {
  console.log("=== 示例3: 表单填写 ===");

  // 1. 启动浏览器
  console.log("1. 启动 Edge 浏览器...");
  await executeTool("launch_browser");

  // 2. 导航到表单页面（使用示例表单网站）
  console.log("2. 导航到表单页面...");
  await executeTool("goto_page", {
    url: "https://www.w3schools.com/html/html_forms.asp"
  });

  // 3. 等待页面加载
  console.log("3. 等待页面加载...");
  await executeTool("wait_for_element", {
    selector: "input[type='text']",
    timeout: 5000
  });

  // 4. 填写表单（注意：这只是一个示例，实际选择器可能需要调整）
  console.log("4. 填写表单...");
  try {
    await executeTool("type_text", {
      selector: "input[type='text']",
      text: "测试用户名"
    });

    // 提交表单
    console.log("5. 提交表单...");
    await executeTool("click_element", {
      selector: "input[type='submit']"
    });
  } catch (error) {
    console.log("表单填写失败（可能是示例网站结构已更改）:", error.message);
  }

  // 6. 关闭浏览器
  console.log("6. 关闭浏览器...");
  await executeTool("close_browser");
}

// 辅助函数：执行工具
async function executeTool(toolName, arguments = {}) {
  const request = {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: arguments
    }
  };

  // 创建子进程运行 MCP 服务器
  const server = spawn('node', [join(__dirname, 'mcp-server', 'index.js')], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: __dirname,
    env: {
      ...process.env,
      PLAYWRIGHT_BROWSERS_PATH: '0',
      PLAYWRIGHT_BROWSER: 'msedge'
    }
  });

  return new Promise((resolve, reject) => {
    let response = '';

    // 处理服务器输出
    server.stdout.on('data', (data) => {
      response += data.toString();

      // 尝试解析完整的响应
      try {
        const lines = response.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
          const result = JSON.parse(lines[lines.length - 1]);
          if (result.result || result.error) {
            server.kill();
            if (result.error) {
              reject(new Error(result.error.message));
            } else {
              resolve(result.result);
            }
          }
        }
      } catch (e) {
        // 还没有完整的响应，继续等待
      }
    });

    // 处理错误
    server.stderr.on('data', (data) => {
      console.error(`服务器错误: ${data}`);
    });

    // 发送请求
    server.stdin.write(JSON.stringify(request) + '\n');

    // 设置超时
    setTimeout(() => {
      server.kill();
      reject(new Error('请求超时'));
    }, 30000);
  });
}

// 辅助函数：从 HTML 中提取标题
function extractTitle(html) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  return titleMatch ? titleMatch[1] : "未找到标题";
}

// 主函数：运行示例
async function main() {
  console.log("Playwright MCP 服务器使用示例");
  console.log("请选择要运行的示例:");
  console.log("1. 搜索并截图");
  console.log("2. 获取页面内容");
  console.log("3. 表单填写");
  console.log("4. 运行所有示例");

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("请输入选项 (1-4): ", async (answer) => {
    try {
      switch (answer) {
        case '1':
          await example1_SearchAndScreenshot();
          break;
        case '2':
          await example2_GetPageContent();
          break;
        case '3':
          await example3_FillForm();
          break;
        case '4':
          await example1_SearchAndScreenshot();
          console.log("\n");
          await example2_GetPageContent();
          console.log("\n");
          await example3_FillForm();
          break;
        default:
          console.log("无效选项，退出程序");
      }
    } catch (error) {
      console.error("运行示例时出错:", error.message);
    }

    rl.close();
    console.log("示例运行完成");
  });
}

// 运行主函数
main().catch(console.error);
