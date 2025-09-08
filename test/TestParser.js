/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-pgn
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {pgnParser} from "../src/parser/pgnParser.js"

describe('Parser', () => {
    it('should parse complex history without nag', () => {
        const historyString = `1. e4 e6 2. d3 d5 3. Nd2 Nf6 4. g3 {Will man keinen Franzosen auf dem Brett
                haben kann man so in eine Art von königsindischen Angriff übergehen} dxe4 {
                90% aller Spieler die gegen den königsindischen Angriff spielen verlassen sich
                auf eine mehr oder minder massive Bauernwand mit 3 oder mehr Bauern auf der 5.
                Reihe. Hübner zeigt eine Alternative auf und vermeidet eine allzu geschlossene
                Stellung.} 5. dxe4 Bc5 6. Bg2 Nc6 7. Ngf3 e5 {Bis hierhin alles recht normale
                Entwicklungszüge. Mit e5 öffnet Hübner seinem weißfeldrigen Läufer eine schöne
                Diagonale} 8. Qe2 {In seinem eigenen Kommentar gibt Robert Hübner diesen Zug
                schon als Fehler an, da er weniger flexibel ist als 8.0-0, wonach je nach
                Fortsetzung des Gegners auch ein Aufbau mit c3 und Dc2 möglich bleibt} O-O 9.
                O-O a5 {Ich habe diesen Zug nicht richtig verstanden und Jansa ging es wohl
                genauso, da seine Antwort nichts gegen die dahinter liegende Hauptidee
                unternimmt. Meine Vermutung zum Sinn des Zuges war, dass er nach a4 sollte um
                dem Sd2 das Feld b3 zu nehmen und dem Lc5 einen Rückzug auf der Diagonale
                g1-a7 zu ermöglichen ohne einem späteren Bauernvormarsch im Weg zu stehen.
                Diesem Plan baut Jansa vor.} 10. a4 (10. Rd1 {die aggressivere Variante} Qe7
                11. Nc4 Ng4 {schlieslich hat 10.Td1 ja das Feld f2 geschwächt. So nebenher
                deckt man auch den e5 noch einmal.} 12. Be3 Nxe3 13. Nxe3 Bxe3 14. Qxe3 {
                hier sehen ich keinen schwarzen Vorteil. Allerdings ist die Variante vielleicht
                nicht unbeding zwingend.}) 10... b6 {Nach diesem Zug sieht man jetzt die
                eigentliche Idee von a5. Der Lc8 wird auf die Diagonale f1-a6 entwickelt wo er
                dem Weißen sehr lästig wird. Mit 11.c4 könnte man das Problem zwar lösen
                überliese dem Sc6 aber zwei hübsche Einstiegsrouten über b4 und d4} 11. c3 {
                Nimmt dem Springer die besagten Felder und verlässt sich darauf, dass der Sd2
                Unheil lange genug verhindert um sich bequem umgruppieren zu können.} Ba6 12.
                Nc4 {Bedenkt man all die Probleme die Weiß noch durch die freiwillig
                eingegangene Fesselung zu erleiden hat, wären die Einstiegslöcher auf b4 und
                d4 vielleicht noch der kleinere Nachteil gewesen.} Qd7 {Man fühlt sich ein
                wenig unwohl die Dame auf der d-Linie zu lassen wo sie vom weißen Turm
                angegriffen werden kann, aber auf der hellen Diagonale kann die Königin später
                mal auf den Königsflügel übersiedeln.} 13. Nh4 {f5 wäre sicher ein gutes Feld
                für das weiße Pferdchen. Außerdem kann nach einem möglichen Abtausch der
                dunkelfeldrigen Läufer auch f4 spielbar werden} (13. Rd1 {
                schön wenn das möglich wäre, aber..} Bxc4 14. Rxd7 (14. Qxc4 Qxd1+ 15. Qf1
                Qxf1+ 16. Bxf1 Nxe4) 14... Bxe2 {kostet Weiß eine Figur}) 13... Qg4 {
                Hier wird die Dame nicht lange bleiben können weswegen De6 sinnvoller aussieht.
                } 14. Bf3 (14. Qxg4 {hilft dem Weißen nicht wirklich} Nxg4 15. b3 {
                da der Springer weiterhin gefesselt ist und nicht wegziehen kann} Rfd8 {
                und Jansa hätte weiter Probleme den Lc1 oder die Türme ins Spiel zu bringen})
                14... Qe6 15. b3 {nicht nur war der Sc4 nach De6 ein zweites mal angegriffen,
                irgendwann einmal möchte man die eigene Dame ja auch mal von ihren
                Deckungsaufgaben entlasten können} b5 {ein hübsches Manover. Nach dem Abtausch
                auf b5 kann Schwarz mit 17...a4 die Deckung des Springers unterminieren.} 16.
                axb5 Bxb5 17. Rd1 {Jansa entscheidet sich für etwas Initiative und die
                Auflösung der lästigen Fesselung die Qualität zu opfern} a4 18. Rd5 {greift den
                Lc5 an und unterbricht die Diagonale der schwarzen Dame. Hübners taktische
                Schwäche hier ist, dass seine beiden Läufer ungedeckt sind} Nxd5 (18... Qe7 {
                Wenn man denn partout das Opfer ablehnen will} 19. b4 {
                der Läufer kann nicht wegziehen weil dann sein Nachbar auf b5 fällt} Bxc4 20.
                Qxc4 {und Schwarz verliert weiteres Material}) 19. exd5 Qf6 20. b4 {
                etwas überraschend, aber die Alternative ist nicht viel besser} (20. dxc6 {
                die Meisten von uns hätten wohl diesen weitaus näherliegenden Zug gespielt.}
                axb3 21. Rxa8 Rxa8 {der Sc4 ist weiterhin bewegungsunfähig und der schwarze
                Turm hat volle Kontrolle uber die a-Linie. Außerdem ist die Überlastung der
                weißen Dame ein ernstes Problem. Sie ist die alleinige Deckung des Sc4 und z.B.
                nach Vertreibung des Lf3 auch des Feldes f2. Nach 22...g5 und Wegzug des Springers
                käme noch die Deckung des Lf3 dazu. Zu guter Letzt hat man den b3 vor der
                Haustür.}) 20... e4 {ein klasse Zug. Zwei Drohungen sind zu parrieren. 1. das
                offensichtliche exf3 und 2. Dxc3 mit Angriff auf Ta1 und Sc4.} ({wenn man ja
                ohnehin eine Figur hergeben muss warum dann nicht zwei Bauern dafür einsammeln
                } 20... Nxb4 21. cxb4 Bxb4 22. Rb1 {
                und wieder zeigen sich die ungedeckten Leichtfiguren als Schwäche} Qe7 23. d6 {
                nimmt der Läufer fallt sein Partner auf b5, nimmt der c7 verliert der Lb4
                seine Deckung}) 21. Qxe4 {Weiß hat hier vier Moglichkeiten fortzusetzen.
                Jansas Wahl ist vermutlich das Beste} ({ganz schlecht ist} 21. Bxe4 Bxc4 22.
                Qxc4 Qxf2+ 23. Kh1 Qg1#) (21. dxc6 Qxc3 22. Bb2 Qxc4 23. Qxc4 Bxc4 24. bxc5
                exf3 25. Nxf3 {mit der Mehrqualität sollte Schwarz hier gewinnen}) (21. bxc5
                Qxc3 22. Bb2 Qxc4 23. Qxc4 Bxc4 24. dxc6 exf3 25. Nxf3) 21... Rae8 {Fast möchte
                man vergessen, dass zwei von Hübners Figuren hängen, doch seine Drohung ist
                einfach die stärkere} 22. Qg4 (22. Qxe8 {darüber könnte man fast nachdenken,
                wenn jetzt nicht auch der Sc4 ungedeckt bliebe} Rxe8 23. Ne3 (23. dxc6 Bxc4 24.
                bxc5 g5 25. Bxg5 {nach Sg2 wäre nicht nur der Lf3 ungedeckt, Tf1 wäre auch
                matt, da das Pferd dem weißen König sein letztes Fluchtfeld stielt}) 23... Bxe3 24.
                Bxe3 Qxc3 25. Rb1 Ne5) 22... Re1+ 23. Kg2 Ne5 24. Qh5 {
                Weiß ist gezwungen seinen Springer aufzugeben} (24. Nxe5 {
                leider ist das nicht gut, sondern verliert sofort.} Bf1+ 25. Kg1 Bh3#) 24...
                Bxc4 {
                wie verteidigt man sich nun gegen das drohende Matt mit Lf1 gefolgt von Lh3 ?}
                25. Bg5 {der einzige Zug. Nach 25...Lf1+ 26.Kg1 Lh3 könnte man jetzt einfach
                den Turm e1 schlagen} Rxa1 26. Bxf6 Bf1+ 27. Kh1 {mit dem Turm auf a1 statt e1
                wie vorher lässt sich das matt nach Lh3 durch Ld1 verhindern} Nxf3 {
                eliminiert die Kontrolle uber d1} 28. c4 (28. Nxf3 Bh3+ 29. Ng1 Bxf2) 28...
                gxf6 (28... gxf6 29. Qg4+ Kh8 30. Qxf3 (30. Nxf3 Bh3+ 31. Ng1 Bxf2) 30... Bh3+)
                0-1`
        const parsedMoves = pgnParser.parse(historyString.replace(/\s\s+/g, " ").replace(/\n/g, " "))
        assert.equal(parsedMoves[0].length, 57)
    })
})
