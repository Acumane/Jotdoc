const { enabledFeatures, confChange } = require('./config.js')

function activate(context) {

	context.subscriptions.push(confChange)

	return {
		extendMarkdownIt(md) {
			for (const f of enabledFeatures)
				md.use(f[2]? f[2] : require(`@jotdoc/${f[0]}`), f[1])
			return md
		}
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
