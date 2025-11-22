#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serverPath = join(__dirname, 'mcp-server', 'index.js');

console.log('Starting Playwright MCP Server test...');
console.log(`Server path: ${serverPath}`);

// Start the MCP server
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: __dirname,
  env: {
    ...process.env,
    PLAYWRIGHT_BROWSERS_PATH: '0',
    PLAYWRIGHT_MCP_EXTENSION_TOKEN: 'ZcgdS5kSBPamE5N5O67QvMtHOv_4K5xdfTNjMRVHCaU'
  }
});

server.stdout.on('data', (data) => {
  console.log(`Server output: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Send a test request to list tools
const listToolsRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list',
  params: {}
};

setTimeout(() => {
  console.log('Sending list tools request...');
  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
}, 2000);

// Close the test after 10 seconds
setTimeout(() => {
  console.log('Closing test...');
  server.kill();
}, 10000);
