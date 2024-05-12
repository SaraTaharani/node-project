const pool =require("../database");

async function getTodos(userId) {
    const sql = 'SELECT * FROM todos WHERE userId=?;';
    const [result] = await pool.query(sql,userId);
    return result[0];
}

async function createTodo(userId, title, completed) {
    try {
        const sql = `INSERT INTO todos (userId, title, completed) values(${userId}, ${title}, ${completed})`;
        const [result] = await pool.query(sql);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteTodo(id) {
    try {
        const sql = 'DELETE FROM todos WHERE id=?';
        const [result] = await pool.query(sql, id);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
}

async function updatedTodo(todo) {
    try {
        const sql = 'UPDATE todos WHERE id=?';
        const [result] = await pool.query(sql, todo.id);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    
    getTodos,
    createTodo,
    updatedTodo,
    deleteTodo
}