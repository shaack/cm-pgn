import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Header, TAGS} from "../src/cm-pgn/Header.js"

describe('Header', () => {
    it('should parse header', () => {
        const header = new Header(`[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]`)
        assert.equals(Object.keys(header.tags).length, 7)
        assert.equals(header.tags[TAGS.Event], "F/S Return Match")
    })
    it('should parse and render header', () => {
        const content = `[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]
`
        const header = new Header(content)
        assert.equals(header.render(), content)
    })
})
