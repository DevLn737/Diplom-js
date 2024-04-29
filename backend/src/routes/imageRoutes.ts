import { Router } from "express";
import * as imageController from '../controllers/imageController'
import { authMiddleware } from "../middlewares/authMiddleware"
import handleValidationErrors from '../middlewares/handleValidationErrors';
import { imageGenerationValidation } from '../validations';

export const router = Router();

// Генерируем изображение на основе текстового промта
router.post('/generate', authMiddleware, imageGenerationValidation, handleValidationErrors, imageController.generateImage);
// Получаем посты комьюнити
// router.get('/community', imageController.txt2img);
// Создаём пост для комьюнити
// router.post('/community', authMiddleware, txt2imgValidation, handleValidationErrors, imageController.txt2img);

export default router