const express = require('express');
const respo = require('../respository');

const router = express.Router();

/* GET users listing. */
router.get('/',function (req, res, next) {
    // res.send('respond with a resource');
    respo.query("select * from Account")
        .then(result => {
            res.status(200);
            res.json(result);
        })
        .catch(next);
    // res.json([{
    //     id: 1,
    //     username: "samsepi0l"
    // }, {
    //     id: 2,
    //     username: "D0loresH4ze"
    // }]);

});

module.exports = router;
