#!/usr/bin/env bash
make build

FILES=(./src/*.md ./src/**/*.html ./_posts/*.html ./_posts/*.md)

if [ $(which inotifywait) ]; then 
  while inotifywait $FILES; do
    make build
  done
elif [ $(which fswatch) ]; then
  fswatch $FILES "make" "build"
else
  echo "unknown platform"
  exit 1
fi

