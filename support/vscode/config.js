const vscode = require('vscode'); // extension API
let replace = require('@jotdoc/replace')

let config = {}

const disable = [
	'disabledFeatures',
	'replace.disabledRules',
]

const settings = [
	'replace.customRules'
]

let root = vscode.workspace.getConfiguration('jotdoc')
disable.forEach(setting => config[setting] = root.get(setting).split(', ').filter(Boolean))
let customRules = root.get('replace.customRules')

function customRuleCheck() {
	if (customRules.length) { // custom rules provided
		customRules.forEach(rule => {
			let valid = true
			if (rule && rule.name && rule.re && rule.sub){ 
				try {
					let [, regex, flags] = rule.re.split('/')
					replace.res.push({name: rule.name, re: new RegExp(regex, flags), sub: rule.sub, default: true})
				}
				catch(e) { valid = false }
			}
			else valid = false
			if (!valid) vscode.window.showWarningMessage(`Custom rule "${rule.name}" is malformed!`)
		})
	}
}
customRuleCheck()

function replaceOpts() { // + check
	let object = {}
	config['replace.disabledRules'].forEach( rule => {
		if (replace.res.some( re => re.name === rule))
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
	['fracs', {} ]
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
	if (settings.some(setting => event.affectsConfiguration(`jotdoc.${setting}`))) {
		let root = vscode.workspace.getConfiguration('jotdoc')
		customRules = root.get('replace.customRules')
		vscode.window.showInformationMessage('Option changedd')
		customRuleCheck()
	}
})

let enabledFeatures = features.filter(f => !config['disabledFeatures'].includes(f[0]))

module.exports = {
	enabledFeatures,
	confChange,
	replace
}