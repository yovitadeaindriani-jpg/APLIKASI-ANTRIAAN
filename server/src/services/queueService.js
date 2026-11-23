import { getConnection } from "../config/database.js";

/* Status yang sah, sesuai FR-03. Nilainya sama dengan ENUM pada
database/schema.sql dan dengan yang dipakai web client. */
export const STATUS = Object.freeze({
  WAITING: "WAITING",
  CALLED: "CALLED",
  COMPLETED: "COMPLETED",
});

export const DAFTAR_STATUS = Object.freeze(Object.values(STATUS));
/* Kolom yang dikirim ke klien, ditulis sekali di sini.
  `SELECT *` sengaja dihindari. Ia terlihat praktis, tetapi artinya berubah
  diam-diam setiap kali ada kolom baru — dan kolom baru itu bisa saja sesuatu
  yang tidak boleh keluar dari server. Menyebut kolomnya satu per satu membuat
  response API ditentukan oleh berkas ini, bukan oleh bentuk tabel.
  `AS` memetakan snake_case milik SQL ke camelCase milik JavaScript, sehingga
  bentuk datanya tetap sama persis dengan Minggu 09 dan dengan yang dipakai
  web client sejak Minggu 05. */

const KOLOM = `
id,
queue_number AS queueNumber,
status,
created_at AS createdAt,
called_at AS calledAt,
completed_at AS completedAt
`;
/* ---- Nomor antrean -------------------------------------------------------
PRD 29: berurutan dan mudah dibaca. 1 → A001, 42 → A042. */
const AWALAN = "A";
const PANJANG_DIGIT = 3;
export function formatQueueNumber(angka) {
  return AWALAN + String(angka).padStart(PANJANG_DIGIT, "0");
}
/* ---- READ ---------------------------------------------------------------- */
/* FR-01 — seluruh antrean, terurut dari yang terawal. Penyaringan status
bersifat opsional.
Perhatikan urutan ASC bukan sekadar selera tampilan: ia yang menentukan
siapa dipanggil berikutnya (PRD 29), dan index idx_queues_status_created
pada schema.sql dipasang tepat untuk pasangan status + created_at ini. */
export async function listQueues({ status } = {}) {
  const db = getConnection();
  if (status) {
    const [baris] = await db.execute(
      `SELECT ${KOLOM} FROM queues WHERE status = ? ORDER BY created_at ASC`,
      [status],
    );
    return baris;
  }
  /* Tanpa nilai yang perlu dikirim, execute dipanggil tanpa array. */
  const [baris] = await db.execute(
    `SELECT ${KOLOM} FROM queues ORDER BY created_at ASC`,
  );
  return baris;
}
/* Satu antrean menurut id. Mengembalikan null bila tidak ada — keputusan
tentang status HTTP mana yang pantas (404) ada di controller, bukan di sini. */
export async function findQueue(id) {
  const db = getConnection();
  const [baris] = await db.execute(`SELECT ${KOLOM} FROM queues WHERE id = ?`, [
    id,
  ]);
  return baris[0] ?? null;
}
/* ---- CREATE --------------------------------------------------------------
FR-02 — mengambil nomor antrean baru.
Dua pernyataan, dan alasannya ada di sini: nomor antrean diturunkan dari id,
sedangkan id baru ditentukan MySQL ketika barisnya masuk. Jadi barisnya
dimasukkan lebih dulu, id-nya dibaca dari hasil INSERT, lalu nomornya
diisikan.
Menghitung nomor sendiri sebelum INSERT — misalnya dengan SELECT MAX(id) + 1
— terlihat lebih ringkas tetapi salah pada dua keadaan: dua permintaan yang
datang bersamaan dapat menghitung angka yang sama, dan baris yang pernah
dihapus membuat nomornya terpakai ulang. Membiarkan MySQL yang menentukan
id menghilangkan keduanya. */
export async function createQueue() {
  const db = getConnection();
  const [hasil] = await db.execute("INSERT INTO queues (status) VALUES (?)", [
    STATUS.WAITING,
  ]);
  const nomor = formatQueueNumber(hasil.insertId);
  await db.execute("UPDATE queues SET queue_number = ? WHERE id = ?", [
    nomor,
    hasil.insertId,
  ]);
  return findQueue(hasil.insertId);
}
/* ---- UPDATE --------------------------------------------------------------
Mengubah status satu antrean, sekaligus mencatat kapan hal itu terjadi.
Kolom waktunya diisi bersamaan dengan statusnya, dalam satu pernyataan.
Kalau dipisah menjadi dua, ada celah — sekecil apa pun — ketika sebuah
antrean berstatus CALLED tetapi called_at masih kosong, dan laporan Minggu 14
akan menghitungnya sebagai sesuatu yang tidak pernah dipanggil.
NOW() dipakai, bukan waktu dari Node, supaya seluruh catatan waktu berasal
dari satu jam yang sama: jam milik database. */
const KOLOM_WAKTU = Object.freeze({
  [STATUS.CALLED]: "called_at",
  [STATUS.COMPLETED]: "completed_at",
  [STATUS.WAITING]: null,
});
export async function updateQueueStatus(id, status) {
  const db = getConnection();
  const kolomWaktu = KOLOM_WAKTU[status];
  /* Nama kolom TIDAK dapat dikirim sebagai parameter — tanda tanya hanya
berlaku untuk nilai. Karena itu kolomWaktu diambil dari daftar tetap di
atas, bukan dari apa pun yang datang dari luar. Nilai yang dirangkai ke
dalam teks SQL harus selalu berasal dari kode, tidak pernah dari
pengguna. */
  const sql = kolomWaktu
    ? `UPDATE queues SET status = ?, ${kolomWaktu} = NOW() WHERE id = ?`
    : "UPDATE queues SET status = ? WHERE id = ?";
  const [hasil] = await db.execute(sql, [status, id]);
  /* affectedRows bernilai 0 bila tidak ada baris dengan id tersebut. */
  if (hasil.affectedRows === 0) {
    return null;
  }
  return findQueue(id);
}
/* ---- DELETE -------------------------------------------------------------- */
/* Mengembalikan true bila ada yang benar-benar terhapus, false bila tidak ada
baris dengan id tersebut. Membedakan keduanya penting: menghapus sesuatu
yang tidak ada bukan keberhasilan. */
export async function deleteQueue(id) {
  const db = getConnection();
  const [hasil] = await db.execute("DELETE FROM queues WHERE id = ?", [id]);
  return hasil.affectedRows > 0;
}
