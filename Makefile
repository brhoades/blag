default: build

build: _posts js
	bundle exec jekyll build

stage: _posts _drafts js
	bundle exec jekyll build --drafts --destination _stage

serve: _posts _drafts js
	bundle exec jekyll serve --drafts --incremental

publish: _posts _drafts js
	bundle exec jekyll build --drafts
	git checkout gh-pages
	git rm -r * --ignore-unmatch
	cp -R _site site
	git add site/*
	git mv site/* .
	rmdir site
	git commit -a
	git push origin gh-pages
	git checkout master

clean:
	@ rm -rf _site
	@ rm -rf images/*.pdf
