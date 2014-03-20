build:
	@npm install
	@./node_modules/.bin/bower install
	@gulp

clean:
	@rm -rf node_modules bower_components public .tmp

release:
	@make clean
	@make build

.PHONY: build