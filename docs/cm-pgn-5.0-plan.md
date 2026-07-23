# cm-pgn 5.0 — Umsetzungsplan: Angleichung ans Lichess-Kommentarmodell

## Ziel

Das Datenmodell von cm-pgn an das Modell von Lichess (`chessops` / `scalachess`)
angleichen und als **Major-Version 5.0** veröffentlichen. Bleibt **100% Vanilla
ES6**, kein TypeScript, kein neuer Parser — cm-pgns eigene PEG-Grammatik wird
weiterentwickelt, die Lichess-**Shape** entsteht als Mapping in `History.js`.

## Zielmodell (die neue Shape)

Pro Zug statt drei Einzelstring-Feldern zwei Listen, plus Spielebene:

```
// vorher (4.x)                      // nachher (5.0)
move.commentMove   : string   \
move.commentBefore : string    ┝──▶  move.startingComments : string[]   // vor dem Zug
move.commentAfter  : string   ─────▶ move.comments         : string[]   // nach dem Zug
move.nag           : "$2"     ─────▶ move.nags             : number[]   // z.B. [2, 14]
                                     pgn.gameComment       : string[]   // vor dem 1. Zug (Spielebene)
```

Mapping-Regel:
- `commentMove` + `commentBefore` → `startingComments` (beide stehen vor dem Zug)
- **Ausnahme:** der `commentMove` des **allerersten Zugs der Hauptvariante**
  (Spielanfang) → `pgn.gameComment`, nicht in `startingComments`. Bei
  Variantenanfängen bleibt `commentMove` in `startingComments`.
- `commentAfter` → `comments`
- `nag` (Array von `"$n"`) → `nags` (Array von Zahlen)

Damit verschwindet nebenbei der bekannte `commentMove`-Round-Trip-Bug, weil
`startingComments` konsistent vor dem Zug gerendert wird.

## Änderungen im Detail

### 1. Grammatik `src/grammar/pgn.pegjs`

**a) Mehrfachkommentare als Array.** Aktuell konkateniert die `comments`-Regel
mehrere `{}` zu einem String. Neu:

```pegjs
comments = c:comment whiteSpace? cs:comments? { return cs ? [c].concat(cs) : [c]; }
```

`cm`, `cb`, `ca` sind damit automatisch Arrays (oder `null`).

**b) Move-Objekt** behält vorerst die Feldnamen `commentBefore/commentMove/
commentAfter` (jetzt Arrays) — die Angleichung passiert im History-Mapping, nicht
im Parser. So bleibt die Grammatikänderung minimal.

**c) Optional (eigene Phase): `;`-Zeilenkommentare.** Zweite Alternative in der
`comment`-Regel. Achtung: kollidiert mit der Whitespace-Normalisierung in
`History` (Zeile 34, ersetzt `\n` außerhalb von `{}` durch Space) — die müsste
`;`-Kommentare bis zum Zeilenende ausklammern. Deshalb separat, nicht im
5.0-Kern. Siehe „Scope-Optionen".

### 2. Parser regenerieren

Nach jeder Grammatikänderung `./generate-parser.sh` (braucht `pegjs`, Dev-Dep;
patcht CJS→ES6-Wrapper, macOS-`sed`). Das generierte `src/parser/pgnParser.js`
ist committet.

### 3. `History.js` — `traverse()` (Mapping)

Die drei `if (parsedMove.commentX)`-Blöcke (Zeilen 75-83) ersetzen durch:

```js
// vor dem Zug: commentMove + commentBefore → startingComments
const before = [...(parsedMove.commentMove || []), ...(parsedMove.commentBefore || [])]
// Ausnahme: Spielanfang-Kommentar (top-level, erster Zug) → gameComment
if (parent === null && moves.length === 0 && parsedMove.commentMove) {
    this.gameComment = parsedMove.commentMove
    before.splice(0, parsedMove.commentMove.length) // aus startingComments entfernen
}
if (before.length) move.startingComments = before
if (parsedMove.commentAfter) move.comments = parsedMove.commentAfter
if (parsedMove.nag) move.nags = parsedMove.nag.map(n => parseInt(n.slice(1), 10))
```

`parent === null` unterscheidet die Hauptvariante (top-level) von Varianten
(dort ist `previousMove`/`parent` gesetzt). `this.gameComment` wird nur einmal
gesetzt.

### 4. `History.js` — `render()`

Neu schreiben, aus den neuen Feldern serialisieren, jeder Listeneintrag als
eigenes `{...}`:

```js
// vor dem Zug
if (renderComments && move.startingComments)
    for (const c of move.startingComments) { result += "{" + c + "} "; needReminder = true }
result += move.san + " "
// NAGs
if (renderNags && move.nags) for (const n of move.nags) result += "$" + n + " "
// nach dem Zug
if (renderComments && move.comments)
    for (const c of move.comments) { result += "{" + c + "} "; needReminder = true }
```

Die Reminder-Logik (`13...` nach Kommentar/Variante) bleibt.

