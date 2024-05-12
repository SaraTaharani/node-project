const model = require("../models/usersModel")
const bcrypt = require("bcrypt")
async function UPDATE(name, username, email, phone, addressCity, addressStreet) {
    try {
        return model.updateUser(name, username, email, phone, addressCity, addressStreet);
    } catch (err) {
        throw err;
    }
}
async function CREATE(username, cryptedPassword) {
    try {
        return model.createUser(username, cryptedPassword);
    } catch (err) {
        throw err;
    }
}


async function ReadById(id) {
    try {
        return model.getUserFullDetails(id);
    } catch (err) {
        throw err;
    }
}

async function CheckIfExist(username,password) {
    let user=null;
    try {
        user =await model.getUser(username,password);
    } catch (err) {
        throw err;
    }
//     if (!user)
//     return false;
// return true;
return user;
}



module.exports =
{
    CREATE, ReadById, UPDATE,CheckIfExist
}