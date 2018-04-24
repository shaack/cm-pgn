// Lower case header tags so that they are case-insensitive
export const tags = {
    // Standard
    Event: 'event', // Name of the tournament or match event
    Site: 'site', // Location of the event
    Date: 'date', // Starting date of the game (format: YYYY.MM.TT)
    Round: 'round', // Playing round ordinal of the game
    White: 'white', // Player of the white pieces (last name, pre name)
    Black: 'black', // Player of the black pieces (last name, pre name)
    Result: 'result', // Result of the game (1-0, 1/2-1/2, 0-1, *)
    // Optional
    Annotator: 'annotator', // The person providing notes to the game.
    PlyCount: 'plycount', // String value denoting total number of half-moves played.
    TimeControl: 'timecontrol', // 40/7200:3600 (moves per seconds: sudden death seconds)
    Time: 'time', // Time the game started, in "HH:MM:SS" format, in local clock time.
    Termination: 'termination', // Gives more details about the termination of the game. It may be "abandoned', "adjudication" (result determined by third-party adjudication), "death', "emergency', "normal', "rules infraction', "time forfeit', or "unterminated".
    Mode: 'mode', // "OTB" (over-the-board) "ICS" (Internet Chess Server)
    SetUp: 'setup', // "0": position is start position, "1": tag FEN defines the position
    FEN: 'fen', //  Alternative start position, tag SetUp has to be set to "1"
};

export function parseHeader(headerString) {
    if (!headerString) {
        return new Map();
    }

    const header = new Map();
    const list = headerString.match(/\[([^\]]+)]/g);

    if (list !== null) {
        for (let i = 0; i < list.length; i++) {
            let ret = list[i].match(/\[(\w+)\s+"([^"]+)"/);
            if (ret) {
                // Add all tags, including non-official ones (see tags above)
                header.set(ret[1].toLowerCase(), ret[2]);
            }
        }
    }
    return header;
};
