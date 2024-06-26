// Класс описывающий конфигурацию приложения
import path from 'path';
import dotenv from 'dotenv';

// Базовая директория backend
export const BASEDIR = path.resolve(__dirname, '../');
dotenv.config({path: path.resolve(BASEDIR, ".env")});


export default class Config {
    public static readonly JWT_SECRET: string = process.env.JWT_SECRET;
    public static readonly SD_BASE_URL: string = process.env.SD_BASE_URL;
    public static readonly LLAMA_BASE_URL: string = process.env.LLAMA_BASE_URL;
    // DATABASE
    public static readonly DB_NAME: string = process.env.DB_NAME;
    public static readonly DB_HOST: string = process.env.DB_HOST || 'mongodb';
    public static readonly DB_PORT: string = process.env.DB_PORT || '27017';
    // !Костыль
    public static readonly SITE_URL: string = process.env.SITE_URL || 'http://localhost:4000/';
    //STATIC
    public static readonly staticDir: string = path.resolve(BASEDIR, 'public');
}
