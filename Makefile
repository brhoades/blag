default: build

build: content _data _includes public 
	eleventy

serve: 
	eleventy --serve

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
	yarn upgrade

clean:
	@ rm -rf _site
	@ rm -rf site
