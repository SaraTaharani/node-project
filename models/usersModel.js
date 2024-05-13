const pool = require("../database");


//בעיה בשליפת הנתונים 
async function getUserFullDetails(userId) {
    const sql = 'SELECT id,name,username,email,phone,city,street FROM users u natural  join  addresses  WHERE u.id=?';
    const [result] = await pool.query(sql, [userId]);
    return result[0];
}
//עבדיקה האם קיים משתמש
async function getUser(username, cryptedPassword) {
    const sql = ' SELECT userId, name, username, email, phone, city, street FROM passwords , users u , addresses a WHERE password=?  and username=? and u.addressId=a.id;'
    const [result] = await pool.query(sql, [cryptedPassword ,username]);
    console.log(result[0])
    return JSON.stringify(result[0]);
}

async function createUser(username, cryptedPassword) {
    try {
        const sql = `INSERT INTO users (username) values(${username})`;
        const [resultUser] = await pool.query(sql);
        const userId = resultUser[0][0];
        const sqlPassword = `INSERT INTO passwords (userId, password) values(${userId}, ${cryptedPassword})`;
        const [result] = await pool.query(sqlPassword);
        return userId;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateUser(name, username, email, phone, addressCity, addressStreet) {
    try {
        const sqlAddress = `INSERT INTO addresses (city, street) values(${addressCity}, ${addressStreet})`;
        const [resultAddress] = await pool.query(sqlAddress);
        const addressId = resultAddress[0][0];
        const sql = `INSERT INTO users (name, username, email, phone, addressId) values(${name}, ${username}, ${email}, ${phone}, ${addressId})`;
        const [result] = await pool.query(sql);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUserFullDetails,
    createUser,
    updateUser,
    getUser
}