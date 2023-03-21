/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
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

    wrap(str, maxLength) {
        const words = str.split(" ")
        let lines = []
        let line = ""
        for (let i = 0; i < words.length; i++) {
            const word = words[i]
            if (line.length + word.length < maxLength) {
                line += word + " "
            } else {
                lines.push(line.trim())
                line = word + " "
            }
        }
        lines.push(line.trim())
        return lines.join("\n")
    }

    render() {
        const header = this.header.render()
        let history = this.history.render()
        if(this.header.tags[TAGS.Result]) {
            history += " " + this.header.tags[TAGS.Result]
        }
        return header + "\n" + this.wrap(history, 80)
    }

}