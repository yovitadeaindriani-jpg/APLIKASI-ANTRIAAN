## 1. Keadaan yang dibekukan
```text
React + Vite + React Router
↓
api/queueApi.js (lapisan data)
↓
localStorage peramban
```
Aplikasi web berjalan penuh **tanpa backend apa pun**. Empat layar punya alamatnya sendiri, data
antrean melewati satu lapisan yang sudah berbentuk seperti API, dan tiga keadaan data — memuat,
gagal, kosong — masing-masing punya tampilan.
| Ada | Belum ada, dan itu disengaja |
|---|---|
| React + Vite (Minggu 06) | Express (Minggu 09) |
| Routing sisi klien (Minggu 07) | MySQL (Minggu 10) |
| Lapisan pemanggilan data (Minggu 07) | REST API sungguhan (Minggu 11) |
| Validasi form di sisi halaman | React Native (Minggu 12) |
| Keadaan memuat, gagal, kosong | Autentikasi (Minggu 13) |

## 5. Skenario demo
Urutan ini yang dijalankan untuk membuktikan Web MVP dapat didemokan tanpa backend. Mulai dari
peramban yang bersih — `localStorage.clear(); location.reload();`.
| # | Langkah | Yang harus terlihat |
|---:|---|---|
| 1 | Buka `/` | "Sedang Dipanggil" berisi `—`, keterangan status terbaca |
| 2 | Klik **Ambil Nomor** | Alamat menjadi `/queue` **tanpa halaman dimuat ulang** |
| 3 | Tekan **Ambil Nomor Antrean** | Tombol menjadi "Mengambil nomor…", lalu muncul `A001` |
| 4 | Tekan sekali lagi | `A002` — nomor berurutan, tidak bentrok |
| 5 | Klik **Antrean Saat Ini** | Dua antrean menunggu; nomor Anda `A002` |
| 6 | Buka `/admin/login`, tekan **Masuk** dengan isian kosong | "Email wajib diisi.", fokus pindah
ke kolom email |
| 7 | Isi email tanpa `@` | "Format email tidak valid." |
| 8 | Isi keduanya dengan benar, **Masuk** | Pindah ke `/admin/dashboard` |
| 9 | Tekan **Panggil Antrean Berikutnya** | `A001` menjadi `CALLED`, waktu panggil tercatat |
| 10 | Perhatikan tombol panggil | **Mati**, dengan keterangan "Selesaikan A001 lebih dulu…" |
| 11 | Tekan **Selesaikan A001** | `A001` menjadi `COMPLETED`; tombol panggil hidup kembali |
| 12 | Tekan **Panggil Antrean Berikutnya** | `A002` menjadi `CALLED` |
| 13 | Tekan tombol **mundur** peramban | Kembali ke layar sebelumnya, alamat ikut mundur |
| 14 | Buka `/apa-saja` | Halaman "Halaman Tidak Ditemukan" beserta tautan pulih |
| 15 | Muat ulang `/admin/dashboard` | Halaman tetap terbuka, **bukan** 404 |
| 16 | Muat ulang halaman mana pun | Data antrean masih ada — tersimpan di peramban |
Untuk melihat keadaan gagal, ubah `SIMULASI_GAGAL` menjadi `true` di `web/src/api/queueApi.js`:
setiap layar berdata harus menampilkan pesan galat beserta tombol **Coba lagi**, dan navigasi harus
tetap terlihat.
---
## 6. Batas yang dibawa ke Minggu 09