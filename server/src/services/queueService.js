/* Status yang sah, sesuai FR-03. Nilainya sama dengan yang dipakai web client. */
export const STATUS = Object.freeze({
  WAITING: "WAITING",
  CALLED: "CALLED",
  COMPLETED: "COMPLETED",
});
export const DAFTAR_STATUS = Object.freeze(Object.values(STATUS));
/* ---- Data tiruan ---------------------------------------------------------
Satu hari kerja yang sedang berjalan: dua antrean sudah selesai dilayani,
satu sedang dipanggil, dua menunggu giliran.
Daftar tersusun menurut `createdAt` dari yang terawal — urutan yang sama
dengan yang akan dijamin `ORDER BY created_at ASC` pada Minggu 10, dan yang
diandalkan aturan "panggil yang tertua" pada Minggu 11.
Object.freeze mencegah data ini diubah tidak sengaja. Minggu ini API-nya
memang hanya membaca; percobaan mengubahnya akan gagal, bukan diam-diam
berhasil. */
const MOCK_QUEUES = Object.freeze([
  {
    id: 1,
    queueNumber: "A001",
    status: STATUS.COMPLETED,
    createdAt: "2026-09-04T01:02:00.000Z",
    calledAt: "2026-09-04T01:05:00.000Z",
    completedAt: "2026-09-04T01:11:00.000Z",
  },
  {
    id: 2,
    queueNumber: "A002",
    status: STATUS.COMPLETED,
    createdAt: "2026-09-04T01:04:00.000Z",
    calledAt: "2026-09-04T01:12:00.000Z",
    completedAt: "2026-09-04T01:19:00.000Z",
  },
  {
    id: 3,
    queueNumber: "A003",
    status: STATUS.CALLED,
    createdAt: "2026-09-04T01:07:00.000Z",
    calledAt: "2026-09-04T01:20:00.000Z",
    completedAt: null,
  },
  {
    id: 4,
    queueNumber: "A004",
    status: STATUS.WAITING,
    createdAt: "2026-09-04T01:15:00.000Z",
    calledAt: null,
    completedAt: null,
  },
  {
    id: 5,
    queueNumber: "A005",
    status: STATUS.WAITING,
    createdAt: "2026-09-04T01:21:00.000Z",
    calledAt: null,
    completedAt: null,
  },
]);
/* ---- Membaca daftar antrean ----------------------------------------------
FR-01 — melihat antrean. Penyaringan status bersifat opsional: tanpa
argumen, seluruh antrean hari ini dikembalikan.
Minggu 10 mengganti isi fungsi ini dengan satu query — parameternya tetap,
hasilnya tetap, sehingga tidak ada yang perlu ikut berubah:
SELECT * FROM queues WHERE ... ORDER BY created_at ASC
*/
export function listQueues({ status } = {}) {
  if (!status) {
    return [...MOCK_QUEUES];
  }
  return MOCK_QUEUES.filter((queue) => queue.status === status);
}
