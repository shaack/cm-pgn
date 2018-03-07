/**
 * Author: shaack
 * Date: 07.03.2018
 */
import {Header} from "./model/Header.js";
import {History} from "./model/History.js";

export class Pgn {
    constructor(chess = new Chess()) {

        this.model = {
            chess: chess,
            header: new Header(),
            history: new History()
        };
    }

    readPgn(pgnString) {

    }

    readHeader(headerString) {
        this.model.header.read(headerString);
    }

    readHistory(historyString) {
        this.model.history.read(historyString);
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