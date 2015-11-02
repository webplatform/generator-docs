SHELL := bash
PATH := bin:${PATH}
DATE := `date '+%Y%m%d'`


build: src/ node_modules/ static/bower_components/ static/assets/css/highlight.css
		time npm run build


src:
		@if [[ ! -d src ]]; then\
			git clone https://github.com/webplatform/docs.git src;\
			cd src;\
			git submodule update --init --recursive;\
			cd ..;\
		fi

static/bower_components/: node_modules/
		node_modules/.bin/bower install

static/assets/css/highlight.css: node_modules
		cp node_modules/highlight.js/styles/solarized_dark.css static/assets/css/highlight.css


node_modules/: package.json
		npm install


rsync: build
		rsync -az --delete --progress --exclude=".git" build/ upstream-docs1.staging.wpdn:/srv/webapps/docs/build/
		rsync -az config/nginx/ upstream-docs1.staging.wpdn:/etc/nginx/docs/


nas:
		rsync -a --delete --progress --exclude=".git" build/ /Volumes/web/webplatform/


serve:
		npm run serve


.PHONY: build
