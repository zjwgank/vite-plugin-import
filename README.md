# vite-plugin-import

旨在解决vite构建项目时import 外部依赖时依赖匹配不到的问题

![alt image](https://fengniaocdn.zuoyebang.com/fengniao_cc81f5c8b254d2fa7faf35c56795d7ca.png)

### 配置

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import dependenceImport from 'vite-plugin-import/dist/index.mjs'

export default defineConfig({
  plugins: [
    vue(),
    dependenceImport([
      {
        name: "XXXX", // 需要处理的依赖包
        exts: [".vue",".js"], // 需要为导入依赖兼容的后缀
      },
    ]),
  ],
  optimizeDeps: {
    exclude: ["XXX"], // 需要处理的依赖
  },
});
```