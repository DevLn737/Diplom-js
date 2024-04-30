import mongoose from "mongoose";
import { MD5fromBase64 } from '../helpers/cryptoHelpers'

export enum ImageType {
    Public = 'public',
    Private = 'private',
}
// name: Название изображения(рандомное имя).
// url : Путь до изображения(Если сохранили в профиль).
// description: Общая информация о генерации(пример: prompt, neg-prompt).
// tags: "Теги, нужны для поиска".
// type: Public или Private, доступ только у владельца или может просматривать кто угодно.
// md5Hash: md5 хэш изображения. Используется для предотвращения дубликатов и имени изображения(опционально).
// owner: id пользователя, которому принадлежит изображение (required пока что опционально).
const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [{ type: String }],
        required: true,
        lowercase: true,
        default: []
    },
    type: {
        type: String,
        enum: Object.values(ImageType),
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

// Создание текстового индекса для поля tags
ImageSchema.index({ tags: 'text' });

export const ImageModel = mongoose.model('Image', ImageSchema)




