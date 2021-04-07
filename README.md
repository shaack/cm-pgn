# cm-pgn

## Parser for PGNs (Portable Game Notation)

This is as **ES6 Module for parsing and rendering of PGNs** ([Portable Game Notation](https://de.wikipedia.org/wiki/Portable_Game_Notation)).

The API is similar to `history()` of [chess.js](https://github.com/jhlywa/chess.js), but this module **supports variants, nags and comments** in the pgn.

We used the nice grammar file from [PgnViewerJS](https://github.com/mliebelt/PgnViewerJS) of [mliebelt](https://github.com/mliebelt) to create the parser.

## Install

`npm install cm-pgn`

## Usage

Use the `Pgn` class as JS Module:

```html

<script type="module">
    import {Pgn} from "./PATH/TO/cm-pgn/src/Pgn.js";
    // parse pgn
    const pgn = new Pgn(`[Site "Berlin"]
[Date "1989.07.02"]
[White "Haack, Stefan"]
[Black "Maier, Karsten"]

1. e4 e5 (e6) 2. Nf3 $1 {Great move!} Nc6 *`);
</script>
```

## Api

After parsing a PGN you can access all moves and move variants via the Array `pgn.history`.
The header fields are stored in the Map `pgn.header`.

```javascript
const history = pgn.history
assert.equals(4, history.moves.length)
assert.equals(history.moves[0].san, "e4")
assert.equals(history.moves[1].variations.length, 1)
assert.equals(history.moves[1].variations[0][0].san, "e6")
assert.equals(history.moves[2].nag, "$1")
assert.equals(history.moves[2].commentAfter, "Great move!")
assert.equals(history.moves[2].fen, "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2")
assert.equals(history.moves[3].from, "b8")
assert.equals(history.moves[3].to, "c6")
```

## Development

This module uses [PEG.js](https://pegjs.org/) for parser generation. The parser (`pgnParser.js`)
in `src/cm-pgn/parser/` is generated from the grammar file `src/grammar/pgn.pegjs`.

To recreate the parser after modification of `src/grammar/pgn.pegjs`, run `bin/generate-parser.sh`.

## Testing

[Run unittests](https://shaack.com/projekte/cm-pgn/test/tests.html)

## External Links

- [Wikipedia Portable_Game_Notation](https://en.wikipedia.org/wiki/Portable_Game_Notation)
- [Portable Game Notation Specification and Implementation Guide](http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm)

