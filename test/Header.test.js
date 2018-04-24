import assert from 'assert';

import {Header, tags} from "../src/cm-pgn/Header.js";

describe('Header', () => {
  it('should parse header', () => {
    const header = new Header(`[Event "F/S Return Match"]
        [Site "Belgrade, Serbia JUG"]
        [Date "1992.11.04"]
        [Round "29"]
        [White "Fischer, Robert J."]
        [Black "Spassky, Boris V."]
        [Result "1/2-1/2"]`);
    assert.equal(header.tags.size, 7);
    assert.equal(header.tags.get(tags.Event), "F/S Return Match");
  })
});
