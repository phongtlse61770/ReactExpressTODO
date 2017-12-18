var express = require('express');
var path = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    console.log("should not show this");
    res.sendFile(path.resolve(__dirname,'../public/app/app.html'));
});

module.exports = router;
