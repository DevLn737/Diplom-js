import mongoose from "mongoose";


// name: Название изображения(рандомное имя)
// url : Путь до изображения(Если сохранили в профиль)
// description: Общая информация о генерации(пример: prompt, neg-prompt)
// tags: "Теги, нужны для поиска"
// owner: id пользователя, которому принадлежит изображение (required пока что опционально)
// TODO: типизировать
const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String],
        required: true,
        lowercase: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

export const ImageModel = mongoose.model('Image', ImageSchema)