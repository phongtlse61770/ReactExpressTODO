const express = require('express');
const {GetUser} = require("../services/AccountService");

const router = express.Router();

/**
 * /login
 */

router.post("/", function (req, res, next) {
    const {
        username,
        password
    } = req.body;

    GetUser(username, password)
        .then(recordSet => {
            if (recordSet.length == 1) {
                res.json({user: recordSet[0]});
            }
        })
        .catch(next);
});

module.exports = router;

