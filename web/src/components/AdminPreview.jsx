export default function AdminPreview({
  ringkasan,
  dipanggil,
  berikutnya,
  pesan,
  sibuk,
  onPanggil,
}) {
  /* Sejak perbaikan Minggu 08, memanggil antrean berikutnya hanya boleh
ketika tidak ada lagi yang sedang dipanggil (FR-06). Keterangannya
dihitung di sini supaya JSX di bawah tidak berisi ternary bersarang. */
  const bolehMemanggil = dipanggil === null && berikutnya !== null;
  let keterangan;
  if (dipanggil) {
    keterangan = `Selesaikan ${dipanggil.queueNumber} lebih dulu sebelum memanggil antrean
berikutnya.`;
  } else if (berikutnya) {
    keterangan = `Antrean berikutnya yang akan dipanggil: ${berikutnya.queueNumber}.`;
  } else {
    keterangan = "Belum ada antrean yang menunggu.";
  }
  return (
    <>
      <section aria-labelledby="judul-ringkasan">
        <h2 id="judul-ringkasan">Ringkasan Hari Ini</h2>

        <dl>
          <dt>Sedang dipanggil</dt>
          <dd>{dipanggil ? dipanggil.queueNumber : "—"}</dd>

          <dt>Menunggu</dt>
          <dd>{ringkasan.waiting}</dd>

          <dt>Selesai</dt>
          <dd>{ringkasan.completed}</dd>
        </dl>
      </section>

      <section aria-labelledby="judul-aksi">
        <h2 id="judul-aksi">Aksi</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onPanggil();
          }}
        >
          {/* Tombol dimatikan ketika tidak ada yang bisa dipanggil, ketika
masih ada antrean yang sedang dipanggil, dan selama permintaan
sebelumnya berjalan. Meski begitu queue.js tetap menolak
permintaannya seandainya tombol ini ditekan dengan cara lain —
pembatasan di layar bukan pengamanan. */}
          <button type="submit" disabled={!bolehMemanggil || sibuk}>
            {sibuk ? "Memanggil…" : "Panggil Antrean Berikutnya"}
          </button>
        </form>
        <p>{keterangan}</p>
        <p className="pesan-galat" role="alert">
          {pesan}
        </p>
      </section>
    </>
  );
}
