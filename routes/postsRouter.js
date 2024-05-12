const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
// app.use(express.json())
const router = express.Router();
const postsController = require("../controllers/postsController");


router.route('/:userId')
.get(async (req, res) => {
    const userId = req.params.userId;
    const posts = await postsController.ReadAll(userId);
    res.send(posts);
})
router.route('/:postId')
.delete(async (req, res) => {
    const postId = req.params.postId;
    const posts = await postsController.DELETE(postId);
    res.send(posts);
})


module.exports = router;