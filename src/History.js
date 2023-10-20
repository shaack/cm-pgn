/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {pgnParser} from "./parser/pgnParser.js"
import {Chess} from "chess.mjs/src/Chess.js"

function IllegalMoveException(fen, notation) {
    this.fen = fen
    this.notation = notation
    this.toString = function () {
        return "IllegalMoveException: " + fen + " => " + notation
    }
}

export class History {

    constructor(historyString = null, setUpFen = null, sloppy = false) {
        if (!historyString) {
            this.clear()
        } else {
            const parsedMoves = pgnParser.parse(historyString
                .replace(/\s\s+/g, " ")
                .replace(/\n/g, " ")
            )
            this.moves = this.traverse(parsedMoves[0], setUpFen, null, 1, sloppy)
        }
        this.setUpFen = setUpFen
    }

    clear() {
        this.moves = []
    }

    traverse(parsedMoves, fen, parent = null, ply = 1, sloppy = false) {
        const chess = fen ? new Chess(fen) : new Chess() // chess.js must be included in HTML
        const moves = []
        let previousMove = parent
        for (let parsedMove of parsedMoves) {
            if (parsedMove.notation) {
                const notation = parsedMove.notation.notation
                const move = chess.move(notation, {sloppy: sloppy})
                if (move) {
                    if (previousMove) {
                        if (!move.previous) {
                            move.previous = previousMove
                        }
                        if (!previousMove.next) {
                            previousMove.next = move
                        }
                    } else {
                        move.previous = null
                    }
                    move.ply = ply
                    this.fillMoveFromChessState(move, chess)
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

    fillMoveFromChessState(move, chess) {
        move.fen = chess.fen()
        move.uci = move.from + move.to + (move.promotion ? move.promotion : "")
        move.variations = []
        if (chess.game_over()) {
            move.gameOver = true
            if (chess.in_draw()) {
                move.inDraw = true
            }
            if (chess.in_stalemate()) {
                move.inStalemate = true
            }
            if (chess.insufficient_material()) {
                move.insufficientMaterial = true
            }
            if (chess.in_threefold_repetition()) {
                move.inThreefoldRepetition = true
            }
            if (chess.in_checkmate()) {
                move.inCheckmate = true
            }
        }
        if (chess.in_check()) {
            move.inCheck = true
        }
    }

    /**
     * @param move
     * @return the history to the move which may be in a variation
     */
    historyToMove(move) {
        const moves = []
        let pointer = move
        moves.push(pointer)
        while (pointer.previous) {
            moves.push(pointer.previous)
            pointer = pointer.previous
        }
        return moves.reverse()
    }

    /**
     * Don't add the move, just validate, if it would be correct
     * @param notation
     * @param previous
     * @param sloppy
     * @returns {[]|{}}
     */
    validateMove(notation, previous = null, sloppy = true) {
        if (!previous) {
            if (this.moves.length > 0) {
                previous = this.moves[this.moves.length - 1]
            }
        }
        const chess = new Chess(this.setUpFen ? this.setUpFen : undefined)
        if (previous) {
            const historyToMove = this.historyToMove(previous)
            for (const moveInHistory of historyToMove) {
                chess.move(moveInHistory)
            }
        }
        const move = chess.move(notation, {sloppy: sloppy})
        if (move) {
            this.fillMoveFromChessState(move, chess)
        }
        return move
    }

    addMove(notation, previous = null, sloppy = true) {
        if (!previous) {
            if (this.moves.length > 0) {
                previous = this.moves[this.moves.length - 1]
            }
        }
        const move = this.validateMove(notation, previous, sloppy)
        if (!move) {
            throw new Error("invalid move")
        }
        move.previous = previous
        if (previous) {
            move.ply = previous.ply + 1
            move.uci = move.from + move.to + (move.promotion ? move.promotion : "")
            if (previous.next) {
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

    render(renderComments = true, renderNags = true) {
        const renderVariation = (variation, needReminder = false) => {
            let result = ""
            for (let move of variation) {
                if (move.ply % 2 === 1) {
                    result += Math.floor(move.ply / 2) + 1 + ". "
                } else if (result.length === 0 || needReminder) {
                    result += move.ply / 2 + "... "
                }
                needReminder = false
                if (renderNags && move.nag) {
                    result += "$" + move.nag + " "
                }
                if (renderComments && move.commentBefore) {
                    result += "{" + move.commentBefore + "} "
                    needReminder = true
                }
                result += move.san + " "
                if (renderComments && move.commentMove) {
                    result += "{" + move.commentMove + "} "
                    needReminder = true
                }
                if (renderComments && move.commentAfter) {
                    result += "{" + move.commentAfter + "} "
                    needReminder = true
                }
                if (move.variations.length > 0) {
                    for (let variation of move.variations) {
                        result += "(" + renderVariation(variation) + ") "
                        needReminder = true
                    }
                }
                result += " "
            }
            return result
        }
        let ret = renderVariation(this.moves)
        // remove spaces before brackets
        ret = ret.replace(/\s+\)/g, ')')
        // remove double spaces
        ret = ret.replace(/\s\s+/g, ' ').trim()
        return ret
    }

}
