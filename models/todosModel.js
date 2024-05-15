const pool = require("../database");

async function getTodos(userId) {
    const sql = 'SELECT * FROM todos WHERE userId=?';
    const [result] = await pool.query(sql, [userId]);
    return result;
}

async function createTodo(userId, title, completed) {
    try {
        console.log(userId)
        const sql = `INSERT INTO todos (userId, title, completed) values(?,?,?)`;
         const [result] = await pool.query(sql,[userId,title,completed]);
         const newTodoId = result.insertId;
         const selectSql = `SELECT userId, title, completed FROM todos WHERE id = ?`;
         const [selectedTodo] = await pool.query(selectSql, [newTodoId]);
        
         return selectedTodo[0];
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteTodo(id) {
    try {
        const sql = 'DELETE FROM todos WHERE id=?';
        const [result] = await pool.query(sql, id);
        console.log(`the result ${result}`);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
}

async function updatedTodo(todoId, todo) {
    try {
        const sql = 'UPDATE todos SET userId = ?, title = ?, completed = ? WHERE id = ?';
        const [result] = await pool.query(sql, [todo.userId, todo.title, todo.completed, todoId]);
        return result[0];
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