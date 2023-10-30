function isFraction(str) {
    const frac = /^\d{1,2}\/\d{1,2}$/
    return frac.test(str)
}

module.exports = (md) => {
    md.core.ruler.push('fracs', (state) => {

        function processToken(token) {
            if (token.type !== "text") return // only text tokens:

            let parts = token.content.split(' ') // split the token up
            let newTokens = [] // what we're replacing the current token with
            let fracless = [] // text fragments that aren't fractions

            parts.forEach((part, i) => {
                if(isFraction(part)) {
                    if(fracless.length) { // end of fracless fragment; convert to text token
                        let text = new state.Token('text', '', 0)
                        text.content = fracless.join(' ')
                        newTokens.push(text)
                        fracless = [] // reset
                    }
                    let [num, den] = part.split('/')
                    
                    let sup = new state.Token('html_inline', '', 0)
                    sup.content = ` <sup>${num}</sup>⁄`
                    
                    let sub = new state.Token('html_inline', '', 0)
                    sub.content = `<sub>${den}</sub> `
                    
                    newTokens.push(sup, sub)
                }
                else fracless.push(part)
        
                if(i === parts.length - 1 && fracless.length) {
                    let text = new state.Token('text', '', 0)
                    text.content = fracless.join(' ') // trailing fracless text
                    newTokens.push(text)
                }
            })
            return newTokens
        }

        state.tokens.forEach((token, i) => { 
            if (token.type === 'inline') { // for each inline token in the stream:
                let newTokens = []

                // For each token on this line: split if possible, otherwise leave unchanged
                token.children.forEach((t) => {
                    let replacedTokens = processToken(t)
                    newTokens = newTokens.concat(replacedTokens ? replacedTokens : [t])
                })
                state.tokens[i].children = newTokens // replace
            }
        })
    })
}
