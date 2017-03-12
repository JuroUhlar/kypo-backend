# Backend REST API for kypo data visualization app

To run:

* download the source code or clone the repository
* npm install
* node index.js

Server runs on localhost:5000

# API

Good tool for trying out the API is [Postman](https://www.getpostman.com/)

GET http://localhost:5000/events

* return JSON of all events in the database

GET http://localhost:5000/events?level=2

* return JSON of all events in the seconds level

GET http://localhost:5000/events?level=1&event=Game started

* return JSON of all events in the start-game events in the first level

POST http://localhost:5000/event
* headers
** content type: application/json; charset=utf-8
* body
** {"ID": "77777","timestamp": "2016-04-07 06:41:09","logical_time": "99:99:99","level": "65","event": "TEST"}
* enters new event into Database



