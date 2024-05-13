const pool =require("../database");

async function getPosts(userId) {
    const sql = 'SELECT id,title FROM posts WHERE userId=?';
    const [result] = await pool.query(sql, userId);
    return result;
}

async function getPost(id) {
    const sql = 'SELECT * FROM posts WHERE id=?';
    const [result] = await pool.query(sql, id);
    return result;
}

async function createPost(userId, title, body)
 {
    try {
        const sql = `INSERT INTO posts (userId, title, body) values(?,?,?)`;
        const [result] = await pool.query(sql,[userId,title,body]);
         const newPostId = result.insertId;
         const selectSql = `SELECT * FROM posts WHERE id = ?`;
         const [selectedPost] = await pool.query(selectSql, [newPostId]);
         const insertedPost = selectedPost[0];
         return insertedPost;
    }
    catch (err) {
        console.log(err);
    }
}

async function deletePost(id) {
    try {
        const sqlComment = 'DELETE FROM comments WHERE postId=?' 
        const sqlPost= ' DELETE FROM posts WHERE id=?';
        const [resultComment] = await pool.query(sqlComment, id);
        const [resultPost] = await pool.query(sqlPost, id);
        console.log(resultPost[0])
        // const resultPost_parse=JSON.parse(resultPost)

        return resultPost[0];
    }
    catch (err) {
        console.log(err);
    }
}

async function updatedPost(post) {
    try {
        const sql = 'UPDATE posts WHERE id=?';
        const [result] = await pool.query(sql, post.id);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getPost,
    getPosts,
    createPost,
    updatedPost,
    deletePost
}