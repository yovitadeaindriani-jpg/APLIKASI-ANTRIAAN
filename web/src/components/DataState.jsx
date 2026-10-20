/* =============================================================================
DataState — memuat, gagal, atau siap
=============================================================================
Data yang datang dari luar tidak langsung ada. Selama sepersekian detik
pertama ia belum tiba, dan kadang ia tidak pernah tiba sama sekali. Kedua
keadaan itu harus punya tampilannya sendiri; halaman kosong tanpa
keterangan membuat aplikasi tampak rusak padahal hanya sedang menunggu.
Ketiganya dikumpulkan di sini supaya ketiga halaman yang memakai data
antrean menampilkannya dengan cara yang sama, bukan tiga cara berbeda.
Keadaan KOSONG tidak diurus komponen ini. "Belum ada antrean" bukan
keadaan pemuatan — datanya sudah tiba dengan selamat, isinya saja yang
nol — dan sudah ditangani masing-masing komponen sejak Minggu 03.
========================================================================== */
export default function DataState({ status, galat, onCobaLagi, children }) {
  if (status === "memuat") {
    /* role="status" membuat pembaca layar mengumumkan teks ini ketika
muncul, tanpa memotong apa yang sedang dibacanya. */
    return (
      <p className="memuat" role="status">
        Memuat data antrean…
      </p>
    );
  }
  if (status === "galat") {
    return (
      <section aria-labelledby="judul-galat-muat">
        <h2 id="judul-galat-muat">Data antrean tidak dapat dimuat</h2>
        {/* role="alert" untuk yang sifatnya menghalangi: pembaca layar
mengumumkannya segera. */}
        <p className="pesan-galat" role="alert">
          {galat.message}
        </p>
        <p>
          <button type="button" onClick={onCobaLagi}>
            Coba lagi
          </button>
        </p>
      </section>
    );
  }
  return children;
}
