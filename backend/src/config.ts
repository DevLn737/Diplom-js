// Класс описывающий конфигурацию приложения
import path from 'path';
import dotenv from 'dotenv';

// Базовая директория backend
const BASEDIR = path.resolve(__dirname, '../');
dotenv.config({ path: path.resolve(BASEDIR, ".env") });


export default class Config {
    public static readonly JWT_SECRET: string = process.env.JWT_SECRET;
    public static readonly DB_URI: string = process.env.DB_URI;
}
