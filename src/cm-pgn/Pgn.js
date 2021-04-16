import {Header, TAGS} from "./Header.js"
import {History} from "./History.js"

export class Pgn {

    constructor(pgnString = "", props = {}) {
        // only the header?
        const lastHeaderElement =  pgnString.trim().substr(-1) === "]" ? pgnString.length : pgnString.lastIndexOf("]\n\n") + 1
        const headerString = pgnString.substr(0, lastHeaderElement)
        const historyString = pgnString.substr(lastHeaderElement)
        const sloppy = !!props.sloppy
        this.header = new Header(headerString)
        if (this.header.tags[TAGS.SetUp] === "1" && this.header.tags[TAGS.FEN]) {
            this.history = new History(historyString, this.header.tags[TAGS.FEN], sloppy)
        } else {
            this.history = new History(historyString, undefined, sloppy)
        }
    }

    render() {
        let pgn = ""
        pgn += this.header.render()
        pgn += "\n"
        pgn += this.history.render()
        return pgn
    }

}