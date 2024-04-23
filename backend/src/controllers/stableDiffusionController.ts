import { Router, Request, Response } from "express";
import { ITxt2ImgRequest, txt2imgRequest } from '../helpers/stableDiffusionHelper'
import { isBase64 } from "validator";
import { StatusCodes } from "http-status-codes";

import fs from 'fs';

export const txt2img = async (req: Request, res: Response) => {
    const payload = req.body;
    try {
        // Я пока не знаю, как описать возвращемую структуру из ответа sd.
        const r: any = await txt2imgRequest(payload)
        const base64Image = r.data.images[0];

        // For test purpose
        fs.writeFile('image.png', base64Image, 'base64', () => { })

        res.status(StatusCodes.OK).json({ image: base64Image })
    } catch (error) {
        // Только в этому случае, такой catch блок
        console.error(error);
        //! http status code
        res.status(error.status).json({ err: error.code })
    }
}
