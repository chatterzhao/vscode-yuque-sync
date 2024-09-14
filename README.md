# 语雀同步扩展
> Yuque Sync Extension

这是一个用于在 Visual Studio Code 中浏览、编辑和同步语雀文档的扩展。

## 功能

- 浏览语雀文档
- 编辑语雀文档
- 同步文档内容到语雀

## 安装

搜索扩展`yuque-sync`进行安装


## 申请 API Token
> 语雀高级会员才可申请 Token
1. 点击链接去申请：[https://www.yuque.com/settings/tokens](https://www.yuque.com/settings/tokens)
2. 打开链接后登录您的语雀账号
3. 进入个人设置 > 账户设置 > 开发者设置
4. 创建一个新的应用，获取 API token
5. 输入后返回即可，会自动保存


## 配置

在使用扩展之前，您需要设置您的语雀 API token：
> 打开扩展，如果没有配置 API Token，扩展默认会打开配置页面，如果没有打开或者要修改 API Token，请按下面的指引进行操作

1. 在VS Code中，打开设置（文件 > 首选项 > 设置）
2. 搜索"Yuque Sync"
3. 在"Yuque: Token"字段中输入您的语雀 API token



## 使用方法

1. 在VS Code的侧边栏中，找到Yuque Sync图标并点击。
2. 在打开的面板中，输入您的Yuque API token并保存。
3. 使用面板中的按钮来浏览、编辑或同步文档。

您仍然可以使用命令面板（Ctrl+Shift+P 或 Cmd+Shift+P）来执行这些操作：
- "Yuque: Browse Documents"
- "Yuque: Edit Document"
- "Yuque: Sync Document"

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