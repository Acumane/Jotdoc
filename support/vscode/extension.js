const vscode = require('vscode'); // extension API
let conf = vscode.workspace.getConfiguration('jotdoc')

let disabledFeatures = conf.get('disabledFeatures').split(', ')
let reDisabledRules = conf.get('replace.disabledRules').split(', ')

function reOptions() {
	let options = {}
	for (let d of reDisabledRules)
		options[d] = false
	console.log(options)
	return options
}

const features = {
	'@jotdoc/sup': {},
	'@jotdoc/sub': {},
	'@jotdoc/align': {},
	'@jotdoc/replace': reOptions(),
}

function activate(context) { // 
	console.warn(disabledFeatures)
	console.warn(reDisabledRules)

	return {
		extendMarkdownIt(md) {
			for (const f of Object.keys(features)) 
				md.use(require(f), features[f])
			return md
		}
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
