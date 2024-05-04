import { body } from "express-validator";

export const registerValidation = [
    body("email", "Неверный формат почты").isEmail(),
    body("password", "Минимальная длина пароля 5 символов").isLength({ min: 5 }),
    body("username", "Укажите корректное имя пользователя").isLength({ min: 3, max: 100 }),
]

export const loginValidation = [
    body("username", "Укажите корректное имя пользователя").isLength({ min: 3, max: 100 }),
    body("password", "Минимальная длина пароля 5 символов").isLength({ min: 5 }),
]

// На данный момент, валидируется только необходимое
export const imageGenerationValidation = [
    body("prompt", "Укажите корректный prompt").isString(),
    body("enable_hr", "enable_hr должно быть boolean значением").isBoolean().optional(),
]


export const imageDataValidation = [
    body('image', 'Некорректный формат изображения').isBase64(),
    body("description", "Укажите корректное описание").isString(),
    // До нормальной реализации системы тегов
    body("tags", "Укажите корректные тег(и)").isArray().default([]).optional(),
]