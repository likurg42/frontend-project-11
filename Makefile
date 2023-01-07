install:
	npm ci

lint:
	npx eslint .

develop:
	NODE_ENV=dev npx webpack serve --open --config webpack.common.js

build:
	rm -rf dist
	NODE_ENV=production npx webpack --config webpack.common.js
