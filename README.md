# cm-pgn

## Parser for PGNs (Portable Game Notation)

This is as **ES6 Module for parsing and rendering of PGNs** ([Portable Game Notation](https://de.wikipedia.org/wiki/Portable_Game_Notation)).

The API is similar to `history()` of [chess.js](https://github.com/jhlywa/chess.js), but this module **supports variations, nags and comments** in the pgn.

I used the grammar file from [PgnViewerJS](https://github.com/mliebelt/PgnViewerJS) of [mliebelt](https://github.com/mliebelt) to create the parser.

## Install

`npm install cm-pgn`

## Usage

Use the `Pgn` class as JS Module:

```html

<script type="module">
    import {Pgn} from "./PATH/TO/cm-pgn/src/Pgn.js"
    // parse pgn
    const pgn = new Pgn(`[Site "Berlin"]
[Date "1989.07.02"]
[White "Haack, Stefan"]
[Black "Maier, Karsten"]

1. e4 e5 (e6) 2. Nf3 $1 {Great move!} Nc6 *`)
</script>
```

## Pgn constructor

`constructor(pgnString = "", props = {})`

if you set `{ sloppy: true }` in props, some non-standard move notations
will be accepted. See also [.move(move, options)](https://github.com/jhlywa/chess.js/blob/master/README.md#movemove--options-) from chess.js.

## Data structure

The `pgn` has a `pgn.header` and a `pgn.history`.

### pgn.header

The header holds the PGN header elements in the key value object `tags`.

```js
pgn.header.tags = {
    Site: "Berlin",
    Date: "1989.07.02",
    White: "Haack, Stefan",
    Black: "Maier, Karsten"
}
```

### pgn.history

The moves are stored in an array. Every element of that array has the following structure

```js
pgn.history.moves[i] = {
    color: "w", // the moving color
    fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", // the fen after that move
    flags: "b", // the flags, like described below
    from: "e2", // the square from
    next: {color: "b", from: "e7", to: "e6", flags: "n", piece: "p", /*…*/}, // a pointer to the next move 
    piece: "p", // the piece type 
    ply: 1, // the ply number
    previous: undefined, // a pointer to the previous move
    san: "e4", // the move in SAN notation
    to: "e4", // the square to
    uci: "e2e4", // the move in UCI notation
    variation: (4) [{/*…*/}, {/*…*/}, {/*…*/}, {/*…*/}], // a pointer to the begin of the current variation
    variations: [] // all variations starting with that move
}
```

#### pgn.history.moves[i].flags

- 'n' - a non-capture
- 'b' - a pawn push of two squares
- 'e' - an en passant capture
- 'c' - a standard capture
- 'p' - a promotion
- 'k' - kingside castling
- 'q' - queenside castling

#### pgn.history.moves[i].piece

- 'p' - pawn
- 'n' - knight
- 'b' - bishop
- 'r' - root
- 'q' - queen
- 'k' - king

#### Examples

```js
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
assert.equal(history.moves[3].uci, "b8c6")
assert.equal(history.moves[3].san, "Nc6")
assert.equal(history.moves[3].previous.san, "Nf3")
assert.equal(history.moves[3].previous.next.san, "Nc6")
```

## Development

This module uses [PEG.js](https://pegjs.org/) for parser generation. The parser (`pgnParser.js`)
in `src/cm-pgn/parser/` is generated from the grammar file `src/grammar/pgn.pegjs`.

To recreate the parser after modification of `src/grammar/pgn.pegjs`, run `bin/generate-parser.sh`.

## Testing

[Run the unit tests](https://shaack.com/projekte/cm-pgn/test)

## External Links

- [Wikipedia Portable_Game_Notation](https://en.wikipedia.org/wiki/Portable_Game_Notation)
- [Portable Game Notation Specification and Implementation Guide](http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm)

