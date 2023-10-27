<div align="center"> 

# 📜 **Jotdoc**

<center>A more capable, legible Markdown</center>

## Motivation

Markdown intends to make ease of **reading, writing, and editing prose**. Its key design goal was **readability**—that the language be readable as-is, **unencumbered by tags or formatting instructions**

<p>
HTML in Markdown deteriorates readability, yet a striking number of common use cases require it :thinking:
</p>

</div>
	
# Features
> :warning: A collection of ideas circa '23—subject to drastic change, k?

## Basic
If you want spaces in your terms, use parenthesis
(`·` represents whitespace for visibility)

**Super/subscript:**
| `x_i·`       | x<sub>i</sub>     |
| :----------: | :---------------: |
| `x^n+m·`     | x<sup>n+m</sup>   |
| `x_(n·-·1)`  | x<sub>n -  1</sub>|

**Simple fractions:**
| `·1/2·`          | <sup>1</sup>⁄<sub>2</sub>                    |
| :--------------: | :------------------------------------------: |
| `·N/A·`          | N/A                                          |

**Inline comments:**

`% this` is > than `<!-- this shit -->`

**Replacements:**   
Compatible with the built-in typographer feature

|  `...`  |  …  |
| :-----: | :-: |
|  `--`   |  —  |
|  `->`   |  →  |

> ⚙️ Specify your own replacement rules

## Universal markup
`[]()` works on text, images, and links! Arguments alone are how elements differentiate


**Colors:**

	[This is red text](red)

> ⚙️ Pass your own color names to options object

**Links are really just text:**

	[It's that easy!](scam.net green)

**Image sizes:**
<table style="width: 100%"><tr><td>

`[Something](.embed/idk.png 100px)`

</td><td > <!-- 2 -->
<img src=".embed/idk.jpg" width="100px"/>
</td></tr></table>

> ⚙️ Image titles may be displayed as \<figcaptions>   
> 💭 `""` and `''` as substitutes for `[]`?   
>⠀⠀Can't "link" to image paths. Does anyone care?

## Tables

Tables can be made exclusively with tabs ( `→` ):
- `:` denotes a title; default justification is left
- Justification is inherited, but each line may specify its own

<table style="width: 100%">

<tr>
<td>

	>Count:	→	Types:
	1   →   →   List
	2<  →   →   Image
	3   →   →   Text

</td><td > <!-- 2 -->

| Count | Types |
| ----: | :---- |
| 1     | List  |
| 2⠀⠀⠀  | Image |
| 3     | Text  |

</td>
</tr>
</table>

## Wrap break (`___`)
<!-- <br style="clear:both"/> -->
When writing a paragraph to the side of a floated image, use `___` on a new line to begin your next paragraph right below it.

Use alone to prevent anything from wrapping into the space beside the image

## Alignments
Align **any** element (images, blocks, titles, etc...)  
Save for images, `<h1>` titles, & inheritance, elements are left-justified by default

<table style="width: 100%">
<tr>
<td>

	# Title<
	## >Subtitle<
	>Inline

	>Lorem ipsum dolor sit amet, consectetur adipiscing
	elit, sed do eiusmod tempor incididunt ut labore
	et dolore magna aliqua.<

</td><td>

  <h1>Title</h1>
  <h2 align="center">ㅤSubtitleㅤ</h2>
  <p align="right">Inline</p>

<p align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

</td>
</tr>
</table>

> 💭 For inline left/right align: closing delimiter optional?   
>⠀⠀Blocks: `>>>` on a new line?

## Columns
Within a column block (`|||`):  
Break and begin at the top of new column with `^^^` 

<table style="width: 100%">
<tr>
<td>

```
|||
This is the first column
:point_up:
^^^
Here's column #2
:v:
^^^
And here's the third
:vulcan_salute:
|||

Now we're back to prose again
```
  
</td><td > <!-- 1 -->

<table style="width: 100%">
<tr>
<td>

This is the first column

:point_up:

</td><td > <!-- 2 -->

Here's column #2

:v:

</td><td > <!-- 3 -->

And here's the third

:vulcan_salute:

</td>
</tr>
</table>

Now we're back to prose again

</td>
</tr>
</table>
