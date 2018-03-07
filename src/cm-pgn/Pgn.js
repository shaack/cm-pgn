/**
 * Author: shaack
 * Date: 07.03.2018
 */
import {Header} from "./model/Header.js";
import {History} from "./model/History.js";

export class Pgn {
    constructor() {
        this.model = {
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
        this.reader.readHistory(historyString);
    }

    writePgn() {
        return this.writer.writePgn();
    }

    writeHeader() {
        return this.writer.writeHeader();
    }

    writeHistory() {
        return this.writer.writeHistory();
    }
}