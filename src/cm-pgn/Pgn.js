import {Header, tags} from "./Header.js"
import {History} from "./History.js"

export class Pgn {

    constructor(pgnString = null) {
        if (pgnString) {
            this.parse(pgnString)
        }
    }

    parse(pgnString) {
        const lastHeaderElement = pgnString.lastIndexOf("]\n\n") + 1
        const headerString = pgnString.substr(0, lastHeaderElement)
        const historyString = pgnString.substr(lastHeaderElement)
        this.header = new Header(headerString)
        if (this.header.tags.get(tags.SetUp) === "1" && this.header.tags.has(tags.FEN)) {
            this.history = new History(historyString, this.header.tags.get(tags.FEN))
        } else {
            this.history = new History(historyString)
        }
    }

    render() {
        let pgn = ""
        if (this.header.tags.size > 0) {
            pgn += this.header.render() + "\n"
        }
        pgn += this.history.render()
        return pgn
    }

}