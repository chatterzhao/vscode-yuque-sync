# Yuque Sync VS Code 扩展

这是一个用于在Visual Studio Code中浏览、编辑和同步语雀文档的扩展。

## 功能

- 浏览语雀文档
- 编辑语雀文档
- 同步文档内容到语雀

## 安装

目前，这个扩展还未发布到VS Code扩展市场。您可以通过以下步骤在本地安装和使用：

1. 克隆或下载此项目到本地
2. 打开终端，进入项目目录
3. 运行 `npm install` 安装依赖
4. 运行 `npm run compile` 编译项目
5. 按 `F5` 键在新的VS Code窗口中启动扩展

## 配置

在使用扩展之前，您需要设置您的语雀API token：

1. 在VS Code中，打开设置（文件 > 首选项 > 设置）
2. 搜索"Yuque Sync"
3. 在"Yuque: Token"字段中输入您的语雀API token

要获取语雀API token：
1. 登录您的语雀账号
2. 进入个人设置 > 账户设置 > 开发者设置
3. 创建一个新的应用，获取API token

## 使用方法

### 浏览文档

1. 按下`Ctrl+Shift+P`（在macOS上是`Cmd+Shift+P`）打开命令面板
2. 输入"Yuque: Browse Documents"并选择

### 编辑文档

1. 按下`Ctrl+Shift+P`（在macOS上是`Cmd+Shift+P`）打开命令面板
2. 输入"Yuque: Edit Document"并选择
3. 选择您想要编辑的文档

### 同步文档

1. 在编辑文档后，按下`Ctrl+Shift+P`（在macOS上是`Cmd+Shift+P`）打开命令面板
2. 输入"Yuque: Sync Document"并选择

## 注意事项

- 请确保您有足够的权限来访问和编辑您想要操作的文档。
- 同步操作会覆盖语雀上的文档内容，请谨慎操作。
- 目前扩展还不支持创建新文档和删除文档，这些功能将在未来的版本中添加。
- 当前版本中，文档ID是硬编码的。在实际使用时，您需要修改`src/extension.ts`文件中的`docId`变量为您要操作的文档ID。

## 贡献

如果您想要为这个项目做出贡献，请查看[贡献指南](CONTRIBUTING.md)。

## 问题反馈

如果您在使用过程中遇到任何问题，或有任何改进建议，请在GitHub仓库中提交issue。

## 许可证

本扩展遵循MIT许可证。