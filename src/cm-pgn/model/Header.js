/**
 * Author: shaack
 * Date: 07.03.2018
 */
export const tags = {
    // standard
    Event: "Event", // the name of the tournament or match event
    Site: "Site", // the location of the event
    Date: "Date", // the starting date of the game (format: YYYY.MM.TT)
    Round: "Round", // the playing round ordinal of the game
    White: "White", // the player of the white pieces (last name, pre name)
    Black: "Black", // the player of the black pieces (last name, pre name)
    Result: "Result", // the result of the game (1-0, 1/2-1/2, 0-1, *)
    // optional
    Annotator: "Annotator", // The person providing notes to the game.
    PlyCount: "PlyCount", // String value denoting total number of half-moves played.
    TimeControl: "TimeControl", // 40/7200:3600 (moves per seconds: sudden death seconds)
    Time: "Time", // Time the game started, in "HH:MM:SS" format, in local clock time.
    Termination: "Termination", // Gives more details about the termination of the game. It may be "abandoned", "adjudication" (result determined by third-party adjudication), "death", "emergency", "normal", "rules infraction", "time forfeit", or "unterminated".
    Mode: "Mode", // "OTB" (over-the-board) "ICS" (Internet Chess Server)
    SetUp: "SetUp", // "0": position is start position, "1": tag FEN defines the position
    FEN: "FEN", //  Alternative start position, tag SetUp has to be set to "1"
};

export class Header extends Map {
    constructor(headerString = null) {
        super();
        if(headerString) {
            this.read(headerString);
        }
    }
    read(headerString) {
        const list = headerString.match(/\[([^\]]+)]/g);
        if (list !== null) {
            for (let i = 0; i < list.length; i++) {
                let ret = list[i].match(/\[(\w+)\s+"([^"]+)"/);
                if (ret && tags[ret[1]]) {
                    this.set(ret[1], ret[2]);
                }
            }
        }
    }
}