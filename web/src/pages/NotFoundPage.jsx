/* =============================================================================
NotFoundPage — alamat yang tidak dikenal
=============================================================================
Dipasang pada route "*", yang cocok dengan apa pun yang tidak cocok dengan
route lain. Halaman ini bukan hiasan: tanpa route penampung, salah ketik
alamat menghasilkan halaman kosong tanpa satu pun petunjuk.
Catatan: yang ditampilkan hanya halaman, bukan status HTTP 404. Server
tetap mengirim 200 karena yang diminta memang berkas index.html yang sama.
Membedakan keduanya baru mungkin setelah ada server sungguhan.
========================================================================== */
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
export default function NotFoundPage() {
  return (
    <Layout
      judul="Halaman Tidak Ditemukan"
      catatan="Minggu 07: routing sisi klien. Alamat yang tidak terdaftar berakhir di halaman ini."
    >
      <p>Alamat yang Anda buka tidak ada di QueueApp.</p>
      <section aria-labelledby="judul-tujuan">
        <h2 id="judul-tujuan">Mungkin Anda mencari</h2>
        <ul>
          <li>
            <Link to="/">Antrean Saat Ini</Link>
          </li>
          <li>
            <Link to="/queue">Ambil Nomor Antrean</Link>
          </li>
          <li>
            <Link to="/admin/login">Masuk sebagai Petugas</Link>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
