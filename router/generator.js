var express = require('express')
var router = express.Router()
var app = express();

router.get('/generator',function(req, res, next) {
    console.log('get /generator');
    res.render('../view/generator.ejs');
});
  
module.exports = router