import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (request, response, next) => {
  const token = request.cookies?.access_token;
  
  if (!token)
    return response.status(401).json({ message: 'Access denied. No token provided.' });
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    request.user = decoded; //request.user.id
    next();
  } catch (error) {
    response.status(402).json({ message: 'Unauthorized.' });
  }
};

export default authMiddleware;