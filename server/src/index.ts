import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import routes from './routes'
import Config from './config';

// Настройки дб
mongoose.connect(`mongodb://${Config.DB_HOST}:${Config.DB_PORT}/${Config.DB_NAME}`).then(() => {
    console.log("MongoDB успешно подключен");
}).catch((err: Error) => {
    console.log(err.message);
});

// Настройки приложения по умолчанию
const port = 4000;
const app = express();

app.use(cors());

// app.use(cors({
//     origin: ["http://localhost", "http://localhost:5173", "http://146.255.188.218:5173"],
// }));
app.use(morgan('common'));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '50mb', }));
app.use(bodyParser.json());
app.use(express.static(Config.staticDir));

app.use('/api', routes);


app.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}/`);
});