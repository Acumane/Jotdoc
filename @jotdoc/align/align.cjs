'use strict'

module.exports = function align_plugin(md) {
  //                    after:      name:    function:
  md.inline.ruler.after('emphasis', 'align', (state, silent) => {
    let content,
        token,
        center = false,
        max = state.posMax, // string length
        start = state.pos,
        first = state.src.charCodeAt(start)

    if (first !== 62) return false // >
    if (silent) return false 
    // not silent (validated), continue:

    state.pos = start + 1

    while (state.pos < max) { // find closing '>' or '<'
      let cur = state.src.charCodeAt(state.pos)
      console.log(cur)
      if (cur === 62) { break }
      if (cur === 60) { center = true; break }

      state.pos++
    }

    // no content
    if (start + 1 === state.pos ) { 
      state.pos = start
      return false
    }

    // found!
    content = state.src.slice(start + 1, state.pos)

    // set scope to content
    state.posMax = state.pos
    state.pos = start + 1

    token           = state.push('div_open', 'div', 1)
    if (center)
      token.attrs   = [["style", "text-align: center"]]
    else
      token.attrs   = [["style", "text-align: right"]]
    token.markup    = '>'

    token           = state.push('text', '', 0)
    token.content   = content

    token           = state.push('div_close', 'div', -1)
    if (center)
      token.markup  = '<'
    else
      token.markup  = '>'

    // set scope to everything past content
    state.pos = state.posMax + 1
    state.posMax = max
    return true
  })
}
