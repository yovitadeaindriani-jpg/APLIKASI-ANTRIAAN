/* =============================================================================
queueApi.js — satu-satunya pintu ke data antrean
=============================================================================
Mulai Minggu 07, tidak ada satu pun komponen yang mengubah data antrean
sendiri. Semuanya lewat berkas ini, dan berkas ini berpura-pura menjadi
server: setiap fungsinya mengembalikan Promise, memerlukan waktu, dan dapat
gagal — tepat seperti pemanggilan jaringan yang akan menggantikannya.
Perbandingannya dengan API sungguhan pada PRD §30:
ambilDaftarAntrean() GET /api/queues
buatAntrean() POST /api/queues
panggilAntreanBerikutnya() POST /api/queues/next
selesaikanAntrean(id) POST /api/queues/:id/complete
Pada Minggu 11 isi setiap fungsi diganti fetch(). Nama, parameter, bentuk
hasil, dan bentuk galatnya tidak berubah — sehingga useQueue dan seluruh
komponen tidak perlu disentuh sama sekali. Itulah gunanya lapisan ini:
satu berkas yang berubah, bukan sepuluh.
Yang sekarang berperan sebagai "database" adalah localStorage lewat
storage.js, dan yang berperan sebagai "service" adalah fungsi murni pada
queue.js — berkas yang pada Minggu 09 pindah ke server hampir apa adanya.
========================================================================== */
import { takeQueue, callNext, completeQueue } from "../queue.js";
import { muatAntrean, simpanAntrean } from "../storage.js";
/* Jeda buatan. Tanpa ini, keadaan "sedang memuat" lewat begitu cepat sampai
tidak pernah terlihat — dan yang tidak pernah terlihat tidak pernah teruji.
Jaringan sungguhan tidak sesopan ini. */

const JEDA_MS = 250;
/* Ubah menjadi true untuk melihat bagaimana aplikasi berperilaku ketika
permintaan gagal. Pada Minggu 11 kegagalan datang sendiri — server mati,
Wi-Fi putus, alamat salah ketik — dan tampilannya harus sudah siap. */
const SIMULASI_GAGAL = false;
/* Galat dari API membawa code DAN message, mengikuti bentuk response galat
pada PRD §31:
{ "error": { "code": "QUEUE_NOT_FOUND", "message": "..." } }
code untuk dibaca program, message untuk dibaca manusia. Minggu 11 tinggal
membacanya dari body response alih-alih dari queue.js. */
export class GalatApi extends Error {
  constructor(code, message) {
    super(message);
    this.name = "GalatApi";
    this.code = code;
  }
}
function tunggu() {
  return new Promise((selesai) => setTimeout(selesai, JEDA_MS));
}
/* Kerangka yang sama untuk keempat pemanggilan: menunggu, lalu gagal atau
mengerjakan. */
async function permintaan(kerjakan) {
  await tunggu();
  if (SIMULASI_GAGAL) {
    throw new GalatApi(
      "NETWORK_ERROR",
      "Tidak dapat menghubungi server antrean.",
    );
  }
  return kerjakan();
}
/* Menerapkan satu aturan dari queue.js pada data tersimpan, lalu menyimpan
hasilnya. Penolakan aturan — memanggil ketika tidak ada yang menunggu,
menyelesaikan antrean yang belum dipanggil — dilemparkan sebagai galat,
sama seperti response 4xx nanti. */
function terapkan(aksi) {
  const hasil = aksi(muatAntrean());
  if (!hasil.ok) {
    throw new GalatApi(hasil.code, hasil.message);
  }
  simpanAntrean(hasil.state);
  return hasil.queue;
}
/* GET /api/queues — seluruh antrean hari ini, urut dari yang terawal. */
export function ambilDaftarAntrean() {
  return permintaan(() => muatAntrean().queues);
}
/* POST /api/queues — membuat satu nomor baru dan mengembalikannya (FR-02). */
export function buatAntrean() {
  return permintaan(() => terapkan((data) => takeQueue(data)));
}
/* POST /api/queues/next — memanggil antrean WAITING tertua (FR-06). */
export function panggilAntreanBerikutnya() {
  return permintaan(() => terapkan((data) => callNext(data)));
}
/* POST /api/queues/:id/complete — menandai satu antrean selesai (FR-07). */
export function selesaikanAntrean(id) {
  return permintaan(() => terapkan((data) => completeQueue(data, id)));
}
