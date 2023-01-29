default: build

SOURCES := $(wildcard src/*.md)
PAGES := $(SOURCES:%.md=%.html)

build: $(PAGES)

watch:
	. ./watch.sh

%.html: %.md _posts ./src/templates/base.html
	pandoc --from=markdown+raw_html+markdown_in_html_blocks \
        --to=html -s -o $@ $< \
        --template ./src/templates/base.html


publish: _posts _drafts
	node_modules/.bin/webpack
	bundle exec jekyll build --drafts
	git checkout gh-pages
	@ rm -rf site &> /dev/null
	mv CNAME CNAME.lazy
	git rm -r --ignore-unmatch *
	mv CNAME.lazy CNAME
	git add -f CNAME
	mv _site site
	git add -f site/*
	@ rm -rf assets
	git mv -f site/* .
	@ rm -rf site
	git commit -a -m "Updated blog from main `git log main --abbrev-commit --pretty=oneline | head -1`"
	git push origin gh-pages
	git checkout main

update:
	nix flake lock --update-input nixpkgs
	bundle update
	gem update
	yarn upgrade

clean:
	@ rm -rf _site
	@ rm -rf site
