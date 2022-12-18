install:
	npm ci

lint:
	npx eslint .

develop:
	npx webpack serve --open --config webpack.common.js --env mode=dev

build:
	rm -rf dist
	npx webpack --config webpack.common.js --env mode=prod
