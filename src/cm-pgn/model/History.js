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

export class History extends Array {

    constructor(parsedMoves = null, fen = null) {
        super();
        this.chess = fen ? new Chess(fen) : new Chess();
        if(parsedMoves) {
            this.addParsedMoves(parsedMoves);
        }
    }

    addParsedMoves(parsedMoves) {
        for (let parsedMove of parsedMoves) {
            if(parsedMove.notation) {
                const notation = parsedMove.notation.notation;
                const move = this.chess.move(notation, {sloppy: true});
                if (move) {
                    // const move = chess.moves({verbose: true})[this.moves.length - 1];
                    move.fen = this.chess.fen();
                    if(parsedMove.nag) {
                        move.nag = parsedMove.nag[0];
                    }
                    if(parsedMove.commentBefore) {
                        move.commentBefore = parsedMove.commentBefore;
                    }
                    if(parsedMove.commentMove) {
                        move.commentMove = parsedMove.commentMove;
                    }
                    if(parsedMove.commentAfter) {
                        move.commentAfter = parsedMove.commentAfter;
                    }
                    move.variations = [];
                    const parsedVariations = parsedMove.variations;
                    if (parsedVariations.length > 0) {
                        const lastMove = this[this.length - 1];
                        for (let parsedVariation of parsedVariations) {
                            move.variations.push(new History(parsedVariation, lastMove.fen));
                        }
                    }
                    this.push(move);
                } else {
                    throw new IllegalMoveException(this, this.chess.fen(), notation);
                }
            }
        }
        delete this.chess;
    }

}