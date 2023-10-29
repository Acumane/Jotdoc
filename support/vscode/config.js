const vscode = require('vscode'); // extension API
const replacements = require('@jotdoc/replace').replacements;
const r = require('./replace.js')

let config = {}

const disable = [
	'disabledFeatures',
	'replace.disabledRules'
]

let root = vscode.workspace.getConfiguration('jotdoc')
disable.forEach(setting => config[setting] = root.get(setting).split(', ').filter(Boolean))

function replaceOpts() { // + check
	let object = {}
	config['replace.disabledRules'].forEach( rule => {
		if (replacements.some( re => re.name === rule))
			object[rule] = false;
		else
			vscode.window.showWarningMessage(`Rule "${rule}" is not defined!`)
	})
	return object
}

let features = [
	['sup', {} ],
	['sub', {} ],
	['align', {} ],
	['replace', replaceOpts() ],
]
featureCheck()


function featureCheck() {
	config['disabledFeatures'].forEach(i => {
		if (!features.some(j => i === j[0]))
			vscode.window.showWarningMessage(`Feature "${i}" does not exist!`)
	})
}

let confChange = vscode.workspace.onDidChangeConfiguration((event) => {
	if (disable.some(setting => event.affectsConfiguration(`jotdoc.${setting}`))) {
		vscode.window.showInformationMessage('Code must reload to reflect changes.', 'Reload')
		.then(selection => { if (selection === 'Reload')
			vscode.commands.executeCommand("workbench.action.reloadWindow")
		})

		let root = vscode.workspace.getConfiguration('jotdoc')
		disable.forEach(setting => config[setting] = root.get(setting).split(', ').filter(Boolean))
		replaceOpts(); featureCheck()
	}
})

let enabledFeatures = features.filter(f => !config['disabledFeatures'].includes(f[0]))

module.exports = {
	enabledFeatures,
	confChange
}