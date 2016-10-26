SHELL := bash
PATH := bin:${PATH}
DATE := `date '+%Y%m%d'`
PWD  :=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))


.PHONY: build
build: src node_modules static/bower_components static/assets/css/highlight.css
		time npm run build


src:
		@if [[ ! -d src ]]; then\
			git clone https://github.com/webplatform/docs.git src;\
			cd src;\
			git submodule update --init --recursive;\
			cd ..;\
		fi


static/bower_components: node_modules
		node_modules/.bin/bower install


static/assets/css/highlight.css: node_modules
		cp node_modules/highlight.js/styles/solarized_dark.css static/assets/css/highlight.css


node_modules: package.json
		npm install


.PHONY: package
package: build
		find build -type d -name .git -exec rm -rf {} +
		find build -type f -name .git\* -exec rm {} +
		tar cfjv ../docs.tar.bz2 build/


.PHONY: serve
serve:
		npm run serve


.PHONY: docker
docker: src node_modules static/bower_components
		docker run -it --rm -v "${PWD}":/usr/src/app -w /usr/src/app node:4 node build.js

