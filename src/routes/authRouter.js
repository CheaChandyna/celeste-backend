import { registerController, loginController, logoutController} from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.post("/signup", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;