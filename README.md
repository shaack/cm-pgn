# cm-pgn Parser for PGNs (Portable Game Notation), supports Variants, Comments and Nags

This is as ES6 Module for parsing and rendering of PGNs ([Portable Game Notation](https://de.wikipedia.org/wiki/Portable_Game_Notation)).

The API is similar to `history()` of [chess.js](https://github.com/jhlywa/chess.js), but this module supports variants, nags and
comments in the pgn.

I used the nice grammar file of [PgnViewerJS](https://github.com/mliebelt/PgnViewerJS) to create the parser. Many thanks to
[mliebelt](https://github.com/mliebelt)!

## Usage

You must include [chess.js](https://github.com/jhlywa/chess.js) and the generated parser (see below) in your HTML page. Both are
not available as ES6 Modules and therefore must be included the traditional way.

```html
<script src="../node_modules/chess.js/chess.min.js"></script>
<script src="../src/cm-pgn/parser/pgnParser.js"></script>
```

Then just use the Pgn class as JS Module:

```html
<script type="module">
    import {Pgn} from "./src/cm-pgn/Pgn.js";
    // parse pgn
    const pgn = new Pgn(`[Site "Berlin"]
                         [Date "1989.07.02"]
                         [White "Haack, Stefan"]
                         [Black "Maier, Karsten"]
                         1. e2-e4 e7e5 (e6) 2. Nf3 $1 {Great move!} Nc6`);
    // render the pgn
    console.log(pgn.toString());
    // render the header only
    console.log(pgn.header.toString());
    // render the history only
    console.log(pgn.history.toString());
</script>
```

## Api

After parsing a PGN you can access all moves and move variants via the Array `pgn.history`.
The header fields are stored in the Map `pgn.header`.

```javascript
const pgn = new Pgn();
pgn.parseHistory("1. e2-e4 e7e5 (e6) 2. Nf3 ! {Great move!} Nc6");
Test.assertEquals(4, pgn.history.length);
Test.assertEquals("e4", pgn.history[0].san);
Test.assertEquals(1, pgn.history[1].variations.length);
Test.assertEquals("e6", pgn.history[1].variations[0][0].san);
Test.assertEquals("$1", pgn.history[2].nag);
Test.assertEquals("Great move!", pgn.history[2].commentAfter);
Test.assertEquals("b8", pgn.history[3].from);
Test.assertEquals("c6", pgn.history[3].to);
console.log(pgn.history);
```

## Development

This module uses [PEG.js](https://pegjs.org/) for parser generation. The parser (`pgnParser.js`)
in `src/cm-pgn/parser/` is generated from the grammar file `src/grammar/pgn.pegjs`.

To recreate the parser after modification of `src/grammar/pgn.pegjs`, run `bin/generate-parser.sh`.

## External Links

- [Wikipedia Portable_Game_Notation](https://en.wikipedia.org/wiki/Portable_Game_Notation)
- [Portable Game Notation Specification and Implementation Guide](http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm)

