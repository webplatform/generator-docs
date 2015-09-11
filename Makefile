SHELL := bash
PATH := bin:${PATH}
DATE := `date '+%Y%m%d'`
THIS_DIR:=$(shell pwd)

build: src/ node_modules/ static/assets/css/highlight.css
		time npm run build


src:
		@if [[ ! -d src ]]; then\
			git clone https://github.com/webplatform/docs.git src;\
			cd src;\
			git submodule update --init --recursive;\
			cd ..;\
		fi


static/assets/css/highlight.css: node_modules/
		cp node_modules/highlight.js/styles/solarized_dark.css static/assets/css/highlight.css


node_modules: package.json
		npm install


rsync:
		rsync -az --delete --progress --exclude=".cache" --exclude=".git" build/ staging.wpdn:/srv/code/docs/dist/


nas:
		rsync -az --delete --progress --exclude=".cache" --exclude=".git" build/ /Volumes/web/webplatform/


serve:
		npm run serve


.PHONY: build
