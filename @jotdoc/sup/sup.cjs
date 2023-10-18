'use strict'

module.exports = function sup_plugin(md) {
  //                     before:     name:  function:
  md.inline.ruler.before('emphasis', 'sup', (state, silent) => {
    let found,
        content,
        token,
        max = state.posMax, // string length
        start = state.pos

    if (state.src.charCodeAt(start) !== 0x5E /* ^[ */) return false
    // Found '^', continue:
    if (silent) return false 
    // not silent (validated), continue:
    if (start + 2 >= max) return false
    // String is long enough, continue...

    state.pos = start + 1

    while (state.pos < max) { // find closing ' '
      if (state.src.charCodeAt(state.pos) === 0x20) {
        found = true; break
      }

      state.pos++
      // state.md.inline.skipToken(state)
    }

    if (!found || start + 1 === state.pos /*^ */) {
      state.pos = start
      return false
    }

    // found!
    content = state.src.slice(start + 1, state.pos)

    // set scope to content
    state.posMax = state.pos
    state.pos = start + 1

    token         = state.push('sup_open', 'sup', 1)
    token.markup  = '^'

    token         = state.push('text', '', 0)
    token.content = content

    token         = state.push('sup_close', 'sup', -1)
    token.markup  = ''

    // set scope to everything past content
    state.pos = state.posMax + 1
    state.posMax = max
    return true
  })
}
