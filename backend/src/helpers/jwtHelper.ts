import jwt from 'jsonwebtoken'
import { UserModel } from '../models/User'
import Config from '../config'
import { IJwtToken } from './helpersInterfaces'


export function generateToken(user: InstanceType<typeof UserModel>): string {
    const payload = {
        sub: user._id,
        iat: Date.now(),
    }
    return jwt.sign(payload, Config.JWT_SECRET, { expiresIn: '30d' })
}

// Надеюсь это не вызовет проблем
export function verifyToken(token: string): IJwtToken {
    return jwt.verify(token, Config.JWT_SECRET) as IJwtToken
}