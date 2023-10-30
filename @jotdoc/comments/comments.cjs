let RE = /^\% .*/   // lines starting with '% '

module.exports = (md) => {
  md.core.ruler.push('comments', (state) => {
    for (let block of state.tokens) {
      if (block.type !== 'inline') continue
      let inline = block.children
      for (let token in inline) {
        if (inline[token].type === 'text' && RE.test(inline[token].content)) {
            inline[token] = new state.Token('html_inline', '', 0) // replace child with comment token:
            inline[token].content = '<p style="display:none">' + inline[token].content
        }
      }
    }
  })
}