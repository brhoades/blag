default: build

build: _posts latex
	bundle exec jekyll build

stage: _posts _drafts latex
	bundle exec jekyll build --drafts --destination _stage

serve: _posts _drafts latex
	bundle exec jekyll serve --drafts --incremental

latex: images/markov/markov-chain.tex
	@latexmk images/markov/markov-chain.tex images/markov/markov-chain.pdf
	@convert images/markov/markov-chain.pdf images/markov/markov-chain.png
	@rm images/markov/markov-chain.pdf

clean:
	@ rm -rf _site
	@ rm -rf images/*.pdf
