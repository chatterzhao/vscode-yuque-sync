import * as vscode from 'vscode';
import axios from 'axios';

// 语雀知识库接口
interface YuqueRepo {
    id: number;
    name: string;
    namespace: string;
}

// 语雀文档接口
interface YuqueDoc {
    id: number;
    title: string;
    slug: string;
}

// 语雀树数据提供者类，实现了vscode.TreeDataProvider接口
class YuqueTreeDataProvider implements vscode.TreeDataProvider<YuqueItem> {
    // 树数据变化事件
    private _onDidChangeTreeData: vscode.EventEmitter<YuqueItem | undefined | null | void> = new vscode.EventEmitter<YuqueItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<YuqueItem | undefined | null | void> = this._onDidChangeTreeData.event;

    // 构造函数，接收语雀API token
    constructor(private token: string) {}

    // 刷新树数据
    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    // 获取树项
    getTreeItem(element: YuqueItem): vscode.TreeItem {
        return element;
    }

    // 获取子节点
    async getChildren(element?: YuqueItem): Promise<YuqueItem[]> {
        if (!element) {
            // 根节点，获取知识库列表
            const repos = await this.getRepos();
            return repos.map(repo => new YuqueItem(repo.name, vscode.TreeItemCollapsibleState.Collapsed, 'repo', repo.namespace));
        } else if (element.contextValue === 'repo') {
            // 知识库节点，获取文档列表
            const docs = await this.getDocs(element.namespace);
            return docs.map(doc => new YuqueItem(doc.title, vscode.TreeItemCollapsibleState.None, 'doc', doc.slug));
        }
        return [];
    }

    // 获取知识库列表
    private async getRepos(): Promise<YuqueRepo[]> {
        try {
            const response = await axios.get('https://www.yuque.com/api/v2/users/self/repos', {
                headers: { 'X-Auth-Token': this.token }
            });
            return response.data.data;
        } catch (error) {
            vscode.window.showErrorMessage('Failed to fetch repositories');
            return [];
        }
    }

    // 获取文档列表
    private async getDocs(namespace: string): Promise<YuqueDoc[]> {
        try {
            const response = await axios.get(`https://www.yuque.com/api/v2/repos/${namespace}/docs`, {
                headers: { 'X-Auth-Token': this.token }
            });
            return response.data.data;
        } catch (error) {
            vscode.window.showErrorMessage('Failed to fetch documents');
            return [];
        }
    }
}

// 语雀树项类，继承自vscode.TreeItem
class YuqueItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly contextValue: string,
        public readonly namespace: string
    ) {
        super(label, collapsibleState);
    }
}

// 激活扩展
export function activate(context: vscode.ExtensionContext) {
    // 获取配置中的语雀API token
    const token = vscode.workspace.getConfiguration().get('yuqueSync.token') as string;

    if (!token) {
        // 如果没有设置token，提示用户设置
        vscode.window.showInformationMessage("请先设置您的语雀 API token，如果还没有请从这里[申请](https://www.yuque.com/settings/tokens)");
        vscode.commands.executeCommand('workbench.action.openSettings', 'yuqueSync.token');
        return;
    }

    // 创建树数据提供者实例
    const treeDataProvider = new YuqueTreeDataProvider(token);

    // 注册树数据提供者
    vscode.window.registerTreeDataProvider('yuqueSyncView', treeDataProvider);

    // 注册刷新树命令
    let disposable = vscode.commands.registerCommand('yuqueSync.refreshTree', () => {
        treeDataProvider.refresh();
    });

    context.subscriptions.push(disposable);

    // 注册打开文档命令
    disposable = vscode.commands.registerCommand('yuqueSync.openDocument', async (item: YuqueItem) => {
        if (item.contextValue === 'doc') {
            try {
                const response = await axios.get(`https://www.yuque.com/api/v2/repos/${item.namespace}/docs/${item.label}`, {
                    headers: { 'X-Auth-Token': token }
                });
                const doc = response.data.data;
                const document = await vscode.workspace.openTextDocument({
                    content: doc.body,
                    language: 'markdown'
                });
                await vscode.window.showTextDocument(document);
            } catch (error) {
                vscode.window.showErrorMessage('Failed to open document');
            }
        }
    });

    context.subscriptions.push(disposable);

    // 注册同步文档命令
    disposable = vscode.commands.registerCommand('yuqueSync.syncDocument', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            // 这里需要实现同步逻辑，可能需要额外的元数据来识别当前文档对应的语雀文档
            vscode.window.showInformationMessage('Document synced to Yuque');
        } else {
            vscode.window.showErrorMessage('No active document to sync');
        }
    });

    context.subscriptions.push(disposable);
}

// 停用扩展
export function deactivate() {}
