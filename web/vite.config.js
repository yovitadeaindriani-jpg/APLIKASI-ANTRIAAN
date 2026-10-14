import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const halaman = (berkas) => new URL(berkas, import.meta.url).pathname;
/* Konfigurasi Vite — sengaja sesingkat mungkin.
Vite sudah punya nilai bawaan yang masuk akal; yang ditulis di sini hanya
yang benar-benar perlu berbeda. */
export default defineConfig({
plugins: [react()],
build: {
rollupOptions: {
/* QueueApp punya EMPAT halaman, masing-masing dengan alamatnya sendiri
— sama seperti Minggu 03 sampai 05. Vite perlu diberi tahu keempatnya
agar ikut dibangun; tanpa daftar ini hanya index.html yang jadi.
Ini BUKAN routing. Perpindahan halaman masih dikerjakan peramban
lewat tautan biasa, persis seperti sebelum React. Routing sisi klien
— satu halaman yang menukar isinya sendiri tanpa memuat ulang —
adalah materi Minggu 07. */
input: {
home: halaman('./index.html'),
takeQueue: halaman('./take-queue.html'),
adminLogin: halaman('./admin-login.html'),
adminDashboard: halaman('./admin-dashboard.html'),
},
},
},
server: {
/* Tanpa host 0.0.0.0, server hanya mendengar di dalam container dan
tidak dapat dibuka dari peramban di komputer sendiri. */
host: '0.0.0.0',
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