/* =============================================================================
main.jsx — satu-satunya titik masuk aplikasi
=============================================================================
Minggu 06 punya empat titik masuk, satu untuk setiap berkas HTML. Sejak
routing masuk, seluruhnya menyusut menjadi berkas ini: peramban hanya
memuat satu dokumen, dan yang menentukan halaman mana yang tampil adalah
alamat pada address bar — bukan berkas HTML yang berbeda.
BrowserRouter membaca alamat itu dan menyediakannya bagi seluruh komponen
di bawahnya. Ia memakai History API peramban, sehingga alamatnya tetap
bersih (/queue, bukan /#/queue) dan tombol maju/mundur tetap bekerja.
========================================================================== */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/style.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
