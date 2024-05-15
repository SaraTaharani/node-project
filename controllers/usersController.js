const model = require("../models/usersModel")
const bcrypt = require("bcrypt")
const saltRounds=10;
async function UPDATE(name, username, email, phone, addressCity, addressStreet) {
    try {
        return await model.updateUser( username,name, email, phone, addressCity, addressStreet);
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
        const cryptedPassword = await bcrypt.hash(password, saltRounds)
        const user = await model.getUser(username, cryptedPassword);
        return user;
    } catch (err) {
        throw err;
    }
}

async function CheckIfDoesNotExist(username, password) {
    const result = await model.getExistUser(username,await bcrypt.hash(password,saltRounds));
    if(result)
    {
        return await model.createUser(username,await bcrypt.hash(password,saltRounds))
    }
    return 0;
}

module.exports =
{
    CREATE, ReadById, UPDATE, CheckIfExist, CheckIfDoesNotExist
}