import express from "express";


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({
                message: "Пожалуйста, заполнить все поля регистрации",
            });
        }





        res.status(200).send({
            message: "Пользователь успешно зарегистрирован"
        });
    } catch (error) {

    }








}