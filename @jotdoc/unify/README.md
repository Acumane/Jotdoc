
# @jotdoc/unify  [![npm](https://img.shields.io/npm/v/%40jotdoc%2Funify?style=flat-square&logo=npm&label=%20&labelColor=white&color=%23eef)](https://www.npmjs.com/package/@jotdoc/unify) 

Unifies `[]()` to work on text, images, and links! Arguments alone are how elements differentiate
—for the [markdown-it](https://github.com/markdown-it/markdown-it) parser.


> ❗⠀This plugin belongs to a family of experimental features called **Jotdoc**: a  "flavor" of Markdown aiming to maximize readability and extend markup for common use cases where verbose HTML is required.
>
> If you're interested, please do [share your thoughts](https://github.com/Acumane/jotdoc/discussions) and check out the [monorepo](https://github.com/Acumane/jotdoc)!

### Demo

`[]` selects content; `()` are its attributes, like color:


<table><tr><td>

`[Very [cool](blue), wow](red)`

</td><td >

<img src="../../.embed/unify-0.png" width="120px" style="filter:hue-rotate(-10deg)"/>

</td></tr></table>

And links are really just text:

<table><tr><td>

`[It's that easy!](https://scam.net green)`

</td><td >

<img src="../../.embed/unify-1.png" width="120px"/>
</td></tr></table>

Image sizes are attributes, too:
<table style="width: 100%"><tr><td>

`[Something](.embed/idk.png 60px)`

</td><td >
<img src="../../.embed/idk.jpg" width="60px"/>
</td></tr></table>

### Enable

```js
const md = require('markdown-it')()

      md.use(require('@jotdoc/unify'))
```

### Options
Define your own colors or override HTML defaults:
```js
const unify = require('@jotdoc/unify')
md.use(unify))

unify.userColor.push({
  name: 'pale',
  color: '#ddf'
})
```