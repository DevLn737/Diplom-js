// sub: подрузамевается _id пользователя в mongodb
// exp: unix timestamp в миллисекундах
export interface IJwtToken {
    sub: string,
    exp: number,
}