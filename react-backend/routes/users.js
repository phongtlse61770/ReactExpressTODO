const express = require('express');
const AccountService = require('../services/AccountService');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    AccountService.GetAllUser()
        .then(data => res.json({users: data}))
        .catch(next)
});

module.exports = router;
