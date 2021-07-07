# VSCode Extensions Panel

An extension that provides an activity panel that other extensions can use to add their actions. When you want to visualize your command or extension actions, this extension provides a quick and easy way to do this. Instead of writing your view panel, you register your extension for panel usage with the required configuration.

![sample](./assets/sample.png)

## Usage

### Extension dependency

First, you can take a dependency on this extension. It isn't a requirement, but when you do, you make sure this extension will get installed when your extension gets installed.

In your `package.json` add the following content:

```json
{
  ...
  "extensionDependencies": [
    "eliostruyf.vscode-extension-panel"
  ],
}
```

> *Info*: You can continue without this configuration. When the user doesn't have this extension installed, it will simply skip the visualization of your actions in a view panel.

### Register your actions

The extension panel will look for a specific command in your extension and executes it. To define your actions, you will need to create the following command registration in your extension's code:

```typescript
context.subscriptions.push(vscode.commands.registerCommand('<publisher>.<your-extension-name>.panel.registration', () => {
		return {
			id: '<your-extension-name>',
			title: 'Extension actions',
			description: 'Actions for testing purposes only.',
			actions: [{
				title: 'Action 1',
				command: 'vscode-extension-panel.panel.test',
				data: true,
				type: "checkbox"
			}, {
				title: 'Action 2',
				command: 'vscode-extension-panel.panel.test',
				data: 'Just extra text',
				type: "button"
			}]
		};
	})
);
```

**Important**: Update the `<publisher>` and `<your-extension-name>` values with the publisher and extension name of your extension.

> *Info*: Whenever a file gets opened, the panel will call this command and allows you to dynamically define which actions you want to show per file, type, ...
> *Example*: An example integraton of this Extension Panel by another extension can be found in the [Writing Style Guide](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-microsoft-writingstyleguide). Find the code for this here: [extension.ts - Lines 80-103](https://github.com/estruyf/vscode-microsoft-writingstyleguide/blob/main/src/extension.ts#L80-L103).

#### Registration object

The registration object need to contain the following properties:

```javascript
{
	id: '<your-extension-name>',
	title: '<your title>',
	description: '<your description>',
	actions: []
}
```

##### Actions

Actions contain the following properties:

```javascript
{
	title: '<action title>',
	command: '<your command to execute>', // This is the command ID defined in your extension you want to execute
	data: '' | {} | [] | true/false, // This is an optional property. When using a "checkbox", you need to pass `true` or `false`. When using a button, this can be `any` type of data you want to pass. On a button click, the data will be passed to your command execution.
	type: "button" | "checkbox"
}
```

## Feedback / issues / ideas

Please submit feedback/issues/ideas by creating an issue in the project repository: [issue list](https://github.com/estruyf/vscode-extension-panel/issues).

## Used by

Feel free to do a PR to add your extension to the list:

- [Writing Style Guide](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-microsoft-writingstyleguide)