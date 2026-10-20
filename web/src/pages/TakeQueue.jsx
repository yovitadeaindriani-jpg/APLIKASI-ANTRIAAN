import { useQueue } from "../useQueue.js";
import { currentCalled, myQueue } from "../queue.js";
import Layout from "../components/Layout.jsx";
import QueueForm from "../components/QueueForm.jsx";

export default function TakeQueuePage({
  status,
  galat,
  antrean,
  nomorSaya,
  pesan,
  sibuk,
  onAmbil,
  onMuatUlang,
}) {
  const dipanggil = currentCalled(antrean);
  return (
    <Layout
      judul="Ambil Nomor Antrean"
      catatan="Minggu 07: routing dan lapisan data. Nomor dibuat di peramban ini dan belum dikirim ke
      mana pun."
    >
      <DataState status={status} galat={galat} onCobaLagi={onMuatUlang}>
        <p>
          {dipanggil
            ? `Antrean saat ini sudah sampai ${dipanggil.queueNumber}, dengan
            ${waitingQueues(antrean).length} antrean menunggu.`
            : "Belum ada antrean yang sedang dipanggil."}
        </p>
        {/* Halaman tidak mengambil nomor sendiri; ia meneruskan permintaan
        itu ke atas lewat callback yang diterimanya dari App. */}
        <QueueForm onAmbil={onAmbil} sibuk={sibuk} pesan={pesan} />
        <QueueStatus antrean={nomorSaya} />
      </DataState>

      <div className="grid-antrean">
        <QueueForm onAmbil={ambilNomor} />

        <section className="kartu-antrean">
          <h2>Nomor Antrean Anda</h2>

          {antreanSaya ? (
            <>
              <p className="nomor-antrean">{antreanSaya.queueNumber}</p>
              <p>Status: {antreanSaya.status}</p>
              <p>Simpan nomor ini.</p>
            </>
          ) : (
            <p>Anda belum mengambil nomor antrean.</p>
          )}
        </section>

        <section className="kartu-antrean">
          <h2>Selanjutnya</h2>
          <ol>
            <li>Simpan atau catat nomor antrean Anda.</li>
            <li>
              Perhatikan halaman <a href="index.html">Antrean Saat Ini</a>.
            </li>
            <li>Menuju loket ketika nomor Anda dipanggil.</li>
          </ol>
        </section>
      </div>

      {pesan && <p role="alert">{pesan}</p>}
    </Layout>
  );
}
