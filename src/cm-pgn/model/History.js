/**
 * Author: shaack
 * Date: 07.03.2018
 */

function IllegalMoveException(history, fen, notation) {
    this.history = history;
    this.fen = fen;
    this.notation = notation;
    this.chess = new Chess();
    this.toString = function() {
        return "IllegalMoveException " + fen + " => " + notation;
    }
}

export class History {

    constructor(parsedMoves, fen = null) {
        this.fen = fen; // the fen, to start with
        this.chess = fen ? new Chess(fen) : new Chess();
        this.moves = [];
        this.addParsedMoves(parsedMoves);
    }

    addParsedMoves(parsedMoves) {
        for (let parsedMove of parsedMoves) {
            console.log(parsedMove);
            const notation = parsedMove.notation.notation;
            const move = this.chess.move(notation, {sloppy: true});
            if (move) {
                // const move = chess.moves({verbose: true})[this.moves.length - 1];
                move.fen = this.chess.fen();
                move.variations = [];
                const parsedVariations = parsedMove.variations;
                if(parsedVariations.length > 0) {
                    const lastMove = this.moves[this.moves.length - 1];
                    for (let parsedVariation of parsedVariations) {
                        move.variations.push(new History(parsedVariation, lastMove.fen));
                    }
                }
                this.moves.push(move);
            } else {
                throw new IllegalMoveException(this, this.chess.fen(), notation);
            }
        }
    }

}