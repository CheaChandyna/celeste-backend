import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req, res, next) => {
  // 1. Get the Authorization header from the incoming request.
  const authHeader = req.header('Authorization');

  // 2. If the header doesn't exist, the user isn't authenticated. Deny access.
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // 3. The header format should be "Bearer <token>". We need to split the string
    //    and get only the token part.
    const token = authHeader.split(' ')[1];
    
    // If the token part is missing after splitting, the format is wrong.
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Malformed token.'});
    }

    // 4. Verify the token using the same secret key we used to sign it.
    //    If the token is invalid (wrong secret, expired, etc.), this will throw an error.
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // 5. If the token is valid, the 'decodedPayload' will contain our user info.
    //    We attach this payload to the request object (req.user) so that our
    //    protected route controllers can know who the user is.
    req.user = decodedPayload;
    
    // 6. Everything is good. Pass control to the next middleware or the actual route handler.
    next();
  } catch (error) {
    // This block catches errors from jwt.verify (e.g., token expired, invalid signature)
    res.status(401).json({ message: 'Access denied. Token is invalid or has expired.' });
  }
};

export default authMiddleware;