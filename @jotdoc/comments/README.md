# @jotdoc/comments  [![npm](https://img.shields.io/npm/v/%40jotdoc%2Fcomments?style=flat-square&logo=npm&label=%20&labelColor=white&color=%23eef)](https://www.npmjs.com/package/@jotdoc/comments) 


Block comments for the [markdown-it](https://github.com/markdown-it/markdown-it) parser


> ❗⠀This plugin belongs to a family of experimental features called **Jotdoc**: a  "flavor" of Markdown aiming to maximize readability and extend markup for common use cases where verbose HTML is required.
>
> If you're interested, please do [share your thoughts](https://github.com/Acumane/jotdoc/discussions) and check out the [monorepo](https://github.com/Acumane/jotdoc)!

### Demo

Like blockquotes, comments open with a single `%` and close on empty newlines:
<sub>(`↴` = return )</sub>

<table style="width: 100%"><tr><td>

```h
% I am a comment↴
  Until I find an empty line,↴
  I will go on↴
  and on↴
↴
```

</td></tr></table>

\> than `<!-- this shit -->`

### Enable

```js
const md = require('markdown-it')()

      md.use(require('@jotdoc/comments'))
```