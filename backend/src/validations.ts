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