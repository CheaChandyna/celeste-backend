import mysql from 'mysql2'
import bcrypt, { compare } from 'bcrypt'
import 'dotenv/config' 

const db = mysql.createPool( {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
} ).promise()

try {
    const [rows] = await db.query("SELECT 1");
    console.log("Connected!");
} catch (error) {
    console.log("Fail to connect!", error);
}
    
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
    const [userInQuestion] = await db.query("SELECT password from users WHERE username = ? ", [username])
        if(userInQuestion.length === 0) return false

    const isItMatch = bcrypt.compare(password, userInQuestion[0].password)
        if(isItMatch) return true
}

export async function getData() {
    const result = await db.query('Select * from users')
    return result
}
