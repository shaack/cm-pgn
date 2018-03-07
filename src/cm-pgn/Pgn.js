/**
 * Author: shaack
 * Date: 07.03.2018
 */
import {Header, tags} from "./Header.js";
import {History} from "./History.js";

export class Pgn {

    constructor(pgnString = null) {
        if (!pgnString) {
            this.header = new Header();
            this.history = new History();
        } else {
            this.parse(pgnString);
        }
    }

    parse(pgnString) {
        const lastHeaderElement = pgnString.lastIndexOf("]") + 1;
        const headerString = pgnString.substr(0, lastHeaderElement);
        const historyString = pgnString.substr(lastHeaderElement);
        this.parseHeader(headerString);
        if (this.header.get(tags.SetUp) === "1" && this.header.has(tags.FEN)) {
            this.parseHistory(historyString, this.header.get(tags.FEN));
        } else {
            this.parseHistory(historyString);
        }
    }

    parseHeader(headerString) {
        this.header = new Header(headerString);
    }

    parseHistory(historyString, fen = null) {
        const parsedMoves = pgnParser.parse(historyString.replace(/\s\s+/g, ' ').replace(/\n/g, " "));
        console.log("parsedMoves", parsedMoves);
        this.history = new History(parsedMoves[0], fen);
    }

    toString() {
        let pgn = "";
        if (this.header.size > 0) {
            pgn += this.header.toString() + "\n";
        }
        pgn += this.history.toString();
        return pgn;
    }

}