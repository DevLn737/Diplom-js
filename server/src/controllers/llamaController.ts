import { StatusCodes } from 'http-status-codes'
import { Request, Response } from "express";
import Config from "../config"

interface IChatDataRequest {
    model: string,
    messages: Array<Object>
    stream: boolean,
    keep_alive: string,
}

export const chat = async (req: Request, res: Response) => {
    try {
        const data: IChatDataRequest = req.body;


        const response = await fetch(Config.LLAMA_BASE_URL + "/api/chat", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });


        if (response.status === StatusCodes.OK) {
            res.status(StatusCodes.OK).json(await response.json())
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}