import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function userToken(userInfo) {
    const userToken = jwt.sign({exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, title: 'lord_abiter', userid: userInfo.id, username: userInfo.username}, process.env.SECRET_KEY)
    return userToken
}