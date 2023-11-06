# Plans ([discuss](https://github.com/Acumane/jotdoc/discussions))
> ⚠️ subject to change, k?

<sup>(💡 = new feature idea)</sup>
### Unify

- [x] see [README](@jotdoc/unify/README.md)


> 💭
> - Image titles may be displayed as \<figcaptions>   
> - `""` and `''` as optional substitutes for `[]`?
> - Can't "link" to image paths. Does anyone care?

---

### 💡 Multiline columns & tables

Alignment is inherited, but each line may specify its own

Headers are optional, as are additional rows; the following is recognized as just columns and styled accordingly:

<table style="width: 100%">
<tr>
<td>

```
===
| This is the first column
:point_up:
| Here's column #2
:v:
| And here's the third
:vulcan_salute:
===

Now we're back to prose again
```
  
</td><td>

<table style="width: 100%">
<tr style="border: none;">
<td style="border: none; border-right: solid 1px #ccc">

This is the first column

:point_up:

</td><td style="border: none; border-right: solid 1px #ccc">

Here's column #2

:v:

</td><td style="border: none;">

And here's the third

:vulcan_salute:

</td>
</tr>
</table>

Now we're back to prose again

</td>
</tr>
</table>

> 💭
> - Considering `|:`, `|_`, or `#·` for header definition
> - `=`* or `-`* under text no longer makes them headers. Good riddance(?)


---

### Alignments

- [x] see [README](@jotdoc/align/README.md)


> 💭
> - Opening `>` conflict with blockquotes; require it use trailing space `>·`
> - For inline left/right align: closing delimiter optional?   
> - is `>Text|` more readable?
> - Justify (`<...>`): interference with HTML tags?

---

### 💡 Wrap break (`___`)
<!-- <br style="clear:both"/> -->
When writing a paragraph to the side of a floated image, use `___` on a new line to begin your next paragraph right below it.

Use alone to prevent anything from wrapping into the space beside the image

> 💭
> - or `^^^`