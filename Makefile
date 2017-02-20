default: build

build: blog
	bundle exec jekyll build --source blog --destination _build

serve: build
	bundle exec jekyll serve --source blog --destination _build

clean:
	@ rm -rf _build
