import authMiddleware from '../middleware/authMiddleware.js';
import { getUserInfoController, updateUserController } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

// must have a valid token, or it will be rejected.
router.use(authMiddleware);

router.get("/users/me", getUserInfoController);
router.put("/user/:id", updateUserController);
// router.get("/user", getAllUsers);
// router.delete("/user/:id", deleteUser);

export default router;