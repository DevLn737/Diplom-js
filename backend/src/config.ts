// Класс описывающий конфигурацию приложения
import path from 'path';
import dotenv from 'dotenv';

// Базовая директория backend
export const BASEDIR = path.resolve(__dirname, '../');
dotenv.config({ path: path.resolve(BASEDIR, ".env") });


export default class Сonfig {
    public static readonly JWT_SECRET: string = process.env.JWT_SECRET;
    public static readonly DB_URI: string = process.env.DB_URI;
    public static readonly SD_BASE_URL: string = process.env.SD_BASE_URL;

    public static readonly staticDir: string = path.resolve(BASEDIR, 'public');
}
