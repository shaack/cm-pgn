/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {PgnList} from "../src/PgnList.js"
import {Pgn} from "../src/Pgn.js"

describe('PgnList', () => {

    it('should load a pgn list', () => {
        const pgnList = new PgnList()
        pgnList.fetch("./assets/test_pgn_list.pgn").then(() => {
            assert.equal(pgnList.pgns.length, 5)
            for (let i = 0; i < 5; i++) {
                const pgnText = pgnList.pgns[i]
                // console.log(pgnText)
                new Pgn(pgnText)
            }
        })
    })

})
