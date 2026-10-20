import { useEffect } from "react";
import { NavLink } from "react-router-dom";
const HALAMAN_PENGUNJUNG = [
  { to: "/", label: "Antrean Saat Ini" },
  { to: "/queue", label: "Ambil Nomor" },
  { to: "/admin/login", label: "Masuk sebagai Petugas" },
];
const HALAMAN_PETUGAS = [
  { to: "/", label: "Antrean Saat Ini" },
  { to: "/queue", label: "Ambil Nomor" },
  { to: "/admin/dashboard", label: "Dashboard Petugas" },
  { to: "/admin/login", label: "Keluar" },
];
export default function Layout({ judul, petugas = false, catatan, children }) {
  const halaman = petugas ? HALAMAN_PETUGAS : HALAMAN_PENGUNJUNG;
  /* Judul dokumen adalah hal pertama yang dibacakan pembaca layar dan satusatunya penanda pada daftar tab peramban. Satu dokumen untuk empat
halaman berarti judulnya harus diganti setiap kali halamannya berganti. */
  useEffect(() => {
    document.title = `${judul} — QueueApp`;
  }, [judul]);
  return (
    <>
      <a className="lewati" href="#konten-utama">
        Lewati ke konten utama
      </a>
      <header>
        <p>
          <strong>QueueApp</strong>
        </p>
        <nav aria-label="Navigasi utama">
          <ul>
            {halaman.map((item) => (
              <li key={item.to}>
                {/* NavLink adalah tautan biasa yang tahu alamat mana yang
sedang dibuka. Ia memasang sendiri aria-current="page"
pada tautan yang cocok — penanda yang sama yang dipakai
CSS Minggu 04 untuk menebalkannya, dan yang pada Minggu 06
masih dihitung manual lewat prop "aktif".
end membatasi kecocokan "/" pada alamat itu saja; tanpanya
"/" dianggap cocok dengan semua alamat, karena semuanya
diawali garis miring. */}
                <NavLink to={item.to} end>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {/* tabIndex={-1} membuat elemen dapat menerima fokus lewat kode dan
lewat tautan lompat, tetapi tidak ikut dalam urutan Tab. */}
      <main id="konten-utama" tabIndex={-1}>
        <h1>{judul}</h1>
        {children}
      </main>
      <footer>
        <p>
          QueueApp — reference implementation mata kuliah Web and Mobile
          Technology (BD323).
        </p>
        <p>{catatan}</p>
      </footer>
    </>
  );
}
