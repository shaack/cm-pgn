export const TAGS = {

    // Standard "Seven Tag Roster"
    Event: "Event", // the name of the tournament or match event
    Site: "Site", // the location of the event
    Date: "Date", // the starting date of the game (format: YYYY.MM.TT)
    Round: "Round", // the playing round ordinal of the game
    White: "White", // the player of the white pieces (last name, pre name)
    Black: "Black", // the player of the black pieces (last name, pre name)
    Result: "Result", // the result of the game (1-0, 1/2-1/2, 0-1, *)

    // Optional (http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm#c9)
    //      Player related information
    WhiteTitle: "WhiteTitle", BlackTitle: "BlackTitle", // These use string values such as "FM", "IM", and "GM"; these tags are used only for the standard abbreviations for FIDE titles. A value of "-" is used for an untitled player.
    WhiteElo: "WhiteElo", BlackElo: "BlackElo", // These tags use integer values; these are used for FIDE Elo ratings. A value of "-" is used for an unrated player.
    WhiteUSCF: "WhiteUSCF", BlackUSCF: "BlackUSCF", // These tags use integer values; these are used for USCF (United States Chess Federation) ratings. Similar tag names can be constructed for other rating agencies.
    WhiteNA: "WhiteNA", BlackNA: "BlackNA:", // These tags use string values; these are the e-mail or network addresses of the players. A value of "-" is used for a player without an electronic address.
    WhiteType: "WhiteType", BlackType: "BlackType", // These tags use string values; these describe the player types. The value "human" should be used for a person while the value "program" should be used for algorithmic (computer) players.
    //      Event related information
    EventDate: "EventDate", // This uses a date value, similar to the Date tag field, that gives the starting date of the Event.
    EventSponsor: "EventSponsor", // This uses a string value giving the name of the sponsor of the event.
    Section: "Section", // This uses a string; this is used for the playing section of a tournament (e.g., "Open" or "Reserve").
    Stage: "Stage", // This uses a string; this is used for the stage of a multistage event (e.g., "Preliminary" or "Semifinal").
    Board: "Board", // This uses an integer; this identifies the board number in a team event and also in a simultaneous exhibition.
    //      Opening information (locale specific)
    Opening: "Opening", // This uses a string; this is used for the traditional opening name. This will vary by locale. This tag pair is associated with the use of the EPD opcode "v0" described in a later section of this document.
    ECO: "ECO", // This uses a string of either the form "XDD" or the form "XDD/DD" where the "X" is a letter from "A" to "E" and the "D" positions are digits.
    //      Time and date related information
    Time: "Time", // Time the game started, in "HH:MM:SS" format, in local clock time.
    UTCTime: "UTCTime", // This tag is similar to the Time tag except that the time is given according to the Universal Coordinated Time standard.
    UTCDate: "UTCDate", // This tag is similar to the Date tag except that the date is given according to the Universal Coordinated Time standard.
    //      Time control
    TimeControl: "TimeControl", // 40/7200:3600 (moves per seconds: sudden death seconds)
    //      Alternative starting positions
    SetUp: "SetUp", // "0": position is start position, "1": tag FEN defines the position
    FEN: "FEN", //  Alternative start position, tag SetUp has to be set to "1"
    //      Game conclusion
    Termination: "Termination", // Gives more details about the termination of the game. It may be "abandoned", "adjudication" (result determined by third-party adjudication), "death", "emergency", "normal", "rules infraction", "time forfeit", or "unterminated".
    //      Miscellaneous
    Annotator: "Annotator", // The person providing notes to the game.
    Mode: "Mode", // "OTB" (over-the-board) "ICS" (Internet Chess Server)
    PlyCount: "PlyCount", // String value denoting total number of half-moves played.

}

export class Header {

    constructor(headerString = "") {
        this.clear()
        const rows = headerString.match(/\[([^\]]+)]/g)
        if (rows && rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                let tag = rows[i].match(/\[(\w+)\s+"([^"]+)"/)
                if (tag) {
                    this.tags[tag[1]] = tag[2]
                }
            }
        }
    }

    clear() {
        this.tags = {}
    }

    render() {
        let rendered = ""
        for (const tag in this.tags) {
            rendered += `[${tag} "${this.tags[tag]}"]\n`
        }
        return rendered
    }

}

