var express = require('express')
const csv = require('csv-streamify')
const fs = require('fs')
const parser = csv()
var router = express.Router()
var app = express();
// rendering EJS
router.get('/simulator',function(req, res, next) {
    console.log('get /simulator');
    res.render('../view/simulator.ejs');
});

// AJAX get functions
router.get('/getNodeInfo',function(req, res, next) {
    // 노드의 정보가 담겨있는 csv의 입력 값을 읽어서 json 형태로 반환
    const parser = csv({ objectMode: true }, function (err, result) {
        if (err) throw err
        // json 형태로 변환
        var node_info_list = result.map(function(value, index, arr){
            return {lng:Number(value[0]),lat:Number(value[1]),cluster:Number(value[2])}
        }).slice(1)
        
        console.log(node_info_list)
        res.send(node_info_list);    
    })

    var csvFile= './data/input.csv'
    fs.createReadStream(csvFile).pipe(parser);
})

module.exports = router