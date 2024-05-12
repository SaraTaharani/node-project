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
        return model.deleteTodo(id);
    }catch(err){
        throw err;
    }
}

async function UPDATE(todo){
    try{
        return model.updatedTodo(todo);
    }catch(err){
        throw err;
    }
}

module.exports =
{
    CREATE, ReadAll, UPDATE, DELETE
}