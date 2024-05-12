const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
// app.use(express.json())
const router = express.Router();
const todosController = require("../controllers/todosController");
router.route('/')
    .post(async (req, res) => {
        const todo=req.body;
        const todoId = await todosController.CREATE(todo.userId, todo.title, todo.completed);
        console.log(todoId)
        res.send(todoId);
    })


    router.route('/:userId')
    .get(async (req, res) => {
        const userId = req.params.userId;
        const todos = await todosController.ReadAll(userId);
        res.send(todos);
    })
    module.exports = router;