#!/usr/bin/env sh

node_modules/pegjs/bin/pegjs --format globals --export-var pgnParser -o src/cm-pgn/parser/pgnParser.js src/grammar/pgn.pegjs
