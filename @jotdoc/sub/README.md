# @jotdoc/sub  [![npm](https://img.shields.io/npm/v/%40jotdoc%2Fsub?style=flat-square&logo=npm&label=%20&labelColor=white&color=%23eef)](https://www.npmjs.com/package/@jotdoc/sub) 

Whitespace-terminating (`<sub>`)scripts for the [markdown-it](https://github.com/markdown-it/markdown-it) parser

> ❗⠀This plugin belongs to a family of experimental features called **Jotdoc**: a  "flavor" of Markdown aiming to maximize readability and extend markup for common use cases where verbose HTML is required.
>
> If you're interested, please do [share your thoughts](https://github.com/Acumane/jotdoc/discussions) and check out the [monorepo](https://github.com/Acumane/jotdoc)!

### Demo

<sub>(`·` = whitespace )</sub>
<table style="width: 100%"><tr><td>

`x_n·+·...`

</td><td>

x<sub>n</sub> + ...

</td></tr></table>

If you want spaces in your terms, enclose w/ parenthesis:

<table style="width: 100%"><tr><td>

`D_(test·#1)`

</td><td>

D<sub>test #1</sub>

</td></tr></table>

Compatible with conventional subscript syntax (`~...~`)

### Enable

```js
const md = require('markdown-it')()

      md.use(require('@jotdoc/sub'))
```