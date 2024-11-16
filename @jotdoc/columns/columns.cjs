"use strict"

module.exports = function columns_plugin(md) {
  md.block.ruler.disable(["lheading"])

  md.block.ruler.before("blockquote", "columns", (state, startLine, endLine) => {
    // Initial check for opening marker
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    if (state.src.slice(pos, state.eMarks[startLine]).trim() != "===") return false
    if (state.sCount[startLine] - state.blkIndent >= 4) return false

    // Find closing delim, collect lines
    let lines = []
    let nextLine = startLine + 1

    while (nextLine < endLine) {
      let line = state.src.slice(
        state.bMarks[nextLine] + state.tShift[nextLine],
        state.eMarks[nextLine]
      )

      if (line.trim() == "===") break
      lines.push(line)
      nextLine++
    }

    if (nextLine >= endLine) return false // No closing delim found

    // Split into cols, cleanup
    let cols = [[]]
    lines.forEach(line => {
      if (line.startsWith("|")) {
        cols.push([])
        line = line.slice(1)
      }
      if (line.trim()) cols[cols.length - 1].push(line.trim())
    })

    let token = state.push("table_open", "table", 1)
    token.attrs = [["style", "width: 100%"]]

    token = state.push("tr_open", "tr", 1)
    token.attrs = [["style", "border: none"]]

    cols.forEach((col, i) => {
      let style = "border: none" + (i < cols.length - 1 ? "; border-right: solid 1px #ccc" : "")
      token = state.push("td_open", "td", 1)
      token.attrs = [["style", style]]

      col.forEach((line, j) => {
        if (j > 0) state.push("br", "br", 0)
        token = state.push("inline", "", 0)
        token.content = line
        token.children = []
      })

      state.push("td_close", "td", -1)
    })

    state.push("tr_close", "tr", -1)
    state.push("table_close", "table", -1)

    state.line = nextLine + 1
    return true
  })
}
