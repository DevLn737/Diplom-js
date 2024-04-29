import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware"
import { registerValidation, loginValidation } from '../validations'
import handleValidationErrors from '../middlewares/handleValidationErrors';
import * as authController from '../controllers/authController'

const router = Router()

router.post("/register", registerValidation, handleValidationErrors, authController.register);
router.post("/login", loginValidation, handleValidationErrors, authController.login);
router.get("/me", authMiddleware, authController.me);


export default router