### 5. `Pgn.js` — Spielebene-Kommentar

- `this.gameComment` von `this.history` übernehmen/durchreichen (oder direkt als
  `pgn.gameComment`).
- `render()`: `gameComment` als führende `{...}` vor der Zugfolge ausgeben.
- **Edge-Case:** Spiel nur aus Kommentar ohne Züge (`{c} *`) — die Grammatik
  verwirft das aktuell. Optionaler Grammatik-Tweak, um `gameComment` auch ohne
  Züge zu erfassen. Für 5.0 als bekannte Grenze dokumentieren, wenn nicht
  umgesetzt.

### 6. NAG-Umstellung

`move.nag` (`"$2"`) → `move.nags` (`[2]`). Betrifft `traverse` (Mapping) und
`render` (siehe oben). Bewusster Breaking-Change, Teil der Lichess-Angleichung.

## Tests (`test/`, teevi im Browser über `test/index.html`)

- **`TestHistory.js`**: alle `commentBefore/Move/After`-Assertions auf
  `startingComments`/`comments`/`gameComment` umstellen; `nag`→`nags`.
- **`TestParser.js`**: `comments` liefert jetzt Arrays.
- **`TestPgn.js`**: `render()`-Erwartungen anpassen.
- **Neue Round-Trip-Tests** (Kernnutzen von 5.0):
  - `( {Risikoloser war} Nf6 {.} )` → parse → render → identischer Text
    (der alte `commentMove`-Bug).
  - Mehrfachkommentare `move {a} {b}` → `comments: ["a","b"]` → round-trip.
  - Spielanfang-Kommentar → `pgn.gameComment`, nicht `startingComments` des
    1. Zugs; Variantenanfang-Kommentar → `startingComments`.
- Als Referenz-Härtetest die Hmadi–Vadasz-Partie (liegt in
  `cm-pgn-viewer/index.html`).

## Downstream-Migration (Reihenfolge)

1. **cm-pgn 5.0** — obige Änderungen, Tests grün.
2. **cm-chess** — liest die Kommentar-Felder **nicht** (nur Durchreichung),
   also **kein Code-Change**. Nur `package.json`: cm-pgn-Dep auf `^5.0.0`,
   Version-Bump (Major, da sich die durchgereichte Move-Shape ändert:
   3.7.0 → 4.0.0). Testlauf.
3. **cm-pgn-viewer** — `src/NotationRenderer.js` von `commentBefore/commentMove/
   commentAfter` auf `startingComments`/`comments` umstellen (aus Arrays
   rendern); optional `pgn.gameComment` in `PgnViewer` anzeigen; cm-chess-Dep
   bumpen. Browser-Gegencheck mit der Beispielpartie.
4. **chessmail-server** — später bei der Forum-Anbindung; handgeschriebener Code
   liest die Felder nicht, nur gebündelte/`node_modules`-Kopien betroffen
   (Rebuild).

## Versionierung

- cm-pgn: 4.1.2 → **5.0.0**
- cm-chess: 3.7.0 → **4.0.0** (nur Dep-Bump)
- cm-pgn-viewer: 1.0.0 → **1.1.0** (Anpassung an cm-pgn 5)
- CHANGELOG/Migrationsnotiz in cm-pgn mit der Feld-Mapping-Tabelle (oben).

## Scope-Optionen (zu entscheiden)

1. **`nags: number[]`** — empfohlen ja (Teil der „vollen" Angleichung). Alt.:
   `nag` als Einzelwert lassen, kleinerer Bruch.
2. **`;`-Zeilenkommentare** — spec-vollständig, aber Grammatik + Normalisierung
   anpassen. Empfehlung: eigene Phase / 5.1, nicht 5.0.
3. **Kompatibilitäts-Getter** (`get commentAfter()` → `comments?.join(" ")` etc.,
   deprecated) — für externe npm-Nutzer sanfter. Empfehlung: **clean break** +
   klare Migrationsnotiz, da intern nur cm-pgn-viewer betroffen ist; Getter nur,
   falls externe Nutzer geschont werden sollen.
4. **`[%cal]`/`[%csl]`/`[%clk]`/`[%eval]` in Kommentaren** (Pfeile/Uhr/Eval wie
   chessops) — **außerhalb 5.0**, additiv später möglich, da es Struktur
   innerhalb der Kommentar-Strings ist.

## Risiken

- **Grammatik-Regeneration**: `generate-parser.sh` braucht die richtige
  pegjs-Version und den macOS-`sed`-Patch; nach Änderung Parser-Tests zuerst.
- **Whitespace-Normalisierung** (`History` Zeile 34) ist eng mit der
  Kommentar-Struktur verzahnt — bei `;`-Support zwingend mitdenken.
- **Reminder-Logik** in `render()` ist subtil (Zugnummer-Wiederholung nach
  Kommentar/Variante, §8.2.2.2 der Spec) — durch Round-Trip-Tests absichern.
```
