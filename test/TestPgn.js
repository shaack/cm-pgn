/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Pgn} from "../src/Pgn.js"
import {TAGS} from "../src/Header.js"

describe('Pgn', () => {

    it('should create an empty pgn', () => {
        const pgn = new Pgn()
        assert.equal(pgn.history.moves.length, 0)
        assert.equal(Object.keys(pgn.header.tags).length, 0)
    })

    it('should load a simple game', () => {
        const gamePgn = `[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called the Ruy Lopez.}
4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7
11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5
Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6
23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5
hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5
35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6
Nf2 42. g4 Bd3 43. Re6 1/2-1/2`
        const ignored = new Pgn(gamePgn)
        // assert.equal(pgn.header.tags.get("Date"), "1992.11.04")
    })

    it('should load a chess puzzle', () => {
        const gamePgn = `[Event "World Blitz 2015"]
[Site "Berlin GER"]
[Date "2015.10.14"]
[Round "15.26"]
[White "Bartel, Mateusz"]
[Black "Malakhov, V"]
[Result "0-1"]
[WhiteElo "2622"]
[BlackElo "2694"]
[ECO "A00"]
[SetUp "1"]
[FEN "r3r1k1/pp1qppb1/2p3p1/7p/3PpP2/BPP1P1Pb/P3Q1BP/3R1RK1 b - - 4 17"]

17...Bg4 18. Qc2 Bxd1 19. Rxd1 0-1`
        const pgn = new Pgn(gamePgn)
        assert.equal(pgn.header.tags[TAGS.SetUp], "1")
    })

    it('should load a game with SetUp and FEN', () => {
        const gamePgn = `[SetUp "1"]
[FEN "4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 0 1"]

1. e4`
        const pgn = new Pgn(gamePgn)
        assert.equal(pgn.header.tags[TAGS.SetUp], "1")
        assert.equal(pgn.history.moves[0].fen, "4k3/pppppppp/8/8/4P3/8/PPPP1PPP/4K3 b - e3 0 1")
    })

    it('should parse comment containing "[" and "]"', () => {
        // https://github.com/DHTMLGoodies/dhtmlchess/blob/master/pgn/1001-brilliant-checkmates.pgn
        const ignored = new Pgn(`[Event " White to move."]
[Site "?"]
[Date "1998.??.??"]
[Round "?"]
[White "1001 Brilliant Ways"]
[Black "to Checkmate"]
[Result "1-0"]
[Annotator "Magne,Alf"]
[SetUp "1"]
[FEN "r2qk1r1/p4p2/bp2pQp1/1n1pP1Bp/7P/3P2N1/P1R2PP1/2R3K1 w - - 0 1"]
[PlyCount "5"]
[EventDate "1998.??.??"]

1. Rc8 {[%emt 0:00:05]} Rxc8 {[%emt 0:00:01]} 2. Rxc8 {[%emt 0:00:01]} Qxc8 {
} 3. Qe7#  1-0`)
        // console.log(pgn.toString());
    })

    it('should parse header and history', () => {
        const ignored = new Pgn(`[Event "Bled-Zagreb-Belgrade Candidates"]
[Site "Bled, Zagreb & Belgrade YUG"]
[Date "1959.09.18"]
[Round "8"]
[White "Mikhail Tal"]
[Black "Vasily Smyslov"]
[Result "1-0"]
[WhiteElo "?"]
[BlackElo "?"]
[ECO "B10"]

1. e4 c6 2. d3 {Um den üblichen Varianten aus dem Weg zu gehen.} 2... d5 3. Nd2
e5 {Durch die scheinbar zurückhaltende Spielweise Tals ermutigt, glaubt Smyslov
quasi die Berechtigung zu haben, sofort forsch im Zentrum aufzutreten. Das
imposante schwarze Zentrum wird sich aber schon in wenigen Zügen als äußerst
instabil erweisen.} 4. Ngf3 Nd7 5. d4 $1 {Tal verletzt damit die Regeln; er
zieht den d-Bauern in der Eröffnung schon zum zweiten Mal. Aber Smyslov findet
nun nichts Besseres, als die Zentrumspannung aufzulösen, wonach Weiß als der
besser Entwickelte dasteht.} 5... dxe4 6. Nxe4 exd4 7. Qxd4 Ngf6 8. Bg5 Be7 9.
O-O-O O-O {Rochaden auf entgegengesetzte Flügel bedeuten, dass beide Seiten
schleunigst zum Angriff blasen müssen.} 10. Nd6 Qa5 {Smyslov stellt die erste
konkrete Drohung (gegen den weißen a-Bauern) auf.} 11. Bc4 $1 {Leistet
scheinbar dem schwarzen Gegenangrif Vorschub, da der Läufer ja sofort
angerempelt werden kann. Aber das routinemäßige} (11. Kb1 $2 Bxd6 12. Qxd6 Ne4
{ wäre für Schwarz vorteilhaft.} ) 11... b5 {Natürlich! Muss Tal nun Lb3
spielen, wonach mit c5 der schwarze Angriff so richtig in Schwung kommt?} 12.
Bd2 $1 {Dieser Gegenangriff auf die schwarze Da5 ist eine sehr wichtige
Einschaltung, wie man bald sehen wird.} 12... Qa6 13. Nf5 $1 {Der nächste
Zwischenzug. Dieser Angriff auf den Le7 bringt den weißen Springer gleich in
die richtige Position gegen den schwarzen König.} 13... Bd8 ( {Mit} 13... Bc5
{ist hier ebenfalls keine Figur zu gewinnen: } 14. Qh4 bxc4 15. Bc3 {nun zielen
die weißen Figuren optimal auf den schwarzen König} 15... Qxa2 16. Rxd7 Bxd7 (
16... Nxd7 17. Qg5) 17. Nh6+ Kh8 18. Qxf6 $1 {mit schnellem Matt (eine von Tal
selbst angegebene Variante).} ) 14. Qh4 $1 {Auf Lb3 wäre natürlich wieder c5
gut.} 14... bxc4 {Smyslov nimmt die Herausforderung an. Etwas Besseres hat er
hier allerdings auch nicht. Wollte er diese Stellung nicht auf dem Brett haben,
hätte er eben schon nicht 11... b5 spielen dürfen.} 15. Qg5 {Nun erkennt man
die Bedeutung des 12. Zuges von Weiß, der das Feld g5 frei gab.} 15... Nh5 $1
{Dieser zuerst befremdliche Zug ist in der Tat die beste Verteidigung! Nun ist
die weiße Dame durch den Ld8 bedroht, und auf Dxh5 könnte Schwarz durch Sf6
nebst Lxf5 den weißen Angriff komplett abschlagen, und den eigenen Angriff
durch Dxa2 einleiten.} ( {Dagegen würde nach} 15... Ne8 $2 { Weiß seine Figur
mit } 16. Qxd8 Qxa2 17. Qa5 { vorteilhaft zurückgewinnen.} ) ( {Allerdings
scheint auf} 15... g6 16. Bc3 Qxa2 {die schwarze Stellung ebenfalls
überlebensfähig. Smyslovs Zug aber ist aktiver.} ) 16. Nh6+ Kh8 17. Qxh5 Qxa2
{Mit Mattdrohung auf a1 und dem Anschein nach spielbar.} (17... gxh6 $2
{verliert nach} 18. Bc3+ f6 19. Qxh6 {mit der Drohung Sg5 (der Bauer f6 ist ja
gefesselt!).} ) (17... Nf6 18. Qc5 Nd7 19. Qd6 Bf6 { war jedoch eine
bedenkenswerte Alternative, auch wenn die schwarze Stellung nicht unbedingt
einen attraktiven Eindruck macht.} ) ( {Auch} 17... Bf6 18. Nxf7+ Kg8 19. N7g5
h6 20. Ne4 Qxa2 { kam in Frage, alles mit sehr komplizierter Stellung.} ) 18.
Bc3 Nf6 $4 {Erst dies ist der entscheidende Fehler, der sofort verliert.
Anscheinend hat Smyslov das folgende Damenopfer völlig übersehen!} (18... Bf6
$1 {sieht nach Rettung für Schwarz aus, z.B.} 19. Nxf7+ (19. Ng5 $5 Bxg5+ 20.
Qxg5 f6 21. Qf4 {wäre noch auf Gewinnchancen zu prüfen} ) 19... Kg8 20. N7g5
Qa1+ 21. Kd2 Bxc3+ 22. bxc3 Nf6 23. Qf7+ Rxf7 24. Rxa1 {mit wahrscheinlichem
Remis.} ) 19. Qxf7 $1 {Der Knalleffekt. Die Dame kann nicht genommen werden
wegen Txd8+ nebst Matt. } 19... Qa1+ {Da auch noch der Tf8 hängt, bleibt
Schwarz keine Wahl.} (19... Re8 20. Qg8+ Rxg8 21. Nf7# {wäre freilich
besonders nett gewesen.} ) 20. Kd2 Rxf7 (20... Qxd1+ 21. Rxd1 Rxf7 22. Nxf7+
Kg8 23. Nxd8 {kostet eine ganze Figur.} ) 21. Nxf7+ Kg8 22. Rxa1 Kxf7 {So ist
zwar 'nur' die Qualität verloren gegangen, aber da nun auch noch ein Bauer
fällt und die schwarze Stellung keine Spur an Kompensation bietet, gibt Smyslov
schnell auf.} 23. Ne5+ Ke6 24. Nxc6 Ne4+ 25. Ke3 Bb6+ 26. Bd4 $1 ( {Nicht mal}
26. Kxe4 Bb7 {, wonach Schwarz mit seinem Läuferpaar noch etwas Widerstand
leisten könnte, gönnt Tal seinem großen Gegner. Nach dem Textzug dagegen wird
sich ein schwarzer Läufer tauschen müssen, und Smyslov sah ein, dass es sinnlos
wäre, diese Stellung gegen Tal weiterzuspielen.} ) 1-0`)
        //console.log(pgn);
    })
    it('should parse stappenmethode weekly.pgn', () => {
        const pgn = new Pgn(`[Event "?"]
[Site "?"]
[Date "2012.??.??"]
[Round "?"]
[White "Schaak opheffen"]
[Black "Materiaal"]
[Result "0-1"]
[Annotator "S3"]
[Annotator "app 037-1"]
[SetUp "1"]
[FEN "r1b1Q1k1/1p2bpqp/8/8/p1Pr4/4PpN1/P6P/R4RK1 b - - 0 1"]

1... Bf8 (1... Qf8? 2. Qxf8+ Bxf8 3. exd4) 2. exd4 Qxd4+ {%Q} 3. Kh1 Bh3 
0-1`)
        assert.equal(5, pgn.history.moves.length)
        assert.equal("Schaak opheffen", pgn.header.tags[TAGS.White])
        assert.equal("app 037-1", pgn.header.tags[TAGS.Annotator])
    })
    it('should parse a pgn with only the header', () => {
        const gamePgn = `[SetUp "1"]
[FEN "4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 0 1"]`
        const ignored = new Pgn(gamePgn)
    })
    it('should render a simple PGN', () => {
        const gamePgn = `[SetUp "1"]
[FEN "4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 0 1"]
[Result "1-0"]

1. e4 (1. d4 {Die Variante} 1... d5) 1... e5 {Ein Kommentar} 2. a3 1-0`
        const pgn = new Pgn(gamePgn)
        console.log(gamePgn)
        console.log(pgn.render())
        assert.equal(pgn.render(), gamePgn)
    })
    it('should parse pgn from https://github.com/shaack/cm-pgn/issues/8', () => {
        const pgnString = `[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[FEN "r3kb1r/pbq2ppp/2p2n2/1pn1pP2/4P1P1/2NB1Q2/PPPBN2P/R3K2R w KQkq - 0 1"]
[SetUp "1"]

1. a4 { [%csl Rh1,Ra8,Gf6,Gc5,Gc3,Gb5,Yb4,Yb7,Yc6,Ra1,Rg2,Rf3,Re4,Rd5][%cal
Gf6e4,Gc5e4,Gc3d1,Gd1f2,Rb7e4,Re4h1,Rg4g5,Rf6d7]}  ( 1. g5)1... b4 2. Nd1 Nfxe4
3. Bxe4 Nxe4 4. Qxe4 c5 5. Qc4 Bxh1 6. Bxb4 Be7 7. Ne3 O-O 8. O-O-O Bf3 9. Nd5
Qb7 10. f6 Bxd5 11. Qxd5 Qxd5 12. Rxd5 gxf6 13. Bxc5 Rfd8 14. Rxd8+ Bxd8 15. b4
h5 16. h3 hxg4 17. hxg4 Kg7 18. Ng3 Bb6 19. Be7 Kg6 20. c4 Bf2 21. Nf5 Kg5 22.
Nd6 Kxg4 23. c5 Kf3 24. c6 e4 25. c7 Bd4 26. Nb5 Be5 27. Bd6 e3 28. Bxe5 fxe5
29. Nd6 Kf2  *`
        const pgn = new Pgn(pgnString)
        assert.equal(58, pgn.history.moves.length)
        const rendered = pgn.render()
        const parsedAgain = new Pgn(rendered)
        const renderedAgain = parsedAgain.render()
        assert.equal(rendered, renderedAgain)
    })
    it('should parse the example in the README.md', () => {
        const pgn = new Pgn(`[Site "Berlin"]
[Date "1989.07.02"]
[White "Haack, Stefan"]
[Black "Maier, Karsten"]

1. e4 e5 (e6) 2. Nf3 $1 {Great move!} Nc6 *`)
        const history = pgn.history
        assert.equal(4, history.moves.length)
        assert.equal(history.moves[0].san, "e4")
        assert.equal(history.moves[1].variations.length, 1)
        assert.equal(history.moves[1].variations[0][0].san, "e6")
        assert.equal(history.moves[2].nag, "$1")
        assert.equal(history.moves[2].commentAfter, "Great move!")
        assert.equal(history.moves[2].fen, "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2")
        assert.equal(history.moves[3].from, "b8")
        assert.equal(history.moves[3].to, "c6")
        assert.equal(history.moves[3].san, "Nc6")
        assert.equal(history.moves[3].previous.san, "Nf3")
        assert.equal(history.moves[3].previous.next.san, "Nc6")
        console.log(pgn)
    })
    it("should parse sloppy PGN from https://github.com/shaack/cm-pgn/issues/9", () => {
        const ignored = new Pgn(`[Event "?"]
[Site "?"]
[Date "?"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[ECO "C25"]
[Annotator "?"]
[PlyCount "25"]
[EventDate "?"]
[SourceDate "?"]

1. e4 e5 2. Nc3 Nc6 3. f4 (3.
Bc4 Nf6 (3... Bc5 4. Qg4
Qf6 (4... g6 5. Qf3 Nf6 6. Nge2 d6 7. d3 Bg4 8. Qg3 {[%cal Rc1g5]}) 5. Nd5
Qxf2+ 6. Kd1 Kf8 7. Nh3 Qd4 8. d3 d6 9. Qf3 Bxh3 10. Rf1 Be6 11. c3) 4. d3 Na5
(4... Bb4 5. Nge2 d5 (5... O-O 6. O-O d6 (6... h6 7.
a3 Be7 8. f4) 7. Bg5) 6. exd5 Nxd5 7. O-O
Be6 8. a3 Bxc3 9. bxc3 O-O 10. a4) (4... Bc5 5. f4 d6 6. Nf3 Ng4 (6... Bg4
7. Na4 O-O 8. Nxc5 dxc5 9. O-O Nd4 10. c3 Nxf3+ 11. gxf3
Bh3 12. Rf2 exf4 13. Bxf4) (6... O-O 7. Na4 Bg4 8. Nxc5 dxc5 9. O-O Qd6 10. Qd2
Bxf3 11. gxf3 Rad8 12. Kh1 Nh5 13. fxe5 Nxe5 14. Qg5 Nxc4 15. Qxh5 Ne5 16. f4)
7. Ng5 O-O 8. f5 Nf2 9.
Qh5) 5. Qf3 Nxc4 6. dxc4 Bc5 (6... d6 7. h3 Be6 8. b3 Be7 9. Nge2 O-O 10. O-O)
7. Be3 Bxe3 8. Qxe3 O-O 9. h3 d6 10. b3 Be6 11. Nge2) 3... exf4 (3... d6 4. Nf3 Bg4 5. Bb5
a6 6. Bxc6+ bxc6 7. h3 Bxf3 8. Qxf3) (3... Nf6 4. fxe5 Nxe5 5. d4) (3... Bc5 4.
Nf3 d6 5. Bb5 Nge7 6. Na4) 4. Nf3 g5 (4... d6 5.
d4 g5 6. d5 Ne5 7. Bb5+ Bd7 8. Bxd7+ Nxd7 9. h4 g4 10. Nd4 Qf6 11. Ncb5) 5. h4 
(5. d4 g4 6. Bc4 gxf3 7. O-O 
(7. Qxf3 Qh4+ 8. g3 Nxd4 9. Qf2 Qf6 10. Bxf4 Bb4 11. e5 Qc6
12. O-O-O Bxc3 13. Bxf7+ Kxf7 14. bxc3 Nf3 15. Rhf1) 7... fxg2 (7... Nxd4 8. Bxf4 Bc5 9. Kh1 d6 10. b4 Bb6
11. Nd5 fxg2+ 12. Kxg2 Ne6 13. Qf3) 8. Rxf4) (5. g3 g4 6. Nh4 f3 7. d4 d6
8. Be3 Be7 9. Qd2 Bxh4 10. gxh4 Qxh4+ 11. Bf2 Qh6 12. Qxh6 Nxh6 13. Nd5 Kd7 14. Kd2) 5... g4 6. Ng5 h6 7. Nxf7 Kxf7 8.
d4 d5 (8... f3 9. Bc4+ Kg7 10. gxf3 Be7 11. Be3) 9.
Bxf4 Nf6 10. Nxd5 (10. exd5
Nxd5 (10... Bd6 11. Bxd6 Qxd6 12. dxc6) 11. Bc4 Be6 12. O-O) 10... Nxd5 11. Bc4 Be6 12. exd5 Bxd5 13. O-O *`, {sloppy: true})
    })
})
