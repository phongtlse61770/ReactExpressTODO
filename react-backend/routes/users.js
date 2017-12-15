const express = require('express');
const respo = require('../respository');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    respo.query("select * from Account")
        .then(result =>{
            res.status(200);
            res.header
            res.json(result);
        })
        .catch(next)
});

module.exports = router;
