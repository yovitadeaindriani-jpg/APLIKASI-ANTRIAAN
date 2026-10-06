// Status antrean
export const STATUS = Object.freeze({
  WAITING: "WAITING",
  CALLED: "CALLED",
  COMPLETED: "COMPLETED",
});

// Transisi yang diizinkan
// WAITING → CALLED → COMPLETED
const TRANSISI_SAH = Object.freeze({
  [STATUS.WAITING]: [STATUS.CALLED],
  [STATUS.CALLED]: [STATUS.COMPLETED],
  [STATUS.COMPLETED]: [],
});

function stateKosong() {
  return {
    /* Nomor terakhir yang pernah dikeluarkan. Disimpan terpisah dari daftar
antrean supaya nomor tidak pernah dipakai ulang, bahkan bila antrean
lama dihapus. */
    lastNumber: 0,
    queues: [],
    /* Id antrean milik perangkat ini, untuk US-04. */
    myQueueId: null,
  };
}
let state = stateKosong();

export function allQueues() {
  return state.queues.map((queue) => ({ ...queue }));
}
export function findQueue(id) {
  const found = state.queues.find((queue) => queue.id === id);
  return found ? { ...found } : null;
}
/* Antrean yang sedang dipanggil. Hanya boleh ada satu pada satu waktu. */
export function currentCalled() {
  const found = state.queues.find((queue) => queue.status === STATUS.CALLED);
  return found ? { ...found } : null;
}

/* Antrean WAITING tertua — yang akan dipanggil berikutnya (FR-06).
Daftar selalu tersusun menurut waktu pembuatan, jadi yang pertama
ditemukan sudah pasti yang tertua. */
export function nextInLine() {
const found = state.queues.find((queue) => queue.status === STATUS.WAITING);
return found ? { ...found } : null;
}
export function waitingQueues() {
return state.queues
.filter((queue) => queue.status === STATUS.WAITING)
.map((queue) => ({ ...queue }));
}
export function myQueue() {
return state.myQueueId === null ? null : findQueue(state.myQueueId);
}
export function summary() {
const hitung = (status) => state.queues.filter((queue) => queue.status === status).length;
return {
waiting: hitung(STATUS.WAITING),
called: hitung(STATUS.CALLED),
completed: hitung(STATUS.COMPLETED),
total: state.queues.length,
};
}
/* ---- Mengubah state ------------------------------------------------------
Setiap fungsi ubah mengembalikan salah satu dari dua bentuk:
{ ok: true, queue: {...} }
{ ok: false, code: 'KODE_KESALAHAN', message: 'penjelasan' }
Bentuk ini sengaja menyerupai response API pada PRD 31, supaya kode
tampilan yang menanganinya sekarang tidak perlu ditulis ulang ketika
sumber datanya berganti menjadi API pada Minggu 11. */
function boleh(dari, ke) {
return TRANSISI_SAH[dari].includes(ke);
}
/* Mengambil nomor antrean baru (FR-02).
Nomor ditentukan di sini, bukan di halaman. Alasannya sama dengan alasan
nanti nomor ditentukan server dan bukan client (docs/architecture.md 6.1):
satu tempat yang memegang hitungan berarti nomor tidak mungkin kembar. */

const AWALAN = 'A';
const PANJANG_DIGIT = 3;
/* Mengubah angka menjadi nomor antrean yang terbaca.
1 → A001
42 → A042
1234 → A1234 (lewat 999 nomor tetap benar, hanya lebih panjang;
lebih baik lebih panjang daripada berulang) */
export function formatQueueNumber(angka) {
return AWALAN + String(angka).padStart(PANJANG_DIGIT, '0');
}

export function takeQueue() {
state.lastNumber += 1;
const queue = {
id: state.lastNumber,
queueNumber: formatQueueNumber(state.lastNumber),
status: STATUS.WAITING,
createdAt: new Date().toISOString(),
calledAt: null,
completedAt: null,
};
/* Selalu ditambahkan di akhir, sehingga daftar tetap tersusun menurut
waktu pembuatan. Urutan inilah yang dipakai callNext untuk menemukan
antrean tertua tanpa perlu menyortir ulang. */
state.queues.push(queue);
state.myQueueId = queue.id;
simpan();
return { ok: true, queue: { ...queue } };
}

export function callNext() {
const target = state.queues.find((queue) => queue.status === STATUS.WAITING);
if (!target) {
return {
ok: false,
code: 'NO_WAITING_QUEUE',
message: 'Tidak ada antrean yang menunggu.',
};
}
/* Hanya boleh ada satu antrean CALLED. Bila petugas memanggil berikutnya
sementara masih ada yang dipanggil, yang lama dianggap selesai. */
const sedangDipanggil = state.queues.find((queue) => queue.status === STATUS.CALLED);
if (sedangDipanggil) {
sedangDipanggil.status = STATUS.COMPLETED;
sedangDipanggil.completedAt = new Date().toISOString();
}
target.status = STATUS.CALLED;
target.calledAt = new Date().toISOString();
simpan();
return { ok: true, queue: { ...target } };
}