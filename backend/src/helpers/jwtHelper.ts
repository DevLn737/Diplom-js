import jwt from 'jsonwebtoken'
import { UserModel } from '../models/User'
import Config from '../config'


// sub: подрузамевается _id пользователя в mongodb
// exp: unix timestamp в миллисекундах
interface IJwtToken {
    sub: string,
    exp: number,
}

export function generateToken(user: InstanceType<typeof UserModel>): string {
    const payload = {
        sub: user._id,
    }
    return jwt.sign(payload, Config.JWT_SECRET, { expiresIn: '30d' })
}

// Надеюсь это не вызовет проблем
export function verifyToken(token: string): IJwtToken {
    return jwt.verify(token, Config.JWT_SECRET) as IJwtToken
}