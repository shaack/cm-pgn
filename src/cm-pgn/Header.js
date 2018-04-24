export const tags = {
    // Standard
    Event: "Event", // the name of the tournament or match event
    Site: "Site", // the location of the event
    Date: "Date", // the starting date of the game (format: YYYY.MM.TT)
    Round: "Round", // the playing round ordinal of the game
    White: "White", // the player of the white pieces (last name, pre name)
    Black: "Black", // the player of the black pieces (last name, pre name)
    Result: "Result", // the result of the game (1-0, 1/2-1/2, 0-1, *)
    // Optional
    Annotator: "Annotator", // The person providing notes to the game.
    PlyCount: "PlyCount", // String value denoting total number of half-moves played.
    TimeControl: "TimeControl", // 40/7200:3600 (moves per seconds: sudden death seconds)
    Time: "Time", // Time the game started, in "HH:MM:SS" format, in local clock time.
    Termination: "Termination", // Gives more details about the termination of the game. It may be "abandoned", "adjudication" (result determined by third-party adjudication), "death", "emergency", "normal", "rules infraction", "time forfeit", or "unterminated".
    Mode: "Mode", // "OTB" (over-the-board) "ICS" (Internet Chess Server)
    SetUp: "SetUp", // "0": position is start position, "1": tag FEN defines the position
    FEN: "FEN", //  Alternative start position, tag SetUp has to be set to "1"
};

export class Header {

    constructor(headerString = "") {
        this.tags = this.parse(headerString);
    }

    parse(headerString) {
        const tags = new Map();
        const rows = headerString.match(/\[([^\]]+)]/g);

        if (rows !== null && rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                let tag = rows[i].match(/\[(\w+)\s+"([^"]+)"/);
                if (tag) {
                    tags.set(tag[1], tag[2]);
                }
            }
        }
        return tags;
    }

}

