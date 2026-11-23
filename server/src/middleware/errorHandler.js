import { ApiError } from "../apiError.js";
import { config } from "../config/index.js";
/* eslint-disable-next-line no-unused-vars -- lihat catatan tentang empat parameter di atas */
export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message },
    });
  }
  /* Tidak terduga. Yang lengkap ke log, yang secukupnya ke klien. */
  console.error("[queueapp] galat tidak tertangani:", err);
  const response = {
    error: {
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan di server.",
    },
  };
  /* Saat mengembangkan, pesan aslinya jauh lebih berguna daripada kalimat
umum di atas. Saat production, ia tidak boleh ikut terkirim. */
  if (config.environment === "development") {
    response.error.detail = err.message;
  }
  res.status(500).json(response);
}
