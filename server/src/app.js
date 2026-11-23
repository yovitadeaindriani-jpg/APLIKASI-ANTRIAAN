import express from "express";
import { routes } from "./routes/index.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
export function createApp() {
  const app = express();
  /* Membaca body JSON menjadi req.body. Minggu 09 belum punya endpoint yang
menerima body — POST baru masuk pada Minggu 11 — tetapi tanpa baris ini
req.body bernilai undefined, dan itu termasuk penyebab kebingungan yang
paling sering saat endpoint POST pertama dibuat. */
  app.use(express.json());
  app.use(requestLogger);
  /* Seluruh API berada di bawah /api, terpisah dari alamat lain yang mungkin
dilayani server ini kelak. */
  app.use("/api", routes);
  app.use(notFound);
  app.use(errorHandler);
  
  return app;
}

