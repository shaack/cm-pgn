import {Header, tags} from "../src/cm-pgn/Header.js"
import {Assert} from "../lib/cm-web-modules/assert/Assert.js"

describe('Header', () => {
    it('should parse header', () => {
        const header = new Header(`[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]`)
        Assert.equals(header.tags.size, 7)
        Assert.equals(header.tags.get(tags.Event), "F/S Return Match")
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
        Assert.equals(header.render(), content)
    })
})
