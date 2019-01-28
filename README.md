# README

## Movie Lister
#### A Rails + React + Heroku App
https://immense-brook-54887.herokuapp.com/

* Endpoints available from backend:

`GET /api/movies/`

`GET /api/movies/:id`

`GET /api/people/`

`GET /api/people/:id`


* Auth Endpoint:

`GET /api/sessions/auth`

* Protected Endpoints (Authorization in header):

`POST /api/movies/`

`PUT /api/movies/:id`

`DELETE /api/movies/:id`

`POST /api/people/`

`PUT /api/people/:id`

`DELETE /api/people/:id`

For now there's no proper Authentication (you can use **VALID_TOKEN** as auth token).

#### Todo:
* **Fix forms involving collections (right now they do work - you can add and delete from collection via forms - but they aren't reactive. You have to go back and forth after submit to see changes)**
* DRY up React code (reuse components - _I was in a hurry so there are a **LOT** of things to improve_)
* ESLint _(again, I was in a hurry :( )_
* Account Auth (using jwt or oauth2 between front and back end)

#### Libs and Frameworks used:
* Rails v5.2.1
* PostgreSQL
* Rspec for tests along with Factorybot, Faker and Database Cleaner

Frontend:
* React v16.7.0
* Axios
* React-Router-Dom
* Semantic-Ui-React
* Node v10.8
* Yarn v1.13
