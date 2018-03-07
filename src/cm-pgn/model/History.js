/**
 * Author: shaack
 * Date: 07.03.2018
 */

const chess = new Chess();

function IllegalMoveException(history, fen, notation) {
    this.history = history;
    this.fen = fen;
    this.notation = notation;
    this.toString = function() {
        return "IllegalMoveException " + fen + " => " + notation;
    }
}

export class History {

    constructor(parsedMoves, fen = null) {
        this.fen = fen; // the fen, to start with
        if (fen) {
            chess.load(fen);
        }
        this.moves = [];
        this.addParsedMoves(parsedMoves);
    }

    addParsedMoves(parsedMoves) {
        for (let parsedMove of parsedMoves) {
            console.log(parsedMove);
            const notation = parsedMove.notation.notation;
            const move = chess.move(notation, {sloppy: true});
            if (move) {
                // const move = chess.moves({verbose: true})[this.moves.length - 1];
                move.fen = chess.fen();
                move.variations = [];
                const variations = parsedMove.variations;
                for (let variation of variations) {
                    move.variations.push(new History(variation, move.fen));
                }
                this.moves.push(move);
            } else {
                console.error("illegal move", notation, chess.fen(), this);
                throw new IllegalMoveException(this, chess.fen(), notation);
            }
        }
    }

}