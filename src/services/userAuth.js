import mongoose from 'mongoose';
import users from '../Schema/users.model.js';
import bcrypt from 'bcrypt'
import 'dotenv/config'

mongoose.connection

export async function createUser(username, password) {
    const hashPassord = await bcrypt.hash(password, 10)

    const [result] = await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashPassord])
    return result.insertId
}

export async function getUserAndId(userInQuestion) {
    const [result] = await db.query("SELECT id, username FROM users WHERE username = ?", [userInQuestion])
    return result[0]
}

export async function getUserById(IdInQuestion) {
    const [resultRow] = await db.query("SELECT id, username FROM users WHERE id = ?", [IdInQuestion])
    return resultRow[0]
}

export async function isUsernameExists(username) {
    return db.query("SELECT username from users WHERE username = ? ", [username]).then(([isExist]) => {
        if (isExist.length > 0)
            return true
        else
            return false
    })
}

export async function compareCredentials(username, password) {
    const userInQuestion = await users.findOne({ UserName: username }).select('HashPassword');
    if (!userInQuestion) return false;

    // Await bcrypt.compare and use the correct property name
    const isItMatch = await bcrypt.compare(password, userInQuestion.HashPassword);
    return isItMatch;
}