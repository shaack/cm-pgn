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

    constructor(historyString = null, fen = null, sloppy = false) {
        if (!historyString) {
            this.clear()
        } else {
            const parsedMoves = pgnParser.parse(historyString.replace(/\s\s+/g, ' ').replace(/\n/g, " "))
            this.moves = this.traverse(parsedMoves[0], fen, null, 1, sloppy)
        }
    }

    clear() {
        this.moves = []
    }

    traverse(parsedMoves, fen, parent = null, ply = 1, sloppy = false) {
        // console.log("traverse", fen, ply, sloppy)
        const chess = fen ? new Chess(fen) : new Chess() // chess.js must be included in HTML
        const moves = []
        let previousMove = parent
        for (let parsedMove of parsedMoves) {
            if (parsedMove.notation) {
                const notation = parsedMove.notation.notation
                const move = chess.move(notation, {sloppy: sloppy})
                // console.log("parsedMove", ply, parsedMoves.length, previousMove ? previousMove.san : null, move.san, parent ? parent.san : null)
                if (move) {
                    if (previousMove) {
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
                        for (let parsedVariation of parsedVariations) {
                            move.variations.push(this.traverse(parsedVariation, lastFen, previousMove, ply, sloppy))
                        }
                    }
                    move.variation = moves
                    moves.push(move)
                    previousMove = move
                } else {
                    throw new IllegalMoveException(chess.fen(), notation)
                }
            }
            ply++
        }
        return moves
    }

    addMove(notation, previous = null, sloppy = true) {
        if(!previous) {
            if(this.moves.length > 0) {
                previous = this.moves[this.moves.length - 1]
            }
        }
        const chess = previous ? new Chess(previous.fen) : new Chess()
        const move = chess.move(notation, {sloppy: sloppy})
        if(!move) {
            throw new Error("invalid move")
        }
        move.fen = chess.fen()
        if(previous) {
            move.previous = previous
            move.ply = previous.ply + 1
            if(previous.next) {
                previous.next.variations.push([])
                move.variation = previous.next.variations[previous.next.variations.length - 1]
                move.variation.push(move)
            } else {
                previous.next = move
                move.variation = previous.variation
                previous.variation.push(move)
            }
        } else {
            move.variation = this.moves
            move.ply = 1
            this.moves.push(move)
        }
        return move
    }

}