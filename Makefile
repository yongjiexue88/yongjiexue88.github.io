default: dev

d:dev
dev:
	bash scripts/build.sh server --renderToMemory -DFE

b:build
build:
	bash scripts/build.sh --gc --minify --cleanDestinationDir --baseURL "https://www.yongjiexue.io/"

c: check
check:
	bash scripts/build.sh --gc --printPathWarnings --panicOnWarning

.PHONY: default d dev b build c check
