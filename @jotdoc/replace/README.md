
# @jotdoc/replace  [![npm](https://img.shields.io/npm/v/%40jotdoc%2Freplace?style=flat-square&logo=npm&label=%20&labelColor=white&color=%23eef)](https://www.npmjs.com/package/@jotdoc/replace) 

(User-defined) inline pattern substitutions for the [markdown-it](https://github.com/markdown-it/markdown-it) parser

> ❗⠀This plugin belongs to a family of experimental features called **Jotdoc**: a  "flavor" of Markdown aiming to maximize readability and extend markup for common use cases where verbose HTML is required.
>
> If you're interested, please do [share your thoughts](https://github.com/Acumane/jotdoc/discussions) and check out the [monorepo](https://github.com/Acumane/jotdoc)!

### Demo
Default replacement patterns include:

<sub>(`·` = whitespace )</sub>
| `...` |  …  |
| :---: | :-: |
| `--`  |  —  |
| `·->·`  |  →  |

Agnostic to whether `typographer` (markdown-it replacements) is enabled.
Your rules take precedence!

### Enable

```js
const md = require('markdown-it')()

      md.use(require('@jotdoc/replace'), { /* OPTIONS */ })
```

### Options

Disable rules by name:
```js
const replace = require('@jotdoc/replace')
md.use(replace), {larrow: false})
```
—or add your own like so:
```js
replace.res.push({
  name: 'neq',
  re: /!=/g,
  sub: "\u2260", // ≠
  default: true
})

```