const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const path = require('path');
const cors = require('cors');
const postsRouter= require("./routes/postsRouter")
const usersRouter= require("./routes/usersRouter");
const commentsRouter= require("./routes/commentsRouter");
const todosRouter= require("./routes/todosRouter");
app.use(cors());
app.use('/users',usersRouter)
app.use('/posts',postsRouter)
app.use('/comments',commentsRouter)
app.use('/todos',todosRouter)
app.listen(3000,()=>{console.log("app is listenning in 3000")});

