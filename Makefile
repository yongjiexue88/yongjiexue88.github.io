default: dev

d:dev
dev:
	hugo server --renderToMemory -DFE

b:build
build:
	hugo --gc --minify --cleanDestinationDir --baseURL "https://yongjiexue88.github.io/"

c: check
check:
	hugo --gc --printPathWarnings --panicOnWarning

.PHONY: default d dev b build c check
