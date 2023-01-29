#!/usr/bin/env bash
make build

while inotifywait ./src/*.md ./src/**/*.html; do
  make build
done
