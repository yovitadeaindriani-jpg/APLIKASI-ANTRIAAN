/* Route health check. Sengaja terpisah dari route antrean: ia bukan bagian
dari domain antrean, dan harus tetap menjawab meski seluruh sisanya rusak. */
import { Router } from "express";
import { getHealth } from "../controllers/healthController.js";
export const healthRoutes = Router();
healthRoutes.get("/", getHealth);
