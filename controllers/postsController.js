const model = require("../models/postsModel")
async function CREATE(userId,title,body){
    try{
        return await model.createPost(userId,title,body);
    }catch(err){
        throw err;
    }
}

async function ReadAll(userId){
    try{
        const posts=await model.getPosts(userId);
        return posts;
    }catch(err){
        throw err;
    }
}

async function ReadById(id){
    try{
        return model.getPost(id);
    }catch(err){
        throw err;
    }
}

async function DELETE(id){
    try{
        const result=await model.deletePost(id);
        return result;
    }catch(err){
        throw err;
    }
}

async function UPDATE(post){
    try{
        return model.updatedPost(post);
    }catch(err){
        throw err;
    }
}

module.exports =
{
    CREATE, ReadAll,ReadById, UPDATE, DELETE
}