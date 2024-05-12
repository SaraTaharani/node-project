const model = require("../models/commentsModel")

async function CREATE(postId, name, email, body){
    try{
        return model.createComment(postId, name, email, body);
    }catch(err){
        throw err;
    }
}

async function ReadAll(postId){
    try{
        return model.getComments(postId);
    }catch(err){
        throw err;
    }
}

// async function ReadById(id){
//     try{
//         return model.getComment(id);
//     }catch(err){
//         throw err;
//     }
// }

async function DELETE(id){
    try{
        return model.deleteComment(id);
    }catch(err){
        throw err;
    }
}

async function UPDATE(user){
    try{
        return model.updatedComment(user);
    }catch(err){
        throw err;
    }
}

module.exports =
{
    CREATE, ReadAll, UPDATE, DELETE
}