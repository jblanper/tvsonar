help:					## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install-client:			## Install frontend app
	cd tvsonar_client && npm install

install-api:			## Install backend app
	cd tvsonar_api && composer install

run-api:				## Run api
	cd tvsonar_api && php artisan serve

run-client:				## Run frontend client
	cd tvsonar_client && npm run serve

test-api:				## Test the api
	cd tvsonar_api && vendor/bin/phpunit --coverage-html report

test-client:			## Test the frontend client
	cd tvsonar_client && npm run test:unit