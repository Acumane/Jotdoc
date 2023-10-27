const vscode = require('vscode'); // extension API

function activate(context) {
	return {
		extendMarkdownIt(md) {
			return md.use(require('@jotdoc/sup'))
					 .use(require('@jotdoc/sub'))
					 .use(require('@jotdoc/align'))
					 .use(require('@jotdoc/replace'), {mdash: true})
		}
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
