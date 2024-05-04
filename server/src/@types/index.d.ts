// Declaration Merging, расширяем интерфейс Request, чтобы прикрепить к нему userId
declare namespace Express {
    export interface Request {
        userId?: string;
    }
}