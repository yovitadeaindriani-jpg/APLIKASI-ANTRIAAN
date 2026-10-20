/* =============================================================================
AdminLoginPage — Masuk sebagai Petugas (/admin/login)
=============================================================================
Berhasil masuk berarti berpindah ke halaman dashboard, sama seperti
Minggu 05. Belum ada kredensial yang diperiksa; autentikasi sungguhan
adalah materi Minggu 13.
Perpindahannya kini dikerjakan useNavigate, bukan window.location. Bedanya
bukan gaya penulisan: window.location membuang seluruh aplikasi dan
memuatnya lagi dari nol, sedangkan useNavigate hanya mengganti alamat dan
isi halaman — cara yang sama dengan yang dipakai <Link>, tetapi dijalankan
dari dalam kode alih-alih oleh klik pengguna.
========================================================================== */
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
export default function AdminLoginPage() {
  const navigasi = useNavigate();
  return (
    <Layout
      judul="Masuk sebagai Petugas"
      catatan="Minggu 08: form ini memeriksa kelengkapan isian, tetapi belum memeriksa kredensial
      sama sekali. Autentikasi sungguhan ditambahkan pada Minggu 13."
    >
      <AdminLogin onMasuk={() => navigasi("/admin/dashboard")} />
      <section aria-labelledby="judul-kesalahan">
        <h2 id="judul-kesalahan">Tentang Pesan Kesalahan</h2>
        <p>
          Bila kredensial salah, sistem tidak memberi tahu bagian mana yang
          keliru. Menyebutkan "email tidak terdaftar" akan memberitahu penyerang
          bahwa email lainnya terdaftar.
        </p>
      </section>
    </Layout>
  );
}
