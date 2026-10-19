import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/* Konfigurasi Vite — sengaja sesingkat mungkin.
Vite sudah punya nilai bawaan yang masuk akal; yang ditulis di sini hanya
yang benar-benar perlu berbeda.
Minggu 06 mendaftarkan empat berkas HTML sebagai titik masuk. Sejak routing
masuk pada Minggu 07 daftar itu tidak diperlukan lagi: aplikasinya kembali
menjadi satu index.html, dan Vite memang sudah mencarinya tanpa disuruh.
Yang ikut bekerja diam-diam adalah bawaan appType: 'spa'. Dengan setelan
itu, permintaan ke alamat yang tidak berupa berkas — /queue, /admin/login —
tetap dilayani index.html, sehingga membuka alamat tersebut langsung atau
menekan muat ulang tidak berakhir menjadi 404. Server produksi pada
Minggu 15 perlu diberi aturan yang setara; dev server Vite melakukannya
sendiri. */
export default defineConfig({
  plugins: [react()],
  server: {
    /* Tanpa host 0.0.0.0, server hanya mendengar di dalam container dan
tidak dapat dibuka dari peramban di komputer sendiri. */
    host: "0.0.0.0",
    port: 5173,
    watch: {
      /* Perubahan berkas dari host tidak selalu terdeteksi di dalam
container pada Docker Desktop/WSL. Polling lebih boros, tetapi
membuat hot reload benar-benar bekerja. */
      usePolling: true,
      interval: 300,
    },
  },
});
