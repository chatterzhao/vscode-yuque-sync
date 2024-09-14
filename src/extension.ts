import * as vscode from 'vscode';
import axios, { AxiosResponse } from 'axios';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('yuqueSync.browse', async () => {
        const token = vscode.workspace.getConfiguration().get('yuqueSync.token') as string;
        if (!token) {
            vscode.window.showErrorMessage('请先设置Yuque API token');
            return;
        }

        try {
            const response: AxiosResponse = await axios.get('https://www.yuque.com/api/v2/user', {
                headers: { 'X-Auth-Token': token }
            });
            vscode.window.showInformationMessage(`欢迎, ${response.data.data.name}!`);
            // 这里可以添加获取文档列表的逻辑
        } catch (error) {
            vscode.window.showErrorMessage('无法连接到Yuque API');
        }
    });

    context.subscriptions.push(disposable);

    // 这里可以添加edit和sync命令的实现

    let editDisposable = vscode.commands.registerCommand('yuqueSync.edit', async () => {
        const token = vscode.workspace.getConfiguration().get('yuqueSync.token') as string;
        if (!token) {
            vscode.window.showErrorMessage('请先设置Yuque API token');
            return;
        }

        // 这里应该先让用户选择要编辑的文档
        // 为了简化,我们假设已经知道文档ID
        const docId = 'your_doc_id';

        try {
            const response: AxiosResponse = await axios.get(`https://www.yuque.com/api/v2/docs/${docId}`, {
                headers: { 'X-Auth-Token': token }
            });
            
            const document = await vscode.workspace.openTextDocument({
                content: response.data.data.body,
                language: 'markdown'
            });
            await vscode.window.showTextDocument(document);
        } catch (error) {
            vscode.window.showErrorMessage('无法获取文档内容');
        }
    });

    context.subscriptions.push(editDisposable);

    let syncDisposable = vscode.commands.registerCommand('yuqueSync.sync', async () => {
        const token = vscode.workspace.getConfiguration().get('yuqueSync.token') as string;
        if (!token) {
            vscode.window.showErrorMessage('请先设置Yuque API token');
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('没有打开的文档');
            return;
        }

        // 这里应该获取当前文档对应的语雀文档ID
        // 为了简化,我们假设已经知道文档ID
        const docId = 'your_doc_id';

        try {
            await axios.put(`https://www.yuque.com/api/v2/docs/${docId}`, {
                body: editor.document.getText()
            }, {
                headers: { 'X-Auth-Token': token }
            });
            vscode.window.showInformationMessage('文档已成功同步到语雀');
        } catch (error) {
            vscode.window.showErrorMessage('同步文档失败');
        }
    });

    context.subscriptions.push(syncDisposable);
}

export function deactivate() {}