/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
const READER_STATE = {
    beforeTags: 0,
    tags: 1,
    beforeHistory: 2,
    history: 3
}

/**
 * Helper class to load a list of PGNs from a file or URL
 */
export class PgnList {

    constructor() {
        this.pgns = []
    }

    fetch(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                let pgn = ""
                let readerState = READER_STATE.beforeTags
                response.text().then((pgnsFromFile) => {
                    const lines = pgnsFromFile.split('\n')
                    let i = 1
                    for (const line of lines) {
                        switch (readerState) {
                            case READER_STATE.beforeTags:
                                if (line.trim()) {
                                    if (!line.startsWith("[")) {
                                        reject("parsing error 12f2ce, line " + i + " has to start with '['")
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
                                    if (isNaN(parseInt(line.charAt(0), 10))) {
                                        reject("parsing error 0cee06, line " + i + " has to start with a number")
                                    }
                                    pgn += line + "\n"
                                    readerState = READER_STATE.history
                                }
                                break
                            case READER_STATE.history:
                                if (!line.trim()) { // blank line
                                    this.pgns.push(pgn.trim())
                                    pgn = ""
                                    readerState = READER_STATE.beforeTags
                                } else {
                                    pgn += line + "\n"
                                }
                                break
                        }
                        i++
                    }
                    resolve()
                })
            })
        })
    }
}