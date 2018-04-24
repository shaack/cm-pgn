# cm-pgn

## Parser for PGNs (Portable Game Notation)

This is as **ES6 Module for parsing and rendering of PGNs** ([Portable Game Notation](https://de.wikipedia.org/wiki/Portable_Game_Notation)).

The API is similar to `history()` of [chess.js](https://github.com/jhlywa/chess.js), but this module **supports variants, nags and comments** in the pgn.

We used the nice grammar file of [PgnViewerJS](https://github.com/mliebelt/PgnViewerJS) of [mliebelt](https://github.com/mliebelt) to create the parser.

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
assert.equal(4, pgn.history.length);
assert.equal(pgn.history[0].san, "e4");
assert.equal(pgn.history[1].variations.length, 1);
assert.equal(pgn.history[1].variations[0][0].san, "e6");
assert.equal(pgn.history[2].nag, "$1");
assert.equal(pgn.history[2].commentAfter, "Great move!");
assert.equal(pgn.history[3].from, "b8");
assert.equal(pgn.history[3].to, "c6");
```

## Development

This module uses [PEG.js](https://pegjs.org/) for parser generation. The parser (`pgnParser.js`)
in `src/cm-pgn/parser/` is generated from the grammar file `src/grammar/pgn.pegjs`.

To recreate the parser after modification of `src/grammar/pgn.pegjs`, run `bin/generate-parser.sh`.

### Future development

With ".toString()" we already have the function to produce PGNs. There are missing some convenience functions like "move()" and "addVariation()" to create the structure of a PGN. For me, it is important to make the API most similar to chess.js, because everyone knows chess.js. Another important thing is to just implement things which are _really_ needed, trying to keep the code small and easy.

## Testing

Run tests with `npm test`.

## External Links

- [Wikipedia Portable_Game_Notation](https://en.wikipedia.org/wiki/Portable_Game_Notation)
- [Portable Game Notation Specification and Implementation Guide](http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm)

