SHELL := bash
PATH  := bin:${PATH}
DATE  := `date '+%Y%m%d'`
PWD   := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
.DEFAULT_GOAL := build

# https://www.gnu.org/software/make/manual/make.html


.PHONY: build
build: src/ \
       static/assets/css/highlight.css
		time npm run build


src/:
		@if [[ ! -d src ]]; then\
			git clone https://github.com/webplatform/docs.git src;\
			cd src;\
			git submodule update --init --recursive;\
			cd ..;\
		fi


static/bower_components/: node_modules/
		node_modules/.bin/bower install


static/assets/css/highlight.css: node_modules/
		cp node_modules/highlight.js/styles/solarized_dark.css static/assets/css/highlight.css


node_modules/: package.json
		yarn install


.PHONY: package
package: build
		find build -type d -name .git -exec rm -rf {} +
		find build -type f -name .git\* -exec rm {} +
		tar cfjv ../docs.tar.bz2 build/


## Use local Node.js reading serve script from package.json 
.PHONY: serve
serve:
		npm run serve


## Build a nginx 1.9+ Docker container for NGINX confiration testing
.PHONY: nginx-extras
nginx-extras:
		docker build --rm --no-cache -t nginx-extras - < config/nginx-extras/Dockerfile


## Build pages using Docker, instead of local Node.js
.PHONY: docker-build
docker-build: src node_modules static/bower_components
		docker run -it --rm -v "${PWD}":/usr/src/app -w /usr/src/app node:4 node build.js

