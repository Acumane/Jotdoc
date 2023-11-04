const vscode = require('vscode') // extension API
const Color = require("tinycolor2")
const replace = require('@jotdoc/replace'),
	  unify = require('@jotdoc/unify')

const CONF = {
	'disabledFeatures':      null,
	'replace.disabledRules': null,
	'replace.userRules':     null,
	'unify.userColors':      null
}

function loadConf() {
	let ROOT = vscode.workspace.getConfiguration('jotdoc')
	for (const c in CONF) {
		let val = ROOT.get(c)
		CONF[c] = c.includes('disabled') ? val.split(', ').filter(Boolean) : val
	}
}; loadConf()

function userRuleCheck() {
	if (CONF['replace.userRules'].length) { // custom rules provided
		CONF['replace.userRules'].forEach(rule => {
			let valid = true
			if (rule && rule.name && rule.re && rule.sub){ 
				try {
					let pattern = rule.re.slice(1, rule.re.lastIndexOf('/'))
					let flags = rule.re.slice(rule.re.lastIndexOf('/') + 1)
					// if (replace.res.some( re => re.name === rule.name))
					replace.res.push({name: rule.name, re: new RegExp(pattern, flags), sub: rule.sub, default: true})
				}
				catch(e) { valid = false }
			}
			else valid = false
			if (!valid) vscode.window.showWarningMessage(`Custom rule "${rule.name}" is malformed!`)
		})
	}
}; userRuleCheck()

function userColorCheck() {
	if (CONF['unify.userColors'].length) { // colors provided
		CONF['unify.userColors'].forEach(c => {
			let valid = true
			if (c && c.name && c.color){ 
				if (Color(c.color).isValid()) 
					unify.userColor.push({name: c.name, color: c.color})
				else valid = false 
			}
			else valid = false
			if (!valid) vscode.window.showWarningMessage(`Custom color "${c.name}" is malformed!`)
		})
	}

}; userColorCheck()

function reOpts() { // + check
	let object = {}
	CONF['replace.disabledRules'].forEach( rule => {
		if (replace.res.some( re => re.name === rule))
			object[rule] = false;
		else
			vscode.window.showWarningMessage(`Rule "${rule}" does not exist!`)
	})
	return object
}

let features = [
	['sup', {}, null ],
	['sub', {}, null ],
	['align', {}, null ],
	['replace', reOpts(), replace ],
	['fracs', {}, null ],
	['comments', {}, null ],
	['unify', {}, unify ]
]

function featureCheck() {
	CONF['disabledFeatures'].forEach(i => {
		if (!features.some(j => i === j[0]))
			vscode.window.showWarningMessage(`Feature "${i}" does not exist!`)
	})
}; featureCheck()

let confChange = vscode.workspace.onDidChangeConfiguration((event) => {
	if (Object.keys(CONF).some(setting => event.affectsConfiguration(`jotdoc.${setting}`))) {
		vscode.window.showInformationMessage('Code must reload to reflect changes.', 'Reload')
		.then(selection => { if (selection === 'Reload')
			vscode.commands.executeCommand("workbench.action.reloadWindow")
		})

		loadConf()
		reOpts(); featureCheck(); userRuleCheck(); userColorCheck()
	}
})

let enabledFeatures = features.filter(f => !CONF['disabledFeatures'].includes(f[0]))

module.exports = {
	enabledFeatures,
	confChange
}