/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {PgnList} from "../src/PgnList.js"
import {Pgn} from "../src/Pgn.js"

describe('TestPgnList', () => {

    it('should load a pgn list', () => {
        const pgnList = new PgnList()
        pgnList.fetch("./assets/test_pgn_list.pgn").then(() => {
            assert.equal(pgnList.pgns.length, 5)
            for (let i = 0; i < 5; i++) {
                const pgnText = pgnList.pgns[i]
                new Pgn(pgnText)
            }
        })
    })

    it('should split a multi-game PGN string via the constructor (issue #12)', async () => {
        const response = await fetch("./assets/test_pgn_list.pgn")
        const text = await response.text()
        const list = new PgnList(text)
        assert.equal(list.pgns.length, 5)
        // every entry should parse as a valid Pgn
        for (const pgnText of list.pgns) {
            const pgn = new Pgn(pgnText)
            assert.equal(typeof pgn.header.tags.Event, "string")
        }
    })

    it('should parse a multi-game PGN string into Pgn instances', async () => {
        const response = await fetch("./assets/test_pgn_list.pgn")
        const text = await response.text()
        const pgns = PgnList.parse(text)
        assert.equal(pgns.length, 5)
        assert.equal(pgns[4].header.tags.White, "Fischer, Robert J.")
        assert.equal(pgns[4].history.moves.length, 85)
    })

    it('should flush the last game even without a trailing blank line', async () => {
        const response = await fetch("./assets/test_pgn_list.pgn")
        const text = (await response.text()).replace(/\s+$/, "")
        const list = new PgnList(text)
        assert.equal(list.pgns.length, 5)
    })

})
