default: build

build: content _data _includes public 
	eleventy

serve: 
	eleventy --serve

publish: build
	git checkout gh-pages
	rm -rf site &> /dev/null
	mv CNAME CNAME.lazy
	git rm -r --ignore-unmatch *
	mv CNAME.lazy CNAME
	git add -f CNAME
	mv _site site
	git add -f site/*
	git mv -f site/* .
	rm -rf site
	git commit -a -m "Updated blog from main `git log main --abbrev-commit --pretty=oneline | head -1`"
	git push origin gh-pages
	git checkout main

clean:
	@ rm -rf site
