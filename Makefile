help:				## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install-vue:		## Install frontend app
	@docker build -t tvsonar_client:latest ./tvsonar_client
	@docker run -d -p 8080:80 --name tvsonar_client tvsonar_client:latest

install-api:		## Install backend app
	@docker build -t tvsonar_api:latest ./tvsonar_api
	@docker run -d -p 8000:8000 --name tvsonar_api tvsonar_api:latest

run-api:
	cd tvsonar_api && php artisan serve

run-client:
	cd tvsonar_client && npm run serve

run-app:
	cd tvsonar_api && php artisan serve & cd ../tvsonar_client && npm run serve &

test-api:			## Test the api
	cd tvsonar_api && vendor/bin/phpunit --coverage-html report

test-client:		## Test the frontend client
	cd tvsonar_client && npm run test:unit