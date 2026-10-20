import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useQueue } from "./useQueue.js";
import HomePage from "./pages/HomePage.jsx";
import TakeQueuePage from "./pages/TakeQueuePage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  useFokusSetelahBerpindah();
  const {
    status,
    antrean,
    galat,
    nomorSaya,
    pesan,
    sibuk,
    muatUlang,
    ambilNomor,
    panggilBerikutnya,
    selesaikan,
  } = useQueue();
  /* Props ditulis satu per satu, bukan dioper sekaligus sebagai satu objek.
Lebih panjang, tetapi membaca route mana pun langsung memperlihatkan apa
yang dibutuhkan halaman itu — dan apa yang TIDAK. Halaman masuk, misalnya,
tidak menerima data antrean sama sekali. */
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            status={status}
            galat={galat}
            antrean={antrean}
            nomorSaya={nomorSaya}
            onMuatUlang={muatUlang}
          />
        }
      />
      <Route
        path="/queue"
        element={
          <TakeQueuePage
            status={status}
            galat={galat}
            antrean={antrean}
            nomorSaya={nomorSaya}
            pesan={pesan}
            sibuk={sibuk}
            onAmbil={ambilNomor}
            onMuatUlang={muatUlang}
          />
        }
      />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminDashboardPage
            status={status}
            galat={galat}
            antrean={antrean}
            pesan={pesan}
            sibuk={sibuk}
            onPanggil={panggilBerikutnya}
            onSelesaikan={selesaikan}
            onMuatUlang={muatUlang}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function useFokusSetelahBerpindah() {
const lokasi = useLocation();
const alamatSebelumnya = useRef(lokasi.pathname);
useEffect(() => {
/* Pemuatan pertama dilewati: ketika itu peramban sudah menempatkan fokus
di awal dokumen dengan sendirinya. */
if (alamatSebelumnya.current === lokasi.pathname) return;
alamatSebelumnya.current = lokasi.pathname;
document.getElementById('konten-utama')?.focus();
}, [lokasi.pathname]);
}