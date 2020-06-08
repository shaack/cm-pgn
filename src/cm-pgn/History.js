import {Chess} from '../../lib/chess.js';
import pgnParser from "./parser/pgnParser.js";

function IllegalMoveException(fen, notation) {
    this.fen = fen;
    this.notation = notation;
    this.toString = function () {
        return "IllegalMoveException: " + fen + " => " + notation;
    }
}

export class History {

    constructor(historyString = null, fen = null) {
        if(!historyString) {
            this.moves = [];
        } else {
            this.parse(historyString, fen);
        }
    }

    parse(historyString, fen) {
        const parsedMoves = pgnParser.parse(historyString.replace(/\s\s+/g, ' ').replace(/\n/g, " "));
        this.moves = this.createValidMoves(parsedMoves[0], fen);
    }

    createValidMoves(parsedMoves, fen) {
        const chess = fen ? new Chess(fen) : new Chess();
        const moves = [];

        for (let parsedMove of parsedMoves) {
            if (parsedMove.notation) {
                const notation = parsedMove.notation.notation;
                const move = chess.move(notation, {sloppy: true});
                if (move) {
                    move.fen = chess.fen();
                    if (parsedMove.nag) {
                        move.nag = parsedMove.nag[0];
                    }
                    if (parsedMove.commentBefore) {
                        move.commentBefore = parsedMove.commentBefore;
                    }
                    if (parsedMove.commentMove) {
                        move.commentMove = parsedMove.commentMove;
                    }
                    if (parsedMove.commentAfter) {
                        move.commentAfter = parsedMove.commentAfter;
                    }
                    move.variations = [];
                    const parsedVariations = parsedMove.variations;
                    if (parsedVariations.length > 0) {
                        const lastFen = moves.length > 0 ? moves[moves.length - 1].fen : fen;
                        for (let parsedVariation of parsedVariations) {
                            move.variations.push(this.createValidMoves(parsedVariation, lastFen));
                        }
                    }
                    moves.push(move);
                } else {
                    throw new IllegalMoveException(chess.fen(), notation);
                }
            }
        }

        return moves;
    }
}