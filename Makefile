default: build

build: _posts src
	webpack
	bundle exec jekyll build

serve: _posts _drafts
	webpack
	bundle exec jekyll serve --drafts

publish: _posts _drafts
	webpack
	bundle exec jekyll build --drafts
	git checkout gh-pages
	mv CNAME CNAME.lazy
	git rm -r * --ignore-unmatch
	mv CNAME.lazy CNAME
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
