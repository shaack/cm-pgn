#!/usr/bin/env sh

node_modules/pegjs/bin/pegjs -o src/parser/pgnParser.js src/grammar/pgn.pegjs

# convert it to a ES6 export
sed -i '' '/module.exports = {/,/};/d' src/parser/pgnParser.js

echo 'export class pgnParser {
  static parse(history, options) {
    return peg$parse(history, options)
  }
}' >> src/parser/pgnParser.js

