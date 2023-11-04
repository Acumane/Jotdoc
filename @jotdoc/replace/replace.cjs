
'use strict'

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
          for (const r of res) {
            if (options[r.name] !== undefined ? options[r.name] : r.default) {
              token.content = token.content.replace(r.re, r.sub)
            }
          }
				}
			}
		}
	})
}

let res = [
  {
    name: 'plusminus',
    re: /\+-/g,
    sub: '\u00b1',
    default: true
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
    default: true
  }
]

module.exports.res = res
