
export const STATUS = Object.freeze({
  WAITING: "WAITING",
  CALLED: "CALLED",
  COMPLETED: "COMPLETED",
});

/* Transisi yang diizinkan. Selain yang terdaftar di sini, ditolak.

        WAITING → CALLED → COMPLETED

  COMPLETED tidak punya tujuan mana pun: antrean yang sudah selesai tidak
  bisa dikembalikan. */
const TRANSISI_SAH = Object.freeze({
  [STATUS.WAITING]: [STATUS.CALLED],
  [STATUS.CALLED]: [STATUS.COMPLETED],
  [STATUS.COMPLETED]: [],
});
const boleh = (dari, ke) => TRANSISI_SAH[dari].includes(ke);
const sekarang = () => new Date().toISOString();

/* ---- Nomor antrean -------------------------------------------------------
   PRD 29: berurutan, mudah dibaca, tidak bentrok pada kondisi normal.

     1 → A001 42 → A042 1234 → A1234

   Panjang digit tetap membuat nomor berbaris rapi di layar — pasangan dari
   tabular-nums pada CSS Minggu 04. Lewat 999 nomor menjadi lebih panjang
   tetapi tetap benar; lebih baik lebih panjang daripada berulang. */

const AWALAN = "A";
const PANJANG_DIGIT = 3;

export function formatQueueNumber(angka) {
  return AWALAN + String(angka).padStart(PANJANG_DIGIT, "0");
}

/* ---- Bentuk state --------------------------------------------------------
    lastNumber disimpan terpisah dari daftar antrean supaya nomor tidak pernah
    dipakai ulang, bahkan bila antrean lama dihapus. */
export function emptyState() {
  return {
    lastNumber: 0,
    queues: [],
    myQueueId: null,
  };
}

/* ---- Membaca state -------------------------------------------------------
Pada Minggu 05 setiap pembaca mengembalikan salinan, supaya kode tampilan
tidak dapat mengubah data aslinya. Sekarang penjagaan itu tidak lagi
diperlukan: tidak ada satu pun fungsi di berkas ini yang mengubah state di
tempat, jadi tidak ada yang bisa dirusak. */
export function currentCalled(state) {
  return state.queues.find((queue) => queue.status === STATUS.CALLED) ?? null;
}

/* Antrean WAITING tertua — yang akan dipanggil berikutnya (FR-06).
Daftar selalu tersusun menurut waktu pembuatan, jadi yang pertama
ditemukan sudah pasti yang tertua. */
export function nextInLine(state) {
  return state.queues.find((queue) => queue.status === STATUS.WAITING) ?? null;
}

export function waitingQueues(state) {
  return state.queues.filter((queue) => queue.status === STATUS.WAITING);
}

export function myQueue(state) {
  if (state.myQueueId === null) return null;
  return state.queues.find((queue) => queue.id === state.myQueueId) ?? null;
}

export function summary(state) {
  const hitung = (status) =>
    state.queues.filter((queue) => queue.status === status).length;

  return {
    waiting: hitung(STATUS.WAITING),
    called: hitung(STATUS.CALLED),
    completed: hitung(STATUS.COMPLETED),
    total: state.queues.length,
  };
}

/* ---- Mengubah state ------------------------------------------------------
Setiap fungsi menerima state dan mengembalikan salah satu dari dua bentuk:
{ ok: true, state: stateBaru, queue: {...} }
{ ok: false, code: 'KODE', message: 'penjelasan' }
Bentuk kedua sengaja menyerupai response galat pada PRD 31, supaya kode
tampilan yang menanganinya sekarang tidak perlu ditulis ulang ketika
sumber datanya berganti menjadi API pada Minggu 11.
Perhatikan pada bentuk kegagalan tidak ada state baru — memang tidak ada
yang berubah. */

export function takeQueue(state) {
  const angka = state.lastNumber + 1;

  const queue = {
    id: angka,
    queueNumber: formatQueueNumber(angka),
    status: STATUS.WAITING,
    createdAt: sekarang(),
    calledAt: null,
    completedAt: null,
  };

  return {
    ok: true,
    queue,
    state: {
      lastNumber: angka,
      /* Selalu ditambahkan di akhir, sehingga daftar tetap tersusun menurut
      waktu pembuatan — urutan yang diandalkan nextInLine. */
      queues: [...state.queues, queue],
      myQueueId: queue.id,
    },
  };
}

export function callNext(state) {
  /* Ditemukan pada review Minggu 08.
  Sampai Minggu 07 fungsi ini mengerjakan dua perubahan dalam satu aksi:
  antrean yang sedang dipanggil ditutup diam-diam, lalu antrean tertua
  mulai dipanggil. Terasa praktis, tetapi FR-06 menuliskan syaratnya
  dengan jelas — "satu aksi mengubah tepat satu antrean" — dan akibatnya
  nyata: completedAt terisi padahal petugas tidak pernah menekan
  "Selesaikan", sehingga catatan waktu selesai tidak dapat dipercaya.
  Sekarang keduanya dipisahkan. Selama masih ada antrean CALLED,
  memanggil berikutnya ditolak; petugas menyelesaikannya lebih dulu.
  Dengan begitu setiap perubahan status punya satu aksi yang menyebabkannya. */

  const sedangDipanggil = currentCalled(state);

  if (sedangDipanggil) {
    return {
      ok: false,
      code: "QUEUE_ALREADY_CALLED",
      message: `Antrean ${sedangDipanggil.queueNumber} masih dipanggil. Selesaikan lebih dulu.`,
    };
  }

  const target = nextInLine(state);

  if (!target) {
    return {
      ok: false,
      code: "NO_WAITING_QUEUE",
      message: "Tidak ada antrean yang menunggu.",
    };
  }

  const waktu = sekarang();

  /* Hanya satu baris yang berubah. Sisanya dikembalikan apa adanya. */
  const queues = state.queues.map((queue) =>
    queue.id === target.id
      ? { ...queue, status: STATUS.CALLED, calledAt: waktu }
      : queue,
  );

  return {
    ok: true,
    state: { ...state, queues },
    queue: queues.find((queue) => queue.id === target.id),
  };
}

export function completeQueue(state, id) {
  const target = state.queues.find((queue) => queue.id === id);

  if (!target) {
    return {
      ok: false,
      code: "QUEUE_NOT_FOUND",
      message: "Antrean tidak ditemukan.",
    };
  }

  if (!boleh(target.status, STATUS.COMPLETED)) {
    return {
      ok: false,
      code: "INVALID_TRANSITION",
      message: `Antrean berstatus ${target.status} tidak dapat diselesaikan.`,
    };
  }

  const waktu = sekarang();

  const queues = state.queues.map((queue) =>
    queue.id === id
      ? { ...queue, status: STATUS.COMPLETED, completedAt: waktu }
      : queue,
  );

  return {
    ok: true,
    state: { ...state, queues },
    queue: queues.find((queue) => queue.id === id),
  };
}

export function hapusAntreanA003(state) {
  const queues = state.queues.filter(
    (queue) => queue.queueNumber !== "A003",
  );

  return {
    ...state,
    queues,
    myQueueId: queues.some((queue) => queue.id === state.myQueueId)
      ? state.myQueueId
      : null,
  };
}
