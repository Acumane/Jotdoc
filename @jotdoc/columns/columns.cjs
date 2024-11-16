"use strict"

module.exports = function columns_plugin(md) {
  md.block.ruler.disable(["lheading"])

  md.block.ruler.before("paragraph", "columns", (state, startLine, endLine) => {
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // Look for === on this line or next
    let curLine = state.src.slice(pos, max).trim()
    let isDelim = curLine === "==="
    let startDelimLine = startLine

    if (!isDelim && startLine + 1 < endLine) {
      let nextPos = state.bMarks[startLine + 1] + state.tShift[startLine + 1]
      let nextMax = state.eMarks[startLine + 1]
      if (state.src.slice(nextPos, nextMax).trim() === "===") {
        isDelim = true
        startDelimLine = startLine + 1
      }
    }

    if (!isDelim) return false

    // Find closing delim, collect lines
    let lines = []
    let nextLine = startDelimLine + 1
    let found = false

    while (nextLine < endLine) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]
      let line = state.src.slice(pos, max)

      if (line.trim() == "===") {
        found = true; break
      }
      lines.push(line)
      nextLine++
    }

    if (!found) return false

    // Handle pre-content if exists
    if (startDelimLine > startLine) {
      let preContent = state.src.slice(
        state.bMarks[startLine] + state.tShift[startLine],
        state.eMarks[startLine]
      )
      if (preContent.trim()) {
        let token = state.push("paragraph_open", "p", 1)
        token = state.push("inline", "", 0)
        token.content = preContent
        token.children = []
        state.push("paragraph_close", "p", -1)
      }
    }

    // Parse cols
    let cols = [[]]
    lines.forEach(line => {
      if (line.startsWith("|")) {
        cols.push([])
        line = line.slice(1)
      }
      if (line.trim()) cols[cols.length - 1].push(line.trim())
    })

    cols = cols.filter(col => col.length > 0)

    // Create table
    let token = state.push("table_open", "table", 1)
    token.attrs = [["style", "width: 100%"]]

    token = state.push("tr_open", "tr", 1)
    token.attrs = [["style", "border: none"]]

    cols.forEach((col, i) => {
      token = state.push("td_open", "td", 1)
      token.attrs = [
        ["style", "border: none" + (i < cols.length - 1 ? "; border-right: solid 1px #ccc" : "")]
      ]

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
