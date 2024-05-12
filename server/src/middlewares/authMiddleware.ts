import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../helpers/jwtHelpers";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // Получаем jwt token из заголовка Authorization
        // ! Может прилететь просто undefined, необходимо обработать
        console.log(req.headers.authorization);
        
        if (req.headers?.authorization === undefined) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Ошибка аутентификации" })
            
        const token = req.headers?.authorization.split(" ")[1] == "undefined" || !req.headers?.authorization ? null : req.headers?.authorization.split(" ")[1];

        // Проверяем что токен есть
        if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Ошибка аутентификации" })
        // Проверяем токен и получаем декодированный токен в случае успеха
        const decoded = verifyToken(token)
        // Прикрепляем токен к request
        req.userId = decoded.sub

        next()
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Ошибка аутентификации" })
    }
}