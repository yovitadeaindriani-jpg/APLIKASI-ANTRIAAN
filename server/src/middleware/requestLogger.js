export function requestLogger(req, res, next) {
  const mulai = Date.now();
  /* Response belum jadi saat middleware ini berjalan — status code baru
diketahui setelah controller selesai. Karena itu pencatatannya dititipkan
pada peristiwa 'finish', yang menyala tepat ketika response terkirim. */
  res.on("finish", () => {
    const durasi = Date.now() - mulai;
    console.log(
      `${req.method} ${req.originalUrl} → ${res.statusCode} (${durasi} ms)`,
    );
  });
  next();
}
