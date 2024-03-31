'use strict'

module.exports = function align_plugin(md) {
  md.block.ruler.before('blockquote', 'align', (state, startLine, lastLine) => {
    const RE_OPEN = /^>(?![\s<]*$)/
    const RE_CLOSE = /(?<=[^>\r\n])(>|<)$/

    let pos = state.bMarks[startLine] + state.tShift[startLine],
    max = state.eMarks[startLine]

    if (state.sCount[startLine] - state.blkIndent >= 4) return false
    // if (state.src.charCodeAt(pos) !== 62 /* > */) return false
    let line = state.src.slice(pos, max)
    if (!RE_OPEN.test(line)) return false

    let curLine = startLine,
    content = [line.slice(1)], // Remove opening tag
    foundClosing = RE_CLOSE.test(line)
    
    while (!foundClosing && curLine < lastLine - 1) {
      curLine++
      pos = state.bMarks[curLine] + state.tShift[curLine]
      max = state.eMarks[curLine]
      line = state.src.slice(pos, max)
      if (line.trim() == '') return false
      if (RE_CLOSE.test(line)) foundClosing = true
      content.push(line)
    }
    
    if (!foundClosing) return false // No closing tag found
    let closeTag = content[content.length - 1].slice(-1)
    content[content.length - 1] = content[content.length - 1].slice(0, -1)

    let align = closeTag == '>' ? 'right' : 'center'

    let token   = state.push(`${align}_open`, 'p', 1)
    token.attrs = [["style", `text-align: ${align}`]]
    token.block = true

    content.forEach((line, index) => {
      token          = state.push('inline', '', 0)
      token.content  = line
      token.map      = [startLine + index, startLine + index + 1]
      token.children = []
      token = state.push('newline', 'br', 0)
    })

    token       = state.push(`${align}_close`, 'p', -1)
    token.block = true

    state.line  = curLine + 1 // Move state beyond this content

    return true
  })
}
