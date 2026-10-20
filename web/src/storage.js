
import { STATUS, emptyState } from "./queue.js";

export const KUNCI_ANTREAN = "queueapp.antrean.v2";
export const KUNCI_NOMOR_SAYA = "queueapp.nomor-saya.v2";

function bentuknyaBenar(data) {
  return (
    data !== null &&
    typeof data === "object" &&
    Number.isInteger(data.lastNumber) &&
    Array.isArray(data.queues) &&
    data.queues.every(
      (queue) =>
        Number.isInteger(queue.id) &&
        typeof queue.queueNumber === "string" &&
        Object.hasOwn(STATUS, queue.status)
    )
  );
}

export function muatAntrean() {
  try {
    const teks = localStorage.getItem(KUNCI_ANTREAN);

    if (!teks) return emptyState();

    const data = JSON.parse(teks);

    if (!bentuknyaBenar(data)) return emptyState();

    return data;
  } catch {
    return emptyState();
  }
}

export function simpanAntrean(state) {
  try {
    localStorage.setItem(KUNCI_ANTREAN, JSON.stringify(state));
  } catch {
    // Penyimpanan gagal, aplikasi tetap berjalan.
  }
}

export function muatNomorSaya() {
  try {
    const teks = localStorage.getItem(KUNCI_NOMOR_SAYA);

    if (!teks) return null;

    return JSON.parse(teks);
  } catch {
    return null;
  }
}

export function simpanNomorSaya(nomor) {
  try {
    if (nomor == null) {
      localStorage.removeItem(KUNCI_NOMOR_SAYA);
    } else {
      localStorage.setItem(KUNCI_NOMOR_SAYA, JSON.stringify(nomor));
    }
  } catch {
    // Penyimpanan gagal, aplikasi tetap berjalan.
  }
}
