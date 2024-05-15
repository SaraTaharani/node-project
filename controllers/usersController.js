const model = require("../models/usersModel")
const bcrypt = require("bcrypt")
async function UPDATE(name, username, email, phone, addressCity, addressStreet) {
    try {
        return await model.updateUser(name, username, email, phone, addressCity, addressStreet);
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

async function CheckIfExist(username, password) {
    try {
        const user = await model.getUser(username, password);
        return user;
    } catch (err) {
        throw err;
    }
}

async function CheckIfDoesNotExist(username, password) {
    const result = await model.getExistUser(username, password);
    if(result)
    {
        return await model.createUser(username, password)
    }
    return 0;
}

module.exports =
{
    CREATE, ReadById, UPDATE, CheckIfExist, CheckIfDoesNotExist
}