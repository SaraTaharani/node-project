const pool = require("../database");
const bcrypt = require("bcrypt")
const saltRounds=10;

//בעיה בשליפת הנתונים 
async function getUserFullDetails(userId) {
    const sql = 'SELECT id,name,username,email,phone,city,street FROM users u natural  join  addresses  WHERE u.id=?';
    const [result] = await pool.query(sql, [userId]);
    return result[0];
}
//עבדיקה האם קיים משתמש
async function getUser(username, cryptedPassword) {
    const sql = 'SELECT userId, name, username, email, phone, city, street FROM passwords p, users u , addresses a WHERE password=?  and username=? and u.addressId=a.id;'
    const [result] = await pool.query(sql, [cryptedPassword, username]);
    if (result.length > 0) {
        return result[0]; 
    } 
    else {
       throw new Error("err");
    }
}
//בדיקה אם יוסר צריך להרשם
async function getExistUser(username, cryptedPassword) {
    const sql = ' SELECT userId, name, username, email, phone, city, street FROM passwords , users u , addresses a WHERE password=?  and username=? and u.addressId=a.id;'
    const [result] = await pool.query(sql, [cryptedPassword, username]);
    if (result.length > 0) {
        return false;
    } 
    else {
       return true;
    }
}

async function createUser(username, cryptedPassword) {
    try {
        const sql = `INSERT INTO users (username) values(?)`;
        const [resultUser] = await pool.query(sql,[username]);
        const userId = resultUser[0][0];
        console.log(userId)
        const sqlPassword = `INSERT INTO passwords (userId, password) values(?, ?)`;
        const [result] = await pool.query(sqlPassword,[userId,cryptedPassword]);
        return userId;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateUser(username, name, email, phone, addressCity, addressStreet) {
    try {
        const sqlAddress = `INSERT INTO addresses (city, street) values(?, ?)`;
        const [resultAddress] = await pool.query(sqlAddress,[addressCity, addressStreet]);
        const addressId = resultAddress[0].insertId;
        const sql = `UPDATE users SET name=?,email=?, phone=?, addressId=? WHERE username=?`;
        const [result] = await pool.query(sql,[name, email, phone, addressId, username]);
        return result.insertId;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUserFullDetails,
    createUser,
    updateUser,
    getUser,
    getExistUser
}