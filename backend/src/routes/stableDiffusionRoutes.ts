import { Router } from "express";
import * as stableDiffusionController from '../controllers/stableDiffusionController'


export const stableDiffusionRouter = Router();

// Генерируем изображение на основе текстового промта
stableDiffusionRouter.post('/txt2img', stableDiffusionController.txt2img);

// Получаем полезную информацию о модели
// stableDiffusionRouter.get('/model');

// Получаем список доступных моделей
// stableDiffusionRouter.get('/models');

// Очень хочется, но не факт что успею сделать
// Дополняет промпт, посылая его другой нейронной сети
// stableDiffusionRouter.post('/suggestion');
// Возможность писать промты на русском языке, локализация с русского на английский
// stableDiffusionRouter.post('/localize');
// Разнообразная пост-обработка изображения
// stableDiffusionRouter.post('/img2img');
