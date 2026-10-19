import { formatJam } from "../format.js";
export default function QueueDisplay({ dipanggil, menunggu }) {
  return (
    <>
      <section id="antrean-saat-ini" aria-labelledby="judul-dipanggil">
        <h2 id="judul-dipanggil">Sedang Dipanggil</h2>
        {/* Dua keadaan, dipilih dengan ternary. Keadaan kosong bukan
pengecualian yang ditambahkan belakangan — ia salah satu dari dua
tampilan yang sama sahnya. */}
        {dipanggil ? (
          <>
            <p className="nomor-antrean">{dipanggil.queueNumber}</p>
            <p>Dipanggil pada pukul {formatJam(dipanggil.calledAt)}.</p>
          </>
        ) : (
          <>
            <p className="nomor-antrean">—</p>
            <p>Belum ada antrean yang dipanggil.</p>
          </>
        )}
      </section>
      <section aria-labelledby="judul-menunggu">
        <h2 id="judul-menunggu">Menunggu</h2>
        {menunggu.length === 0 ? (
          <p>Belum ada antrean yang menunggu.</p>
        ) : (
          <>
            <p>{menunggu.length} antrean masih menunggu.</p>
            {/* key memakai id antrean karena unik dan tidak berpindah.
Indeks array tidak memenuhi keduanya: menghapus satu antrean
menggeser indeks seluruh sisanya. */}
            <ul className="daftar-nomor">
              {menunggu.map((antrean) => (
                <li key={antrean.id}>{antrean.queueNumber}</li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
