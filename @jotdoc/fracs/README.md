
# @jotdoc/fracs  [![npm](https://img.shields.io/npm/v/%40jotdoc%2Ffracs?style=flat-square&logo=npm&label=%20&labelColor=white&color=%23eef)](https://www.npmjs.com/package/@jotdoc/fracs) 

Format simple inline fractions ([markdown-it](https://github.com/markdown-it/markdown-it) plugin)


> ❗⠀This plugin belongs to a family of experimental features called **Jotdoc**: a  "flavor" of Markdown aiming to maximize readability and extend markup for common use cases where verbose HTML is required.
>
> If you're interested, please do [share your thoughts](https://github.com/Acumane/jotdoc/discussions) and check out the [monorepo](https://github.com/Acumane/jotdoc)!

### Demo
Up to 2 digits in the numerator/denominator:
<sub>(`·` = whitespace )</sub>
<table style="width: 100%"><tr><td>

`·1/16·`

</td><td>

<sup>1</sup>⁄<sub>16</sub>

</td></tr></table>

### Enable

```js
const md = require('markdown-it')()

      md.use(require('@jotdoc/fracs'))
```