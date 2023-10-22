const vscode = require('vscode'); // extension API

function activate(context) {
	return {
		extendMarkdownIt(md) {
			return md.use(require('@jotdoc/sup'))
					 .use(require('@jotdoc/sub'))
		}
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
