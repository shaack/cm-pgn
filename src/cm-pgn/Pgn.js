/**
 * Author: shaack
 * Date: 07.03.2018
 */
import {Header} from "./model/Header.js";
import {History} from "./model/History.js";

export class Pgn {

    constructor() {
        this.header = null;
        this.history = null;
    }

    readPgn(pgnString) {

    }

    readHeader(headerString) {
        this.header = new Header(headerString);
    }

    readHistory(historyString, fen = null) {
        const parsedMoves = parser.parse(historyString.replace(/\s\s+/g, ' '));
        console.log("parsedMoves", parsedMoves);
        this.history = new History(parsedMoves[0], fen);
    }

    /*
        writePgn() {
            return this.writer.writePgn();
        }

        writeHeader() {
            return this.writer.writeHeader();
        }

        writeHistory() {
            return this.writer.writeHistory();
        }
    */
}