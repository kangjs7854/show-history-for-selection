// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "show-history-for-selection" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "show-history-for-selection",
    () => {
      const editor = vscode.window.activeTextEditor;
      // editor === undefind 表示没有打开的文件
      if (!editor) return;
      // 当前被选中文本的位置信息数组（实际上就是range组成的数组）
      const Ranges = editor.selections;
      const currentlyOpenTabfilePath =
        vscode.window.activeTextEditor?.document.uri.fsPath;
      const command = `git log -L ${Ranges[0].start.line},${Ranges[0].end.line}:${currentlyOpenTabfilePath}`;
      vscode.window.activeTerminal?.show();
      vscode.window.activeTerminal?.sendText(command);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
