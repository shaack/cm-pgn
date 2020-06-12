import {pgnParser} from "./parser/pgnParser.js"

function IllegalMoveException(fen, notation) {
    this.fen = fen
    this.notation = notation
    this.toString = function () {
        return "IllegalMoveException: " + fen + " => " + notation
    }
}

// maybe: https://github.com/joaonuno/tree-model-js
export class History {

    constructor(historyString = null, fen = null) {
        if (!historyString) {
            this.moves = []
        } else {
            this.parse(historyString, fen)
        }
    }

    parse(historyString, fen) {
        const parsedMoves = pgnParser.parse(historyString.replace(/\s\s+/g, ' ').replace(/\n/g, " "))
        this.moves = this.createValidMoves(parsedMoves[0], fen)
    }

    /**
     * ToDo fill Moves here, not in cm-chess
     */
    createValidMoves(parsedMoves, fen, parent = null, ply = 1) {
        const chess = fen ? new Chess(fen) : new Chess() // chess.js must be included in HTML
        const moves = []

        let previousMove = parent;

        for (let parsedMove of parsedMoves) {
            if (parsedMove.notation) {
                const notation = parsedMove.notation.notation
                const move = chess.move(notation, {sloppy: true})
                // console.log("createValidMoves", ply, parsedMoves.length, previousMove ? previousMove.san : null, move.san, parent ? parent.san : null)
                if (move) {
                    if(previousMove) {
                        move.previous = previousMove
                        previousMove.next = move
                    } else {
                        move.previous = null
                    }
                    move.ply = ply
                    move.fen = chess.fen()
                    if (parsedMove.nag) {
                        move.nag = parsedMove.nag[0]
                    }
                    if (parsedMove.commentBefore) {
                        move.commentBefore = parsedMove.commentBefore
                    }
                    if (parsedMove.commentMove) {
                        move.commentMove = parsedMove.commentMove
                    }
                    if (parsedMove.commentAfter) {
                        move.commentAfter = parsedMove.commentAfter
                    }
                    move.variations = []
                    const parsedVariations = parsedMove.variations
                    if (parsedVariations.length > 0) {
                        const lastFen = moves.length > 0 ? moves[moves.length - 1].fen : fen
                        // console.log("down")
                        for (let parsedVariation of parsedVariations) {
                            move.variations.push(this.createValidMoves(parsedVariation, lastFen, previousMove, ply))
                        }
                        // console.log("up")
                    }
                    moves.push(move)
                    previousMove = move
                } else {
                    throw new IllegalMoveException(chess.fen(), notation)
                }
            }
            ply++;
        }

        return moves
    }
}