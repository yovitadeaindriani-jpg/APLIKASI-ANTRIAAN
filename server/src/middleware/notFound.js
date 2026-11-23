import { ApiError } from "../apiError.js";
export function notFound(req, res, next) {
  next(
    new ApiError(
      404,
      "ROUTE_NOT_FOUND",
      `Alamat ${req.method} ${req.originalUrl} tidak tersedia.`,
    ),
  );
}
