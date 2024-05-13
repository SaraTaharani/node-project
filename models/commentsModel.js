const pool =require("../database");


async function getComments(postId) {
    const sql = 'SELECT * FROM comments WHERE postId=?';
    const [result] = await pool.query(sql, postId);
    return result;
}

async function createComment(postId, name, email,body) {
    try {
        const sql = `INSERT INTO comments (postId, name, email, body) values(${postId}, ${name}, ${email}, ${body})`;
        const [result] = await pool.query(sql);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteComment(id) {
    try {
        const sql = 'DELETE FROM comments WHERE id=?';
        const [result] = await pool.query(sql, id);
        return result[0];
    }
    catch (err) {
        console.log(err);
    }
}

async function updatedComment(commentId,comment) {
    try {
        const sql = 'UPDATE comments SET postId = ?, name = ?, email = ?, body = ? WHERE id = ?';
        const [result] = await pool.query(sql, [comment.postId, comment.name, comment.email,comment.body,  commentId]);
        return result[0];
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getComments,
    createComment,
    deleteComment, updatedComment
}