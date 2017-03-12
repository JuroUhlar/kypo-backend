var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require("./database.js");



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());


var events = require('./all-events');

// MAKE EJS our view engine
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

// app.get('/events-from-file', function(req, res) {
//   console.log(req.url);
//   console.log(req.body);
//   res.json(events);
//   res.end();
// });

app.get('/events', function(req, res) {
  console.log("\nGET");
  console.log(req.url);
  console.log("Request body: " + JSON.stringify(req.body));
  database.getEvents(req,res);
});


app.post('/event', function(req, res) {
  console.log("\nPOST");
  console.log(req.url);
  console.log("Request body: " + JSON.stringify(req.body));
  database.addEvent(req, res);
});





app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  // console.log(database.getAllEvents());
});


