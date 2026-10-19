/* =============================================================================
StatusLegend — keterangan arti setiap status
=============================================================================
Daftar definisi, karena isinya memang istilah dan penjelasannya. Penanda
yang sama sudah dipilih sejak Minggu 03.
========================================================================== */
export default function StatusLegend() {
  return (
    <section aria-labelledby="judul-keterangan">
      <h2 id="judul-keterangan">Keterangan Status</h2>
      <dl>
        <dt>WAITING</dt>
        <dd>Menunggu dipanggil.</dd>
        <dt>CALLED</dt>
        <dd>Sedang dipanggil. Silakan menuju loket.</dd>
        <dt>COMPLETED</dt>
        <dd>Sudah selesai dilayani.</dd>
      </dl>
    </section>
  );
}
