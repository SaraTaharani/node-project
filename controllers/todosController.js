const model = require("../models/todosModel")

async function CREATE(userId, title, completed){
    try{
        return model.createTodo(userId, title, completed);
    }catch(err){
        throw err;
    }
}

async function ReadAll(userId){
    try{
        return model.getTodos(userId);
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