var express = require('express')
var router = express.Router()
var app = express();

router.get('/',function(req, res, next) {
  console.log('get /');
  res.redirect('/main')
});

router.get('/main',function(req, res, next) {
  console.log('get /main');
  res.redirect('/simulator');
});

app.use(function(err, req, res, next) {
  console.log("error check");
  console.log(err);
})

module.exports = router