import { config } from "../config/index.js";
export function getHealth(req, res) {
  res.status(200).json({
    data: {
      service: "queueapp-server",
      status: "ok",
      environment: config.environment,
      /* Berapa lama proses ini sudah hidup, dalam detik. Angka yang kembali
ke nol memberi tahu bahwa server sempat mati dan dinyalakan ulang —
petunjuk yang berguna ketika sesuatu berperilaku aneh. */
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  });
}
