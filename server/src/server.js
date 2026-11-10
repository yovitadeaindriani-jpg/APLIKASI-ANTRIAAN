import { createApp } from "./app.js";
import { config } from "./config/index.js";
const app = createApp();
/* '0.0.0.0', bukan 'localhost'.
Di dalam container, 'localhost' berarti container itu sendiri — server yang
mendengarkan di sana tidak dapat dihubungi dari luar, dan port yang sudah
dipetakan di docker-compose.yml pun tetap menolak koneksi. '0.0.0.0' berarti
"terima dari antarmuka jaringan mana pun", dan itu yang dibutuhkan agar
http://localhost:3001 di komputer Anda benar-benar sampai ke sini. */
const server = app.listen(config.port, "0.0.0.0", () => {
  console.log(
    `[queueapp] API berjalan di port ${config.port} (${config.environment})`,
  );
  console.log("[queueapp] coba: GET /api/health dan GET /api/queues");
});
