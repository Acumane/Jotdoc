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
> :warning: A collection of ideas cira early '23—subject to drastic change, k?

## Math
Delimited by whitespace ( `·` for visibility)  
If you want spaces in your terms, delimit w/ parenthesis

### Exponents
| Syntax       | Preview           |
| :----------- | :---------------- |
| `x_i·`       | x<sub>i</sub>     |
| `x^n+m·`     | x<sup>n+m</sup>   |
| `x_(n·-·1)`  | x<sub>n -  1</sub>|

### Simple fractions
Numbers are formatted by default—no whitespace necessary
| Syntax          | Preview                                       |
| :--------------- | :------------------------------------------- |
| `·N/A·`          | N/A                                          |
| `·1/2·`          | <sup>1</sup>⁄<sub>2</sub>                    |
| `·10·m·/·s·`     | 10<sup>m</sup>⁄<sub>s</sub>                  |
| `(a·+·b^2)/(2b·/·3)` | <sup>a + b<sup>2</sup> </sup>⁄<sub> <sup>2b</sup>⁄<sub>3</sub></sub> |

💭 Use `%` instead?  
Pragmatically, these needn't chain more than once; anything more complex is LaTeX territory.

## Text markup `()`
Use parenthesis to style anything in quotes  
Pre- or postpend, doesn't matter. Argument order is also agnostic

Colors:

	(green)"This is green text" 
	'—and this is red. Neat!'(r) 

Links are also text:

	"It's that easy"(center cyan scam.net)

## Image markup `[]`
Titles are optional:  
💭 Image title: display as alt, title, figcaption? 

	[.embed/idk.png 200px right]

Common styles like `style="filter: invert(1);"` have their own arguments

	'Figure #'[./fig#.png 400px invert grayscale]

💭 Alternative to quotes on newlines:

	Behold, cat: [../cat.png 60%]
	
Use text markup `()` for clickable images

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

## Justification
Justify **any** element (images, blocks, titles, etc...)  
Save for images, `<h1>` titles, & inheritance, elements are left-justified by default

<table style="width: 100%">
<tr>
<td>

	# Title<
	## >Subtitle<
	>Text
</td><td>

  <h1>Title</h1>
  <h2 align="center">ㅤSubtitleㅤ</h2>
  <p align="right">Text</p>

</td>
</tr>
</table>

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

## Misc

- `-- Section --`: a small title centered within a horizontal divider
- 💭 `% comments`, `// comments`, or `{comments}` are > than `<!-- this shit -->`
- Single tilde strikethrough: `~strike~` to ~~strike~~
