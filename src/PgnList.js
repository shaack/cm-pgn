/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {Pgn} from "./Pgn.js"

const READER_STATE = {
    beforeTags: 0,
    tags: 1,
    beforeHistory: 2,
    history: 3
}

/**
 * Helper class to load a list of PGNs from a file, URL, or string.
 */
export class PgnList {

    constructor(pgnsString) {
        this.pgns = []
        if (typeof pgnsString === "string" && pgnsString.length > 0) {
            this.pgns = PgnList.splitPgns(pgnsString)
        }
    }

    /**
     * Split a multi-game PGN string into an array of individual PGN strings.
     * @param {string} text
     * @returns {string[]}
     */
    static splitPgns(text) {
        const pgns = []
        let pgn = ""
        let readerState = READER_STATE.beforeTags
        const lines = text.split('\n')
        let i = 1
        const flush = () => {
            const trimmed = pgn.trim()
            if (trimmed) {
                pgns.push(trimmed)
            }
            pgn = ""
            readerState = READER_STATE.beforeTags
        }
        for (const line of lines) {
            switch (readerState) {
                case READER_STATE.beforeTags:
                    if (line.trim()) {
                        if (!line.startsWith("[")) {
                            throw new Error("parsing error 12f2ce, line " + i + " has to start with '['")
                        }
                        pgn += line + "\n"
                        readerState = READER_STATE.tags
                    }
                    break
                case READER_STATE.tags:
                    pgn += line + "\n"
                    if (!line.trim()) { // blank line
                        readerState = READER_STATE.beforeHistory
                    }
                    break
                case READER_STATE.beforeHistory:
                    if (line.trim()) {
                        pgn += line + "\n"
                        readerState = READER_STATE.history
                    }
                    break
                case READER_STATE.history:
                    if (!line.trim()) { // blank line ends this game
                        flush()
                    } else {
                        pgn += line + "\n"
                    }
                    break
            }
            i++
        }
        // EOF flush: last game may not be followed by a blank line
        flush()
        return pgns
    }

    /**
     * Parse a multi-game PGN string into an array of Pgn instances.
     * @param {string} text
     * @param {object} [props] forwarded to the Pgn constructor
     * @returns {Pgn[]}
     */
    static parse(text, props = {}) {
        return PgnList.splitPgns(text).map(s => new Pgn(s, props))
    }

    fetch(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                response.text().then((pgnsFromFile) => {
                    try {
                        this.pgns = PgnList.splitPgns(pgnsFromFile)
                        resolve()
                    } catch (e) {
                        reject(e.message || String(e))
                    }
                })
            })
        })
    }
}
