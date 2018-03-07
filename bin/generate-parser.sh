#!/usr/bin/env sh

node_modules/pegjs/bin/pegjs --format globals --export-var parser -o src/cm-pgn/generated/parser.js src/grammar/pgn.pegjs
