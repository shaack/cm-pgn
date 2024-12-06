/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js";
import {History} from "../src/History.js"
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

1. e4 e5 2. Nf3 Nf6 {Petroff defense} 3. -- d6 4. Qe2 Nc6 5. d3 Nb8 *`;

        const pgn = new Pgn(gamePgn);

        console.log('header', pgn.header);
        console.log('history', pgn.history);

        // Basic assertions for game header
        assert.equal(pgn.header.tags["White"], "4. Petroff Defense");

        // Check moves length
        assert.equal(pgn.history.moves.length, 10);

        // Verify specific null moves
        assert.equal(pgn.history.moves[4].san, '--');
    });

    it('should parse a more complex game with null moves and variations', () => {
        const complexGamePgn = `[Event ""]
[White "4. Petroff Defense"]
[Black ""]
[Site ""]
[Round ""]
[Annotator ""]
[Result "*"]
[Date ""]
[PlyCount "13"]

1. e4 e5 2. Nf3 Nf6 {Petroff defense} 3. Nxe5 d6 (3... Nxe4 $2 {A bad move by black} 4. Qe2 {[%cal Re2e8]pinning the knight to king} Nf6 (4... Nc5 5. Nc6+ )(4... d5 5. d3 Nf6 (5... Qe7 6. dxe4 Qxe5 7. exd5 Qxe2+ 8. Bxe2 )6. Nc6+ )(4... Qe7 5. Qxe4 d6 6. d4 dxe5 7. dxe5 )5. Nc6+ )4. Nxf7 {romantic continuation} Kxf7 5. d4 $1 $40 Nxe4 (5... -- 6. Nc3 {if black doesn't take on e4} -- 7. f4 -- 8. Bd3 -- 9. O-O -- 10. e5 {[%csl Rf7]} )6. Qh5+ {How do we win the piece after Black's possible moves?} g6 (6... Kg8 7. Qd5+ Be6 8. Qxe6# )(6... Ke7 7. Qe2 {[%cal Re2e7,Rc1g5,Rg5d8]} d5 8. Bg5+ {[%cal Rg5d8,Re2e7]} )(6... Kf6 7. Qh4+ {[%cal Rh4d8,Rh4e4]} g5 8. Qxe4 )(6... Ke6 7. Bc4+ Ke7 (7... Kd7 8. Qf5+ Ke7 (8... Ke8 9. Qf7# )(8... Kc6 9. Qb5# )9. Qf7# )(7... d5 {best move for black} 8. Qe5+ Kf7 (8... Kd7 9. Bxd5 {[%csl Ge6][%cal Rd5e4,Gd5e6,Re5e6]attacks knight and allows mate from e6} Qe7 10. Qxe7+ Bxe7 11. Bxe4 )9. Bxd5+ {[%cal Rd5f7,Rd5e4]} )8. Qf7# )7. Qd5+ {[%cal Rd5e4,Rd5f7]} *`;

        const complexPgn = new Pgn(complexGamePgn);

        console.log('header', complexPgn.header);
        console.log('history', complexPgn.history);

        // Basic assertions for game header
        assert.equal(complexPgn.header.tags["White"], "4. Petroff Defense");

        // Ensure the game history is loaded
        assert.true(complexPgn.history.moves.length > 0);
    });

    it('should add a variation with a null move as black', () => {
        const history = new History()
        const ply1 = history.addMove("e4")
        history.addMove("e6")
        history.addMove("d3")
        history.addMove("--")
        history.addMove("Nd2")
        history.addMove("e5", ply1)

        console.log('history -->', history.moves[3]);

        assert.equal(history.moves[1].variations.length, 1)
        assert.equal(history.moves[3].san, "--")
        assert.equal(history.moves[3].color, "b")
    })


    // it('should add a variation with a null move as white', () => {
    //     const history = new History()
    //     const ply1 = history.addMove("e4")
    //     history.addMove("e6")
    //     history.addMove("d3")
    //     history.addMove("d5")
    //     history.addMove("--")
    //     history.addMove("e5", ply1)

    //     assert.equal(history.moves[1].variations.length, 1)
    // })

});
