/* Membaca satu variabel angka. Bila kosong atau bukan angka, pakai default —
server tetap hidup, dan itu memang yang diinginkan untuk nilai seperti PORT. */
function angka(nilai, bawaan) {
  const hasil = Number.parseInt(nilai, 10);
  return Number.isInteger(hasil) ? hasil : bawaan;
}
export const config = Object.freeze({
  /* development | production. Dipakai error handler untuk memutuskan seberapa
banyak detail galat yang boleh ikut terkirim ke klien. */
  environment: process.env.NODE_ENV || "development",
  /* Port DI DALAM container. Port yang diketik di browser (3001) adalah
pemetaannya di host — urusan docker-compose.yml, bukan urusan server. */
  port: angka(process.env.PORT, 3000),
});
