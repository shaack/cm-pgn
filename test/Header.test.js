/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Header, TAGS} from "../src/Header.js"

describe('Header', () => {
    it('should parse header', () => {
        const header = new Header(`[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]`)
        assert.equal(Object.keys(header.tags).length, 7)
        assert.equal(header.tags[TAGS.Event], "F/S Return Match")
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
        assert.equal(header.render(), content)
    })
})
