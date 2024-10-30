'use strict'

module.exports = function align_plugin(md) {
  const RE_OPEN = /^(>|<)(?![\s<]*$)/
  const RE_CLOSE = /(?<=[^>\r\n])(>|<)$/

  md.block.ruler.before('blockquote', 'align', (state, startLine, lastLine) => {
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
      if (line.trim() == '') return false
      if (RE_CLOSE.test(line)) foundClosing = true
      content.push(line)
    }

    if (!foundClosing) return false // No closing tag found
    let closeTag = content[content.length - 1].match(RE_CLOSE)
    if (!closeTag) return false
    if (openTag[1] == '<' && closeTag[1] == '>') return false

    content[content.length - 1] = content[content.length - 1].slice(0, -1)

    let align = openTag[1] == closeTag[1] ? 
                (openTag[1] == '>' ? 'right' : 'left') : 'center'

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

    state.line  = curLine + 1 // Move state beyond content
    return true
  })

  md.core.ruler.push('title_align', (state) => {
    state.tokens.forEach((token, index) => {
      if (token.type == 'heading_open') {
        let title = state.tokens[index + 1]
        if (title?.type !== 'inline') return false
        
        let openTag = title.content.match(RE_OPEN),
            closeTag = title.content.match(RE_CLOSE)

        if (!openTag && !closeTag) return false
        if (openTag[1] == '<' && closeTag[1] == '>') return false

        title.content = title.content.replace(RE_OPEN, '')
                                   .replace(RE_CLOSE, '').trim()

        let align = openTag[1] == closeTag[1] ? 
                   (openTag[1] == '>' ? 'right' : 'left') : 'center'

        token.attrs = token.attrs || []
        token.attrs.push(['style', `text-align: ${align}`])

        let t = title.children, t0 = t[0], tEnd = t[t.length-1]
        t0.content = t0.content.replace(/^(>|<)/, '')
        tEnd.content = tEnd.content.replace(/(>|<)$/, '')
      }
    })
  })
}
