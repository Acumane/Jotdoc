"use strict"

module.exports = function columns_plugin(md) {
  md.block.ruler.disable(["lheading"])

  md.block.ruler.before("paragraph", "columns", (state, startLine, endLine) => {
    // Check for opening delimiter
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    let isDelim = state.src.slice(pos, max).trim() == "==="
    let startContent = startLine

    if (!isDelim && startLine + 1 < endLine) {
      let nextPos = state.bMarks[startLine + 1], nextMax = state.eMarks[startLine + 1]
      if (state.src.slice(nextPos, nextMax).trim() == "===") {
        isDelim = true
        startContent = startLine
        startLine++
      }
    }

    if (!isDelim) return false

    // Find closing delimiter, collect content
    let nextLine = startLine + 1
    let content = []

    while (nextLine < endLine) {
      pos = state.bMarks[nextLine]; max = state.eMarks[nextLine]
      let line = state.src.slice(pos, max)
      if (line.trim() == "===") break
      content.push(line)
      nextLine++
    }

    if (nextLine >= endLine) return false

    // Parse pre-content (if exists)
    if (startContent < startLine) {
      let preContent = state.src.slice(state.bMarks[startContent], state.eMarks[startContent])
      if (preContent.trim()) {
        state.push("paragraph_open", "p", 1)
        let token = state.push("inline", "", 0)
        token.content = preContent
        token.children = []
        state.push("paragraph_close", "p", -1)
      }
    }

    // Split & parse columns
    let cols = [[]]
    content.forEach(line => {
      if (line.startsWith("|")) cols.push([])
      cols[cols.length - 1].push(line.replace(/^\|/, ""))
    })

    // Create table structure
    let table = state.push("table_open", "table", 1)
    table.attrs = [["style", "width: 100%"]]

    let tr = state.push("tr_open", "tr", 1)
    tr.attrs = [["style", "border: none"]]

    // Process columns
    cols
      .filter(col => col.length)
      .forEach((col, i) => {
        let td = state.push("td_open", "td", 1)
        td.attrs = [
          [
            "style",
            `border: none; vertical-align: top${
              i < cols.length - 1 ? "; border-right: solid 1px #ccc" : ""
            }`
          ]
        ]

        // Parse column content
        state.md.block.parse(col.join("\n"), state.md, state.env, state.tokens)

        state.push("td_close", "td", -1)
      })

    state.push("tr_close", "tr", -1)
    state.push("table_close", "table", -1)

    state.line = nextLine + 1
    return true
  })
}
