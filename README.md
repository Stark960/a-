
# Guardia 手机防火墙卫士

这是一个基于 React 19 和 Capacitor 构建的高保真手机防火墙演示应用，采用 Material 3 设计规范。

## 🚀 无需本地 SDK 构建 APK (云端构建)

本项目已配置完善的 GitHub Actions 自动化流水线。您无需在本地安装 Android Studio 或 Java SDK 即可获得安装包：

1. **推送代码**：将此项目推送到您的 GitHub 仓库。
2. **触发构建**：
   - 每次 `push` 会自动触发。
   - 手动触发：前往仓库的 `Actions` 页面 -> 选择 `Build Android APK` -> 点击 `Run workflow`。
3. **获取安装包**：
   - 构建成功后，点击对应的 Workflow 记录。
   - 在页面底部的 `Artifacts` 区域下载 `guardia-firewall-apk`。
   - 解压后即可得到可以在安卓手机上安装的 `.apk` 文件。

## ✨ 功能特性
- **实时监控**：图形化展示系统保护状态，支持一键启停。
- **规则管理**：
  - **白名单**：信任号码直接通行。
  - **黑名单**：自动拦截骚扰电话。
  - **内容过滤**：基于关键字自动过滤垃圾短信。
- **安全日志**：详尽记录拦截时间、来源及原因，支持内容预览。
- **模拟器**：内置调试工具，可模拟任何号码的呼叫与短信进入。

## 🛠 技术栈
- **前端框架**：React 19 (Hooks, Functional Components)
- **样式方案**：Tailwind CSS (Material 3 Design Tokens)
- **跨平台引擎**：Capacitor JS
- **构建工具**：esbuild
- **持续集成**：GitHub Actions (Android SDK 17+ Build Environment)

## 📱 本地开发
如果您想在本地运行 Web 版本：
1. `npm install`
2. `npm run build` (产物在 `dist/` 目录)
3. 使用任何静态服务器预览 `index.html`。
