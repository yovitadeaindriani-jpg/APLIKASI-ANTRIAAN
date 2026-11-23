import { Router } from 'express';
import { getQueues } from '../controllers/queueController.js';
import { validateQueueQuery } from '../middleware/validateQueueQuery.js';
export const queueRoutes = Router();
queueRoutes.get('/', validateQueueQuery, getQueues);