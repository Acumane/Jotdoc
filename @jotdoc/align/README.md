
# @jotdoc/align  [![npm](https://img.shields.io/npm/v/%40jotdoc%2Falign?style=flat-square&logo=npm&label=%20&labelColor=white&color=%23eef)](https://www.npmjs.com/package/@jotdoc/align) 


Align **any** element (right, left, center, justify). Plugin for the [markdown-it](https://github.com/markdown-it/markdown-it) parser

> ❗⠀This plugin belongs to a family of experimental features called **Jotdoc**: a  "flavor" of Markdown aiming to maximize readability and extend markup for common use cases where verbose HTML is required.
>
> If you're interested, please do [share your thoughts](https://github.com/Acumane/jotdoc/discussions) and check out the [monorepo](https://github.com/Acumane/jotdoc)!

### Demo

For inline content, a single `>` or `<` aligns right or left, respectively.
A `>...<` pair centers:
<table>
<tr>
<td>

	# Title<
	## >Subtitle<
	>Inline

</td><td>

  <h1>Title</h1>
  <h2 align="center">ㅤㅤSubtitleㅤㅤ</h2>
  <p align="right">Inline</p>

</td>
</tr>
</table>

For blocks of content, pairs are necessary:
<table style="width: 42em">
<tr>
<td>

	<Lorem ipsum dolor sit amet, consectetur
	adipiscing elit, sed do eiusmod tempor
	incididunt ut labore et dolore magna
	aliqua.>

</td><td>

<p align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

</td>
</tr>
</table>


### Enable

```js
const md = require('markdown-it')()

      md.use(require('@jotdoc/align'), { /* OPTIONS */ })
```

### Options

Center images and `<h1>` titles by default:
```js
...
const align = require('@jotdoc/align')
md.use(align), {h1Center: false, imgCenter: true})
```