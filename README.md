<div align="center"> 
<h1><img src=".embed/jd-.png" width="125px"/><br>Jotdoc</h1>

A more capable, legible Markdown   
[Plans](PLANS.md)⠀|⠀[Discussions](https://github.com/Acumane/jotdoc/discussions)⠀|⠀[Extension]()⠀|⠀[Downloads](https://www.npmjs.com/org/jotdoc)

</div>

## 💭 Motivation

Markdown intends to make ease of **reading, writing, and editing prose**. Its key design goal was **readability**—that the language be readable as-is, **unencumbered by tags or formatting instructions**

<p>
HTML in Markdown deteriorates readability, yet a striking number of common use cases require it 🤔
</p>

## ✨ Features

![](.embed/demo.gif)

<table><tr><td>

- [**unify**](@jotdoc/unify/)⠀⠀⠀ ⠀⠀ ⠀⠀⠀Unifies `[]()` to work on text (colorize), images, and links
- [**align**](@jotdoc/align)⠀⠀⠀⠀⠀⠀⠀⠀⠀Inline and block alignment (left, center, right)
- [**fracs**](@jotdoc/fracs)⠀⠀⠀⠀⠀⠀⠀⠀⠀Format simple fractions
- [**sub**](@jotdoc/sub), [**sup**](@jotdoc/sup)⠀⠀ ⠀⠀⠀ ⠀(sub/super)script
- [**comments**](@jotdoc/comments)⠀⠀ ⠀⠀⠀Block comments
- [**replace**](@jotdoc/replace)⠀⠀⠀⠀ ⠀⠀⠀Inline pattern substitutions
</td></tr></table>

⠀—and more are on the way! See [PLANS](PLANS.md) for what's to come (still workshopping)
### Support
<table><tr><td>

- [**vscode**](support/vscode)
  Extension imports Jotdoc plugins, contributes styles and syntax grammars, ㅤ
  and exposes plugin options in settings
</td></tr></table>


## 🔧 Setup
This monorepo contains all Jotdoc plugins, documentation, and supporting extensions. It uses [pnpm workspaces](https://pnpm.io/workspaces)
