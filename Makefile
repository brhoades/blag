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
	git commit -a -m "Updated blog from master `git log master --abbrev-commit --pretty=oneline | head -1`"
	git push origin gh-pages
	git checkout master

clean:
	@ rm -rf _site
	@ rm -rf site
