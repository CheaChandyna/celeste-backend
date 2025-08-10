import { createUser, compareCredentials } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", compareCredentials)

export default router;