import * as vscode from 'vscode';
import { ExplorerView } from './webview/ExplorerView';

export function activate({ subscriptions, extensionUri }: vscode.ExtensionContext) {

	const explorerSidebar = ExplorerView.getInstance(extensionUri);
	let explorerView = vscode.window.registerWebviewViewProvider(ExplorerView.viewType, explorerSidebar, {
		webviewOptions: {
			retainContextWhenHidden: true
		}
	});

	subscriptions.push(explorerView);
}

// this method is called when your extension is deactivated
export function deactivate() {}
