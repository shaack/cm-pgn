/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js";
import {Pgn} from "../src/Pgn.js";

describe('PgnWithNullMoves', () => {

    it('should parse a game with null moves and variations', () => {
        const gamePgn = `[Event ""]
[White "4. Petroff Defense"]
[Black ""]
[Site ""]
[Round ""]
[Annotator ""]
[Result "*"]
[Date ""]
[PlyCount "10"]

1. e4 e5 2. Nf3 Nf6 {Petroff defense} 3. -- d6 4. Qe2 Nf6 5. d3 Nf6 *`;

        const pgn = new Pgn(gamePgn);

        // Basic assertions for game header
        assert.equal(pgn.header.tags["Event"], "");
        assert.equal(pgn.header.tags["White"], "4. Petroff Defense");

        // Check moves length
        assert.equal(pgn.history.moves.length, 10);

        // Verify specific null moves
        assert.equal(pgn.history.moves[4].notation, '--');
    });
});
