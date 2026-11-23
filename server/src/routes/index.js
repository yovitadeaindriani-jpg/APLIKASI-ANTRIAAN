import { Router } from 'express';
import { healthRoutes } from './healthRoutes.js';
import { queueRoutes } from './queueRoutes.js';
export const routes = Router();
routes.use('/health', healthRoutes);
routes.use('/queues', queueRoutes);