// load node modules
var express = require('express')

// sub app require
var simulator_router = require('./router/simulator')
var generator_router = require('./router/generator')
var index_router = require('./router/index')

// module require
var path = require('path');
var bodyParser = require('body-parser');
var conf = require('./conf').get(process.env.NODE_ENV);

// make instances
var app = express()


// on application


// set application


// use application
app.use(express.static(path.join(__dirname, 'public'))); // static default path to public ex) /css == ... expressJS/public/css
app.use(bodyParser.json()); // parse body of response to json 
app.use(bodyParser.urlencoded({ extended: false })); // parse the text as url encoded data. [false]:parse only once. [true]:parse every time (?????)

// use error check
app.use(function(err, req, res, next) {
  console.log("ERROR : APP.JS");
  console.log("MSG: "+err);
})

// connect sub apps
app.use('/', index_router) // sub app for normal services
app.use('/', simulator_router) // sub app for normal services
app.use('/', generator_router) // sub app for normal services

// listen application
app.listen(conf.server.port, function(){
  console.log("Recovering APSP Application Running on %s port", conf.server.port);
});




