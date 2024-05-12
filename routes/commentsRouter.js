const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json())
const router = express.Router();
const commentsController = require("../controllers/commentsController");

router.route('/')
    .get(async (req, res) => {
        const id = req.params.postId;
        const comments = await commentsController.ReadAll(id);
        res.send(comments);
    })

    module.exports = router;