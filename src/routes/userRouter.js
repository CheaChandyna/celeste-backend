import { getUserById } from '../controllers/userController.js';
import { getMe } from '../controllers/userController.js';
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; //IMPORT our bouncer

const router = express.Router();

// USE the middleware for ALL routes in this file
// This line acts as a guard. Any request to a route defined below this line
// must have a valid token, or it will be rejected.
router.use(authMiddleware);

// --- All routes below this line are now protected ---

// This is the new, secure endpoint for a user to get their OWN profile.
router.get("/profile/me", getMe);

router.get("/user/:id", getUserById);
// router.get("/user", getAllUsers);
// router.put("/user/:id", updateUser);
// router.delete("/user/:id", deleteUser);

export default router;