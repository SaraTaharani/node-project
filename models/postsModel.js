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

async function createPost(userId, title, body) {
    try {
        const sql = `INSERT INTO posts (userId, title, body) values(${userId}, ${title}, ${body})`;
        const [result] = await pool.query(sql);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
}

async function deletePost(id) {
    try {
        const sql = 'DELETE FROM posts WHERE id=?';
        const [result] = await pool.query(sql, id);
        return result[0][0];
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