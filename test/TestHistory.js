/**
 * Author: shaack
 * Date: 07.03.2018
 */

import {Test} from "../node_modules/svjs-test/src/svjs-test/Test.js";
import {Pgn} from "../src/cm-pgn/Pgn.js";

export class TestHistory extends Test {
    testHistory() {
        const pgn = new Pgn();
        pgn.readHistory("1. e2 e4 2. Nf3 Nc6");
        console.log(pgn.model);
        // Test.assertEquals(7, pgn.model.header.size);
        // Test.assertEquals("F/S Return Match", pgn.model.header.get("Event"));
    }
}