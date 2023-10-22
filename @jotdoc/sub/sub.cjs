'use strict'

module.exports = function sub_plugin(md) {
  //                     before:     name:  function:
  md.inline.ruler.before('emphasis', 'sub', (state, silent) => {
    let found,
        content,
        token,
        surround = false,
        max = state.posMax, // string length
        start = state.pos

    if (state.src.charCodeAt(start) !== 95) return false // ^
    if (state.src.charCodeAt(start+1) === 40) surround = true // ^(
    // Found '^' or '^(', continue:
    let open = surround ? 2 : 1
    if (silent) return false 
    // not silent (validated), continue:
    if (start + 2 + (surround ? 1 : 0) >= max) return false
    // String is long enough, continue...

    state.pos = start + open

    while (state.pos < max) { // find closing ' ' or ')'
      let cur = state.src.charCodeAt(state.pos)
      if (!surround && cur === 32) { found = true; break }
      if (surround && cur === 41) { found = true; break }

      state.pos++
    }

    // !found or no content
    if (!found || start + open === state.pos ) { 
      state.pos = start
      return false
    }

    // found!
    content = state.src.slice(start + open, state.pos)

    // set scope to content
    state.posMax = state.pos
    state.pos = start + open

    token         = state.push('sub_open', 'sub', 1)
    token.markup  = '_'

    token         = state.push('text', '', 0)
    token.content = content

    token         = state.push('sub_close', 'sub', -1)
    if (surround)   token.markup  = ')'
    if (!surround)  {
    token         = state.push('text', '', 0)
    token.content = ' '
    }

    // set scope to everything past content
    state.pos = state.posMax + 1
    state.posMax = max
    return true
  })
}
