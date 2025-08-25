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

// const authenticationToken = async() => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ message: "Not logged in" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

//   if (err) return res.status(403).json({ message: "Token invalid or expired" });
//   req.user = user; // user is logged in
//   next();
// });
// }

export default { generateAccessToken, generateReFreshToken };