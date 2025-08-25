import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const generateAccessToken = async(userInfo) => {
    const payload = { id: userInfo.id, username: userInfo.username ,email: userInfo.email };
    // const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
    const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
    return token
}

export const generateReFreshToken = async(userInfo) => {
    const payload = { id: userInfo.id, username: userInfo.username ,email: userInfo.email };
    const token = await jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: "1d" });
    return token
}

export default { generateAccessToken, generateReFreshToken };