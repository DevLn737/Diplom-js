import { Router } from "express";
import * as llamaController from '../controllers/llamaController'
import { authMiddleware } from "../middlewares/authMiddleware"

export const router = Router();

router.post('/chat', authMiddleware, llamaController.chat);

export default router