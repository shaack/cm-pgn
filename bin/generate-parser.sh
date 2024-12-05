#!/usr/bin/env sh

node_modules/pegjs/bin/pegjs -o src/parser/pgnParser.js src/grammar/pgn.pegjs
