const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json())
const router = express.Router();
const commentsController = require("../controllers/commentsController");
router.route('/')
    .post(async (req, res) => {
        const comment=req.body;
        const comment_result = await commentsController.CREATE(comment.postId, comment.name, comment.email,comment.body);
        res.send(comment_result);
    })
router.route('/:postId')
    .get(async (req, res) => {
        const postId = req.params.postId;
        const comments = await commentsController.ReadAll(postId);
        res.send(comments);
    })
    router.route('/:commentId').
    put(async (req, res) => {
        const commentId = req.params.commentId;
        const  returnId= await commentsController.UPDATE(commentId,req.body);
        res.send(returnId);
    })
    .delete(async (req, res) => {
        const commentId = req.params.commentId;
        const comment = await commentsController.DELETE(commentId);
        res.send(comment);
    })
    
    module.exports = router;