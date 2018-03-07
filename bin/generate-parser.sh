#!/usr/bin/env sh

node_modules/pegjs/bin/pegjs --format globals --export-var pgnParser -o src/cm-pgn/generated/pgnParser.js src/grammar/pgn.pegjs
