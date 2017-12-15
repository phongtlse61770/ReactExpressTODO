const express = require('express');
const {check, validationResult} = require("express-validator/check");
const sql = require('../respository');

const router = express.Router();

/* GET todos listing. */
router.get('/', function (req, res, next) {
    sql.query("select * from Todo")
        .then(result => {
            res.status(200);
            res.json({
                todos: result.recordsets
            });
        })
        .catch(next)
});

router.get("/:id", [check("id").exists(),check("id","id must be integer").isInt()], function (req, res, next) {
    //validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.mapped()})
    }
    //query
    sql.query("select * from todo where id = @id", req.params)
        .then(result => {
            // res.status(200);
            res.json({
                todos: result.recordsets
            });
        })
        .catch(next)
});

module.exports = router;
