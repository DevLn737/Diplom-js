// Собираем все маршруты
import express, { Response } from 'express';
import authRoutes from './authRoutes';
import imageRoutes from './imageRoutes';
import llamaRoutes from './llamaRoutes';

const router = express.Router();

// Привязываем маршруты из разных файлов
router.get('/test', (_, res: Response,) => { res.json({ test: "Маршрут для теста, всё работает👍" }) });
router.use('/auth', authRoutes);
router.use('/images', imageRoutes);
router.use("/llama", llamaRoutes)

export default router;