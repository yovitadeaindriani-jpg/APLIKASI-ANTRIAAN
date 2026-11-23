
/* Membaca satu variabel yang WAJIB ada. Tidak ada nilai bawaan yang masuk akal
untuk nama database atau kata sandi — menebaknya hanya menunda kegagalan
sampai permintaan pertama, ketika penyebabnya sudah jauh lebih sulit dikenali
daripada saat server dinyalakan. */
function wajib(nama) {
    const nilai = process.env[nama];

    if (!nilai) {
        throw new Error(
            `Environment variable ${nama} belum diisi. Salin .env.example menjadi .env, ` +
            'lalu jalankan ulang. Lihat README bagian "Menjalankan Proyek".'
        );
    }

    return nilai;
}

export const config = Object.freeze({
    /* development | production. Dipakai error handler untuk memutuskan seberapa
    banyak detail galat yang boleh ikut terkirim ke klien. */
    environment: process.env.NODE_ENV || 'development',

    /* Port DI DALAM container. Port yang diketik di browser (3001) adalah
    pemetaannya di host — urusan docker-compose.yml, bukan urusan server. */
    port: angka(process.env.PORT, 3000),

    /* Bentuk objeknya sengaja sama persis dengan yang diminta mysql2, sehingga
    dapat diteruskan apa adanya tanpa disusun ulang di tempat lain.
    DB_HOST bernilai "mysql" — nama service pada docker-compose.yml, yang oleh
    Docker disediakan sebagai hostname di dalam network. Bukan localhost:
    di dalam container, localhost berarti container itu sendiri. */
    database: Object.freeze({
        host: process.env.DB_HOST || 'localhost',
        port: angka(process.env.DB_PORT, 3306),
        database: wajib('DB_NAME'),
        user: wajib('DB_USER'),
        password: wajib('DB_PASSWORD'),
    }),
});

import mysql from 'mysql2/promise';
import { config } from './index.js';

let koneksi = null;

export async function connectDatabase() {
    koneksi = await mysql.createConnection({
        ...config.database,

        /* Kolom waktu dibaca sebagai UTC, apa pun zona waktu komputer yang
        menjalankan container.

        Tanpa baris ini mysql2 menerjemahkan '2026-09-04 08:02:00' memakai zona
        waktu proses Node — sehingga response bisa berbeda jam di komputer yang
        berbeda, padahal isinya database sama. Bug semacam itu tidak muncul di
        mesin sendiri dan baru terlihat ketika orang lain menjalankannya.

        Hasilnya objek Date, yang oleh JSON.stringify ditulis sebagai ISO 8601:

                "2026-09-04T08:02:00.000Z"

        Bentuk yang sama persis dengan Minggu 09, dan yang sama dengan yang
        dihasilkan web client sendiri (web/src/queue.js). Menyimpang darinya —
        misalnya mengirim '2026-09-04 08:02:00' apa adanya — membuat
        `new Date(...)` di sisi klien berperilaku berbeda antar peramban.
        Penerjemahan ke bentuk yang dibaca manusia tetap tugas klien
        (web/src/format.js). */
        timezone: 'Z',
    });

    /* createConnection sudah menyambung, tetapi ping memastikan sambungannya
    benar-benar hidup dan kredensialnya diterima — bukan sekadar objeknya
    terbentuk. */
    await koneksi.ping();

    const { host, port, database } = config.database;
    console.log(`[queueapp] terhubung ke MySQL ${host}:${port}/${database}`);

    return koneksi;
}

/* Dipakai lapisan service. Ia sengaja melempar, bukan menyambung sendiri:
kalau ini terpanggil sebelum connectDatabase(), yang salah adalah urutan
penyalaan server — dan itu harus terlihat, bukan ditambal diam-diam. */
export function getConnection() {
    if (!koneksi) {
        throw new Error(
            'Database belum tersambung — connectDatabase() harus dipanggil lebih dulu.'
        );
    }

    return koneksi;
}
