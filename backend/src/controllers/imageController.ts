import fs from 'fs/promises'
import path from 'path'
import { Request, Response } from "express";
import { createImage } from '../helpers/imageHelpers'
import { StatusCodes } from "http-status-codes";
import { MD5fromBase64 } from "../helpers/cryptoHelpers";
import { ImageModel, ImageType } from "../models/Image";
import { BASEDIR } from '../config'
import { getDateNow } from '../helpers/dateHelpers'

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

        const image = response.images[0];
        res.status(StatusCodes.OK).json({ image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: error.status || 'Something went wrong' });
    }
}


export const getCommunityImages = async (req: Request, res: Response) => {
    try {
        const posts = await ImageModel.find({ type: ImageType.Public }).populate({ path: 'owner', select: 'username' });
        res.status(StatusCodes.OK).json(posts)
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const postCommunityImage = async (req: Request, res: Response) => {
    try {
        const { description, tags, image } = req.body;
        const userId = req.userId;

        const md5Hash = MD5fromBase64(image)

        const isImageExist = await ImageModel.findOne({ name: md5Hash });
        if (isImageExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({ err: 'Изображение уже существует' });
        }


        const directoryPath = path.resolve(BASEDIR, "public", "uploads", getDateNow());
        try {
            await fs.access(directoryPath);
        } catch (error) {
            await fs.mkdir(directoryPath, { recursive: true });
        }


        const savePath = path.resolve(directoryPath, md5Hash + ".png");
        const relativePath = path.relative(path.resolve(BASEDIR, "public"), savePath);
        await fs.writeFile(savePath, image, 'base64');


        const newImage = new ImageModel({
            name: md5Hash,
            url: "http://localhost:4000/" + relativePath,
            description,
            tags,
            type: ImageType.Public,
            owner: userId,
        });
        await newImage.save();


        res.status(StatusCodes.OK).json({ image: newImage });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: error.status || 'Что-то пошло нет так' });
    }
}
