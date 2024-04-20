import mongoose from "mongoose";
import { isEmail } from "validator"
// TODO: типизировать
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    images: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
        default: []
    }
}, { timestamps: true })



export const UserModel = mongoose.model("User", UserSchema)

// Описываем все методы взаимодействия с пользователем
export const getUsers = () => UserModel.find();
export const getUserByUsername = (username: string) => UserModel.findOne({ username });
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => UserModel.create(values);
export const deleteUserById = (id: string) => UserModel.deleteOne({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);