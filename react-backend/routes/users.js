const express = require('express');
const sql = require('../respository');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    sql.query("select * from Account")
        .then(result => {
            res.status(200);
            res.json({
                users: result.recordset
            });
        })
        .catch(next)
});

module.exports = router;
