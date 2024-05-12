const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
// app.use(express.json())
const router = express.Router();
const postsController = require("../controllers/postsController");
const commentsRouter = require("./commentsRouter")
// app.use('/:postIdd/comments', commentsRouter);

router.route('/')
    .get(async (req, res) => {
        const posts = await postsController.ReadAll();
        res.send(posts);
    })
    .post(async (req, res) => {
        const post = req.body;
        const response = await postsController.CREATE(post.userId, post.title, post.body)
        res.send(await postsController.ReadById(response.insertId));
    });

    router.route('/:userId')
    .get(async (req, res) => {
        const userId = req.params.userId;
        const todos = await postsController.ReadAll(userId);
        res.send(todos);
    })
    .put(async (req, res) => {
        const id = req.params.id;
        const post = req.body;
        const response = await postsController.UPDATE(post.userId, post.title, post.body)
        res.send(await postsController.ReadById(id));
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        const response = await postsController.DELETE(id);
        res.send();
    });


module.exports = router;