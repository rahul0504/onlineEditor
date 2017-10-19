/* server.js */

var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  res.render('pad');
});
app.get('/(:id)', function(req, res) {
  res.render('pad');
});

// get sharejs dependencies
var sharejs = require('share');

var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
console.log("-sddddddd",err,db)
  if(err) throw err;
  var options = {
    db: {type: 'mongo', client: MongoClient,dbName : "myDB",
      hostname: '127.0.0.1',
      port: 27017,
      mongoOptions: {auto_reconnect: true},
      user: null,
      password: null},
    dbName : "MyDb",
    hostname: '127.0.0.1',
    port: 27017,
    mongoOptions: {auto_reconnect: true},
    client: null,
    user: null,
    password: null
  };

// attach the express server to sharejs
sharejs.server.attach(app, null); //pass options , i passed null because by default, option have localhost config(in constructor)
});


// listen on port 8000 (for localhost)
var port = process.env.PORT || 8000;
app.listen(port);