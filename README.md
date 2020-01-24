# Web Dev Toolkit API Documentation

### GET Get All Resources
https://web-dev-toolkit-api.herokuapp.com/api/resources
https://web-dev-toolkit-api.herokuapp.com/api/resources

Example Request
Get All Resources
curl --location --request GET 'https://web-dev-toolkit-api.herokuapp.com/api/resources'


### GET Get Resources by Type ID
https://web-dev-toolkit-api.herokuapp.com/api/resources/byType/1
https://web-dev-toolkit-api.herokuapp.com/api/resources/byType/1

Example Request
Get Resources by Type ID
curl --location --request GET 'https://web-dev-toolkit-api.herokuapp.com/api/resources/byType/1'


### GET Get All Types
https://web-dev-toolkit-api.herokuapp.com/api/types

Example Request
Get All Types
curl --location --request GET 'https://web-dev-toolkit-api.herokuapp.com/api/types'


### POST Login
https://web-dev-toolkit-api.herokuapp.com/api/auth/login
https://web-dev-toolkit-api.herokuapp.com/api/auth/login

HEADERS
Content-Typeapplication/json
BODY raw
username: webdev@webdevtoolkit.com,
password: Password35!

Example Request
Login
curl --location --request POST 'https://web-dev-toolkit-api.herokuapp.com/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw 'username: webdev@webdevtoolkit.com,
password: Password35!'


### POST Submit User
https://web-dev-toolkit-api.herokuapp.com/api/users
https://web-dev-toolkit-api.herokuapp.com/api/users

HEADERS
Content-Typeapplication/json
BODY raw
username: webdev2@webdevtoolkit.com,
password: Password35!,
name: Web Dev 2

Example Request
Submit User
curl --location --request POST 'https://web-dev-toolkit-api.herokuapp.com/api/users' \
--header 'Content-Type: application/json' \
--data-raw 'username: webdev2@webdevtoolkit.com,
password: Password35!,
name: Web Dev 2'
