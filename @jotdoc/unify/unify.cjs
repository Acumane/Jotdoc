let Color = require("tinycolor2")

"use strict"

let userColor = []

const WIDTH = /^\d+(?:px|%)?$/i,
      DIM = /^\d+x\d+(?:px)?$/i

const STYLES = `<style>
img { vertical-align:middle; max-width:100%; }
.img-container { display:inline-flex; flex-direction:column; }
.img-caption { min-width:100%; width:0; text-align:center; }
</style>`

function classify(path) {
  try {
    Boolean(new URL(path))
    return "link"
  } catch (e) {
    const match = userColor.find(c => c.name === path)
    if (match) return "ucolor"
    if (Color(path).isValid()) return "color"
    return "image"
  }
}

module.exports = md => {
  md.core.ruler.push("img_style", state => { // insert @ start of doc
    if (state.tokens.length && state.tokens[0].type === "paragraph_open") {
      let token = new state.Token("html_block", "", 0)
      token.content = STYLES
      state.tokens.unshift(token)
    }
  })

  md.inline.ruler.disable(["image", "link"]) // replace with:
  md.inline.ruler.push("unify", (state, silent) => {

    let attrs, attr,
        args, path = '',
        content, cEnd, type, token, pos,
        uColor, color,
        start = state.pos,
        max = state.posMax

    if (state.src.charCodeAt(state.pos) !== 0x5b /* [ */) return false
    if ((cEnd = state.md.helpers.parseLinkLabel(state, state.pos, false)) < 0) return false
    content = state.src.slice(start + 1, cEnd)

    pos = cEnd + 1
    if (pos < max && state.src.charCodeAt(pos) === 0x28) {
      while (pos < max && state.src.charCodeAt(pos) !== 41) pos++
      if (pos >= max) return false

      args = state.src.slice(cEnd + 2, pos)
      if (args) [path, attr] = args.split(" ")

      let parsed = state.md.helpers.parseLinkDestination(path, 0, path.length)
      if (parsed.ok) {
        path = state.md.normalizeLink(parsed.str)
        if (!state.md.validateLink(path)) path = ""
      }
      type = classify(path)
    }

    if (!silent) {
      switch (type) {
        case "link":
          state.pos = start + 1
          state.posMax = cEnd
          token = state.push("link_open", "a", 1)
          token.attrs = attrs = [["href", path]]
          state.linkLevel++
          state.md.inline.tokenize(state) // parse nested content
          state.linkLevel--
          token = state.push("link_close", "a", -1)
          uColor = userColor.find(c => c.name === attr)
          color = uColor ? uColor.color : Color(attr).isValid() ? attr : false
          if (color) attrs.push(["style", `color:${color}`])
          break

        case "image":
          if (content.trim()) {
            token = state.push("html_inline", "", 0)
            // nested <span> keeps adjacent content vertically centered w/ img:
            token.content = '<span class="img-container"><span>'
          }

          token = state.push("image", "img", 0)
          token.attrs = [["src", path], ["alt", ""]]
          token.children = []
          if (WIDTH.test(attr)) token.attrs.push(["width", attr])
          if (DIM.test(attr)) {
            token.attrs.push(["width", attr.split("x")[0]], ["height", attr.split("x")[1]])
          }

          if (content.trim()) {
            token = state.push("html_inline", "", 0)
            token.content = '</span><span class="img-caption">'

            let { src, pos, posMax } = state
            Object.assign(state, { src: content, pos: 0, posMax: content.length })
            state.md.inline.tokenize(state) // parse nested content
            Object.assign(state, { src, pos, posMax })

            token = state.push("html_inline", "", 0)
            token.content = "</span></span>"
          }
          break

        case "ucolor":
        case "color":
          state.pos = start + 1
          state.posMax = cEnd
          color = type === "ucolor" ? userColor.find(c => c.name === path).color : path
          token = state.push("span_open", "span", 1)
          token.attrs = [["style", `color:${color}`]]
          state.md.inline.tokenize(state) // parse nested content
          token = state.push("span_close", "span", -1)
          break
      }
    }

    state.pos = pos + 1
    return true
  })
}

module.exports.userColor = userColor
