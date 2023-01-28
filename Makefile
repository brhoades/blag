default: build

build: index.html
	# pandoc --from=markdown+raw_html+markdown_in_html_blocks --to=html -s -o main.html main.md
	# pandoc --from=markdown+raw_html+markdown_in_html_blocks --to=html -s -o slides.html slides.md -V revealjs-url=https://revealjs.com --template=template-revealjs.html --standalone --section-divs -V theme=black -V transition=linear --no-highlight
	# node_modules/.bin/webpack --mode development

index.html: src/main.md _posts
	pandoc --from=markdown+raw_html+markdown_in_html_blocks --to=html -s -o main.html src/main.md --template src/templates/base.html

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
