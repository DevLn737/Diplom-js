// Собираем все маршруты
import express from 'express';
import authRoutes from './authRoutes';
import imageRoutes from './imageRoutes';

const router = express.Router();

// Привязываем маршруты из разных файлов
router.use('/auth', authRoutes);
router.use('/images', imageRoutes);

export default router;