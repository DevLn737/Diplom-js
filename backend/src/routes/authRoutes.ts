import { Router, Request, Response } from "express";
import * as authController from '../controllers/authController'
import { authMiddleware } from "../middlewares/authMiddleware"
import { registerValidation, loginValidation } from '../validations'
import handleValidationErrors from '../middlewares/handleValidationErrors';

export const authRouter = Router()

authRouter.post("/register", registerValidation, handleValidationErrors, authController.register);
authRouter.post("/login", loginValidation, handleValidationErrors, authController.login);
authRouter.post("/me", authMiddleware, authController.me);
// Реализуется на клиенте
// authRouter.post("/logout", authController.logout);







