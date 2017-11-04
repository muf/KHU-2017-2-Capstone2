var express = require('express')
var drone = require('../private/drone')

const csv = require('csv-streamify')
const fs = require('fs')

const parser = csv()

var router = express.Router()
var app = express();

// # Default routing   //////////////////////////////////////////////////////
router.get('/',function(req, res, next) {
  console.log('get /');
  res.redirect('/drone')
  });

  router.get('/main',function(req, res, next) {
    console.log('get /sim');
    res.redirect('/sim');
  });

router.get('/drone',function(req,res){
  // mydrone = new drone();
  // mydrone.init();
  res.render("../view/drone.ejs")
})

// # multi_point_map ////////////////////////////////////////////////////////
router.get('/multi_point_map',function(req, res, next) {
  console.log('get /multi_point_map');
  res.render('../view/multi_point_map.ejs');
});

// # sim  ///////////////////////////////////////////////////////////////////
router.get('/sim',function(req, res, next) {
  console.log('get /simulation');
  res.render('../view/simulation.ejs');
  });
  // # sim > Get data
  router.get('/getClusteredCsvData',function(req, res, next) {
    
      const parser = csv({ objectMode: true }, function (err, result) {
        if (err) throw err
        // our csv has been parsed succesfully
        result.forEach(function (line) { console.log(line) })
        res.send(result);
        
      })

      var dataPath =  '/Users/junghyun.park/workspace/git/DRONEAP/KHU-2017-2-Capstone2/data/'
      // var dataPath = 'C:/Users/Phigaro/Desktop/Cap2/KHU-2017-2-Capstone2/data/'
      var csvFileName = 'Output4.csv'
      var csvPath = dataPath + csvFileName;
      fs.createReadStream(csvPath).pipe(parser);
  })


// # Error check  ////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
  console.log("error check");
  console.log(err);
})

module.exports = router