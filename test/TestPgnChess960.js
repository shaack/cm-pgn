/**
 * @author Stefan Haack (https://shaack.com)
 */
import {describe, it, assert} from "teevi/src/teevi.js"
import {Pgn} from "../src/Pgn.js"

describe("TestPgnChess960", function () {

    it("should load a chess960 game from a valid chess960 pgn", function () {
        const gamePgn = `[Event "Freestyle Weissenhaus KO"]
[Site "Wangels GER"]
[Date "2025.02.09"]
[EventDate "2025.02.09"]
[Round "1.1"]
[Result "1-0"]
[White "Levon Aronian"]
[Black "Vladimir Fedoseev"]
[ECO "?"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "72"]
[Variant "Chess960"]
[SetUp "1"]
[FEN "nrkbrnbq/pppppppp/8/8/8/8/PPPPPPPP/NRKBRNBQ w KQkq - 0 1"]

1. f4 Nb6 2. Nb3 f6 3. e4 e5 4. f5 d5 5. g4 Nfd7 6. exd5 Bxd5 7. Bf3 c6 8.
Ng3 Be7 9. O-O-O Qg8 10. d3 Bb4 11. c3 Be7 12. c4 Bxf3 13. Qxf3 Qf7 14. Ne4
O-O 15. Be3 Na4 16. Rg1 b5 17. c5 b4 18. Qf2 Rb5 19. Qc2 a5 20. d4 Ra8 21.
g5 Kh8 22. gxf6 Bxf6 23. d5 cxd5 24. Nd6 Qf8 25. Nxb5 d4 26. c6 Rc8 27.
N3xd4 exd4 28. Bxd4 Nac5 29. Bxf6 Nxf6 30. c7 b3 31. axb3 Na6 32. Kb1 Nb4
33. Qc4 Ne8 34. Rd8 Qxf5+ 35. Ka1 Nc2+ 36. Qxc2 1-0`
        const pgn = new Pgn(gamePgn) // should also work with the correct tag
        console.log(pgn)
    })

    it("should load a chess960 game from a valid chess960 pgn (variant 2)", function () {
        const gamePgn = `[Event "Freestyle Weissenhaus KO"]
[Site "Wangels GER"]
[Date "2025.02.09"]
[EventDate "2025.02.09"]
[Round "1.1"]
[Result "1-0"]
[White "Levon Aronian"]
[Black "Vladimir Fedoseev"]
[ECO "?"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "72"]
[SetUp "1"]
[FEN "nrkbrnbq/pppppppp/8/8/8/8/PPPPPPPP/NRKBRNBQ w KQkq - 0 1"]

1. f4 Nb6 2. Nb3 f6 3. e4 e5 4. f5 d5 5. g4 Nfd7 6. exd5 Bxd5 7. Bf3 c6 8.
Ng3 Be7 9. O-O-O Qg8 10. d3 Bb4 11. c3 Be7 12. c4 Bxf3 13. Qxf3 Qf7 14. Ne4
O-O 15. Be3 Na4 16. Rg1 b5 17. c5 b4 18. Qf2 Rb5 19. Qc2 a5 20. d4 Ra8 21.
g5 Kh8 22. gxf6 Bxf6 23. d5 cxd5 24. Nd6 Qf8 25. Nxb5 d4 26. c6 Rc8 27.
N3xd4 exd4 28. Bxd4 Nac5 29. Bxf6 Nxf6 30. c7 b3 31. axb3 Na6 32. Kb1 Nb4
33. Qc4 Ne8 34. Rd8 Qxf5+ 35. Ka1 Nc2+ 36. Qxc2 1-0`
        const pgn = new Pgn(gamePgn, {chess960: true})
        console.log(pgn)
    })
})