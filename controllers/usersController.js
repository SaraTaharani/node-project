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
    
    try {
        console.log(`username ${username} ${password}`)
        const user =await model.getUser(username,password);
        console.log(`controller ${user}`)
        return user;
    } catch (err) {
        throw err;
    }
//     if (!user)
//     return false;
// return true;

}



module.exports =
{
    CREATE, ReadById, UPDATE,CheckIfExist
}