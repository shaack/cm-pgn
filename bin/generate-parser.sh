#!/usr/bin/env sh

node_modules/pegjs/bin/pegjs -o src/cm-pgn/generated/parser.js src/grammar/pgn.pegjs
