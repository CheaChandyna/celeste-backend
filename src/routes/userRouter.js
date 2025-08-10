import { getUserById } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.get("/user/:id", getUserById);
// router.get("/user", getAllUsers);
// router.put("/user/:id", updateUser);
// router.delete("/user/:id", deleteUser);

export default router;