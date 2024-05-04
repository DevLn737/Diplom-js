// Собираем все маршруты
import express, { Request, Response } from 'express';
import authRoutes from './authRoutes';
import imageRoutes from './imageRoutes';

const router = express.Router();

// Привязываем маршруты из разных файлов
router.get('/test', (_, res: Response,) => { res.json({ test: "Маршрут для теста, всё работает👍" }) });
router.use('/auth', authRoutes);
router.use('/images', imageRoutes);

export default router;