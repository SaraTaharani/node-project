const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json())
const router = express.Router();
const commentsController = require("../controllers/commentsController");

router.route('/:postId')
    .get(async (req, res) => {
        const postId = req.params.postId;
        const comments = await commentsController.ReadAll(postId);
        res.send(comments);
    })

    module.exports = router;