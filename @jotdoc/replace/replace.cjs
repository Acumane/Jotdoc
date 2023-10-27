
const replacements = [
  {
    name: 'plusminus',
    re: /\+-/g,
    sub: '\u00b1',
    default: false
  },
  {
    name: 'ellipsis',
    re: /\.\.\./g,
    sub: '\u2026',
    default: true
  },
  {
    name: 'larrow',
    re: /<--/g,
    sub: '\u2190',
    default: true
  },
  {
    name: 'larrow',
    re: /<-/g,
    sub: '\u2190',
    default: true
  },
  {
    name: 'rarrow',
    re: /-->/g,
    sub: '\u2192',
    default: true
  },
  {
    name: 'rarrow',
    re: /->/g,
    sub: '\u2192',
    default: true
  },
  {
    name: 'mdash',
    re: /(^|[^-])--([^-]|$)/mg,
    sub: '$1\u2014$2',
    default: false
  }
]

module.exports = (md, options) => {
  if (!options) options = {}

  md.core.ruler.at('replacements', (state) => {
    let insideLink = 0

		for (const block of state.tokens) {
			if (block.type !== 'inline') continue
			let tokens = block.children

			for (let i = tokens.length - 1; i >= 0; i--) {
				const token = tokens[i]

				if (token.type === 'link_open' || token.type === 'link_close') {
					if (token.info === 'auto') insideLink -= token.nesting
				}

				if (token.type === 'text' && !insideLink) {
          for (const rep of replacements) {
            if (options[rep.name] !== undefined ? options[rep.name] : rep.default) {
              token.content = token.content.replace(rep.re, rep.sub)
            }
          }
				}
			}
		}
	})
}

module.exports.replacements = replacements
