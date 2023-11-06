
# @jotdoc/sup  [![npm](https://img.shields.io/npm/v/%40jotdoc%2Fsup?style=flat-square&logo=npm&label=%20&labelColor=white&color=%23eef)](https://www.npmjs.com/package/@jotdoc/sup) 


Whitespace-delimited (`<sup>`)erscripts for the [markdown-it](https://github.com/markdown-it/markdown-it) parser

> ❗⠀This plugin belongs to a family of experimental features called **Jotdoc**: a  "flavor" of Markdown aiming to maximize readability and extend markup for common use cases where verbose HTML is required.
>
> If you're interested, please do [share your thoughts](https://github.com/Acumane/jotdoc/discussions) and check out the [monorepo](https://github.com/Acumane/jotdoc)!

### Demo

<sub>(`·` = whitespace )</sub>
<table style="width: 100%"><tr><td>

`x^2·+·...`

</td><td>

x<sup>2</sup> + ...

</td></tr></table>

If you want spaces in your terms, enclose w/ parenthesis:

<table style="width: 100%"><tr><td>

`D^(m·+·n)`

</td><td>

D<sup>m + n</sup>

</td></tr></table>

Compatible with conventional superscript syntax (`^...^`)

### Enable

```js
const md = require('markdown-it')()

      md.use(require('@jotdoc/sup'))
```