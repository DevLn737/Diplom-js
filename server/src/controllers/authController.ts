import {createUser, getUserByEmail, getUserById, getUserByUsername} from '../models/User';
import {verifyPassword, hashPassword} from "../helpers/cryptoHelpers"
import {generateToken} from "../helpers/jwtHelpers"
import {StatusCodes} from 'http-status-codes'
import {Request, Response} from "express";


export const register = async (req: Request, res: Response) => {
    const {email, username, password} = req.body;
    try {
        // Валидация уникальности email и username
        // TODO: 2 запроса в бд не очень, придумать другой способ обработки уникальных значений
        const emailExists = await getUserByEmail(email)
        const usernameExists = await getUserByUsername(username)
        // For test purpose
        // if (emailExists) return res.status(400).json({ msg: "Такой email уже существует", })
        // if (usernameExists) return res.status(400).json({ msg: "Такой username уже существует", })
        if (emailExists || usernameExists) return res.status(400).json({msg: "Такой пользователь уже существует",})

        //Хэшируем пароль
        const passwordHashed = await hashPassword(password)

        // Описываем пользователя в документе
        const doc = {
            email,
            username,
            passwordHash: passwordHashed
        }

        // Создаём пользователя и преобразуем в js объект
        await createUser(doc)
        // const createdUser = await createUser(doc)
        // const createdUserObject = createdUser.toObject();

        // Разбираем объект убирая поле passwordHash
        // const {passwordHash, ...userData} = createdUserObject;

        // Возвращаем созданного пользователя
        res.status(201).json({msg: "Пользователь успешно зарегистрирован"});
    } catch (err) {
        console.error(err);
        res.json({err: err.message})
    }
}

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    try {
        const user = await getUserByUsername(username);
        // Проверяем существует ли пользователь
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({msg: "Неверное имя пользователя или пароль",})

        //Проверяем, что пароль верный
        const isPasswordCorrect = await verifyPassword(password, user.passwordHash);
        if (!isPasswordCorrect) return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Неверное имя пользователя или пароль",})

        // Генерируем jwt токен
        const token = generateToken(user)

        res.status(StatusCodes.OK).json({token, msg: "Успешная авторизация",})
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err: error.message})
    }
}

export const me = async (req: Request, res: Response) => {
    const userId = req.userId

    const user = await getUserById(userId)

    // Разбираем объект убирая поле passwordHash
    const {passwordHash, ...userData} = user.toObject();
    res.status(StatusCodes.OK).json({userData})
}