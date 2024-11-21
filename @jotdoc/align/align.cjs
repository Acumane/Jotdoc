"use strict"

module.exports = function align_plugin(md) {
  const RE_OPEN = /^(>|<)(?![\s<]*$)/
  const RE_CLOSE = /(?<=[^>\r\n])(>|<)$/

  md.block.ruler.before("blockquote", "align", (state, startLine, lastLine) => {
    let pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine]

    if (state.sCount[startLine] - state.blkIndent >= 4) return false
    let line = state.src.slice(pos, max)
    let openTag = line.match(RE_OPEN)
    if (!openTag) return false

    let curLine = startLine,
        content = [line.slice(1)], // Remove opening tag
        foundClosing = RE_CLOSE.test(line)

    while (!foundClosing && curLine < lastLine - 1) {
      curLine++
      pos = state.bMarks[curLine] + state.tShift[curLine]
      max = state.eMarks[curLine]
      line = state.src.slice(pos, max)
      if (line.trim() == "") return false
      if (RE_CLOSE.test(line)) foundClosing = true
      content.push(line)
    }

    if (!foundClosing) return false // No closing tag found
    let closeTag = content[content.length - 1].match(RE_CLOSE)
    if (!closeTag) return false
    if (openTag[1] == "<" && closeTag[1] == ">") return false

    content[content.length - 1] = content[content.length - 1].slice(0, -1)
    let align = openTag[1] == closeTag[1] ? 
                (openTag[1] == ">" ? "right" : "left") : "center"

    let wrapper = state.push("div_open", "div", 1)
    wrapper.attrs = [["style", "position: relative; margin: 1em 0"]]

    let container = state.push("div_open", "div", 1)
    container.attrs = [
      ["style", align === "center" ? "text-align: center" : `float: ${align}; margin: 0 1em 0.5em`]
    ]

    content.forEach((line, index) => {
      let token = state.push("inline", "", 0)
      token.content = line
      token.map = [startLine + index, startLine + index + 1]
      token.children = []
    })
    state.push("div_close", "div", -1)

    // Add following lines until empty line:
    for (let nextLine = curLine + 1; nextLine < lastLine; nextLine++) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]
      line = state.src.slice(pos, max)
      if (!line.trim()) break
      let token = state.push("inline", "", 0)
      token.content = line
      token.children = []
      curLine = nextLine
    }

    state.push("div_close", "div", -1)
    state.line = curLine + 1
    return true
  })

  md.core.ruler.push("title_align", state => {
    state.tokens.forEach((token, index) => {
      if (token.type == "heading_open") {
        let title = state.tokens[index + 1]
        if (title?.type !== "inline") return false

        let openTag = title.content.match(RE_OPEN),
          closeTag = title.content.match(RE_CLOSE)

        if (!openTag && !closeTag) return false
        if (openTag[1] == "<" && closeTag[1] == ">") return false

        title.content = title.content.replace(RE_OPEN, "").replace(RE_CLOSE, "").trim()

        let align = openTag[1] == closeTag[1] ? 
                   (openTag[1] == ">" ? "right" : "left") : "center"

        token.attrs = token.attrs || []
        token.attrs.push(["style", `text-align: ${align}`])

        let t = title.children,
          t0 = t[0],
          tEnd = t[t.length - 1]
        t0.content = t0.content.replace(/^(>|<)/, "")
        tEnd.content = tEnd.content.replace(/(>|<)$/, "")
      }
    })
  })
}
