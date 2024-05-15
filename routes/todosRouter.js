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
        console.log(todo)
        const todoId = await todosController.CREATE(todo.userId, todo.title, todo.completed);
        res.send(todoId);
    })


    router.route('/:userId')
    .get(async (req, res) => {
        const userId = req.params.userId;
        const todos = await todosController.ReadAll(userId);
        res.send(todos);
    })
    router.route('/:todoId')
    .delete(async (req, res) => {
        const todoId = req.params.todoId;
        const todos = await todosController.DELETE(todoId);
        res.send(todos);
    })
    router.route('/:todoId')
    .put(async (req, res) => {
        const todoId = req.params.todoId;
        const  returnId= await todosController.UPDATE(todoId,req.body);
        res.send(returnId);
    })
    module.exports = router;