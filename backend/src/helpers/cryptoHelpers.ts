import bcrypt from 'bcrypt'
import crypto from 'crypto'

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}

export function MD5fromBase64(base64String: string): string {
    const buffer = Buffer.from(base64String, 'base64');
    const hash = crypto.createHash('md5')
    hash.update(buffer);
    return hash.digest('hex');
}