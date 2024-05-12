const model = require("../models/todosModel")

async function CREATE(userId, title, completed){
    try{
        const todoId=await model.createTodo(userId, title, completed);
        return todoId;
    }catch(err){
        throw err;
    }
}

async function ReadAll(userId){
    try{
        const todos=await model.getTodos(userId);
        return todos;
    }catch(err){
        throw err;
    }
}



async function DELETE(id){
    try{
        const result=await model.deleteTodo(id);
        return result;
    }catch(err){
        throw err;
    }
}

async function UPDATE(todo){
    try{
        const returnedTodo=await model.updatedTodo(todo);
        return returnedTodo;
    }catch(err){
        throw err;
    }
}

module.exports =
{
    CREATE, ReadAll, UPDATE, DELETE
}