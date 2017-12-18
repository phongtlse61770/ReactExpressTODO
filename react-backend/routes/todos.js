const express = require('express');
const {check, validationResult} = require("express-validator/check");
const TodoService = require("../services/TodosService");

const router = express.Router();

/* GET todos listing. */
router.get('/', function (req, res, next) {
    TodoService.getAllTodo()
        .then(data => res.json({todos: data}))
        .catch(next)
});

router.get("/:userId",
    [
        //validation
        check("userId").exists(),
        check("userId", "id must be integer").isInt()
    ],
    //processing function
    function (req, res, next) {
        //Get error from validate
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error("Bad request");
            err.status = 400;
            err.errors = errors;
            next(err);
            return;
        }

        const {
            userId
        } = req.params;

        TodoService.getTodo(userId)
            .then(data => res.json({todo: data}))
            .catch(next);
    });

module.exports = router;
