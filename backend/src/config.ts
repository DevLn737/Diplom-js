// Класс описывабщий конфигурацию приложения
export default class Config {
    public static readonly JWT_SECRET: string = process.env.JWT_SECRET;
    public static readonly DB_URI: string = process.env.DB_URI;
}
