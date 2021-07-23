# tvsonar

Small web app to browse tv shows from TVmaze.com database.

## Backend

All the commands included in this readme must be executed in the root directory and the tool **make** must be installed. This commands have been tested in linux and windows using *git bash*.

The local environment must comply with the following requirements (as stated in https://laravel.com/docs/8.x/deployment#server-requirements):
+ PHP >= 7.3
+ BCMath PHP Extension
+ Ctype PHP Extension
+ Fileinfo PHP Extension
+ JSON PHP Extension
+ Mbstring PHP Extension
+ OpenSSL PHP Extension
+ PDO PHP Extension
+ Tokenizer PHP Extension
+ XML PHP Extension

The command `make install-api` installs and configures the backend part.

After installation, the command `make run-api` starts the dev server with two endpoints available:
+ http://localhost:8000/api/shows?page=1: This get all the shows from TVmaze.com
+ http://localhost:8000/api/shows/search?q=Wife: This get all the shows which name starts with "Wife" from TVmaze.com

To run the tests execute the command `make test-api`.

## Vue.js frontend

The local environment must have installed the last lts version of Node.js.

The command `make install-client`.

After the installation, the command `make run-api` starts the dev server and the project can be accessed in the url http://localhost:8080.

To run the tests execute the command `make test-client`.

## Known issues

+ The API has no Swagger documentation yet.
+ The backend part has too many files that are not used for this project. These should be removed ideally.
