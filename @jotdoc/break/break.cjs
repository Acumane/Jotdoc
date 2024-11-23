"use strict"

module.exports = function break_plugin(md) {
  const hrRule = md.block.ruler.__rules__[md.block.ruler.__find__("hr")].fn

  // Override hr block rule
  md.block.ruler.at("hr", (state, startLine, endLine, silent) => {
    const max = state.eMarks[startLine]

    // Check for indentation (code block)
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    let pos = state.bMarks[startLine] + state.tShift[startLine]

    let lineContent = state.src.slice(pos, max).trim()
    if (lineContent != "***") {
      return hrRule(state, startLine, endLine, silent)
    }

    if (silent) return true

    state.line = startLine + 1

    const token = state.push("html_block", "", 0)
    token.map = [startLine, state.line]
    token.content = '<br style="clear:both"/>'

    return true
  })
}
