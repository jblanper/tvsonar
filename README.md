# tvsonar

Small web app to browse tv shows from TVmaze.com database.

## Backend

All the commands must be executed in the root directory. The tool **make** must be installed for the installation process.

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

## Vue.js frontend

The local environment must have installed the last lts version of Node.js.

The command `make install-client`.

After the installation, the command `make run-api` starts the dev server and the project can be accessed in the url http://localhost:8080.

## Known issues

+ When the user's query does not retrieve any result from TVmaze.com, the page does no alert the user of this and just shows the loading animation. In this case, the user can delete the query word to retrieve the shows from the index.
+ The backend part has too many files that are not used for this project. This should be removed ideally.
