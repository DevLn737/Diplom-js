import { Router } from "express";
import * as imageController from '../controllers/imageController'
import { authMiddleware } from "../middlewares/authMiddleware"
import handleValidationErrors from '../middlewares/handleValidationErrors';
import { imageGenerationValidation, imageDataValidation } from '../validations';

export const router = Router();

// Генерируем изображение на основе текстового промта
router.post('/generate', imageGenerationValidation, handleValidationErrors, imageController.generateImage);

// Общественная галерея
router.get('/community', imageController.getCommunityImages);
router.post('/community', authMiddleware, imageDataValidation, handleValidationErrors, imageController.postCommunityImage);

// Личная галерея
router.post('/save');
router.get('/user');

export default router