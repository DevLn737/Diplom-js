import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { authRouter } from './routes/authRoutes'
import { stableDiffusionRouter } from './routes/stableDiffusionRoutes';

// Высрать сначало всё сюда, а потом как будто умный разбить по папочкам
// Настройки дб
mongoose.connect("mongodb://localhost:27017/test").then(() => {
    console.log("MongoDB успешно подключен");
}).catch((err: Error) => {
    console.log(err.message);
});
// Настройки приложения по умолчанию
const port = 8000
const app = express();


app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Маршруты
app.use('/auth', authRouter);
app.use('/sd', stableDiffusionRouter)




app.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}/`);
});