import { Request, Response } from "express";
import { createImage } from '../helpers/imageHelpers'
import { StatusCodes } from "http-status-codes";

interface IRequestPayload {
    prompt: string,
    enable_hr: boolean,
}

export const generateImage = async (req: Request, res: Response) => {
    try {
        const { prompt, enable_hr }: IRequestPayload = req.body;

        // Я не знаю, как описать возвращаемую структуру из ответа sd.
        const response: any = await createImage({
            prompt,
            enable_hr
        });

        const image = response.data.images[0];
        res.status(StatusCodes.OK).json({ image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: error.status || 'Something went wrong' });
    }
}
