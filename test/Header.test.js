import assert from 'assert';

import {Pgn} from "../src/cm-pgn/Pgn.js";
import {tags} from "../src/cm-pgn/Header.js";

describe('Pgn', () => {
  it('should parse header', () => {
    const pgn = new Pgn();
    pgn.parseHeader(`[Event "F/S Return Match"]
        [Site "Belgrade, Serbia JUG"]
        [Date "1992.11.04"]
        [Round "29"]
        [White "Fischer, Robert J."]
        [Black "Spassky, Boris V."]
        [Result "1/2-1/2"]`);
    assert.equal(pgn.header.size, 7);
    assert.equal(pgn.header.get(tags.Event), "F/S Return Match");
  })
});
