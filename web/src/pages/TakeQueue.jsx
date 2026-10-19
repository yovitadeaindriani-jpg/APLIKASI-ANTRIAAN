import { useQueue } from "../useQueue.js";
import { currentCalled, myQueue } from "../queue.js";
import Layout from "../components/Layout.jsx";
import QueueForm from "../components/QueueForm.jsx";

export default function TakeQueue() {
  const { state, pesan, ambilNomor } = useQueue();

  const antreanSaya = myQueue(state);
  const sedangDipanggil = currentCalled(state);

  return (
    <Layout
      judul="Ambil Nomor Antrean"
      aktif="take-queue.html"
      catatan="Ambil nomor antrean untuk mendapatkan giliran pelayanan."
    >
      {sedangDipanggil && (
        <p>
          Antrean yang sedang dipanggil:{" "}
          <strong>{sedangDipanggil.queueNumber}</strong>
        </p>
      )}

      {!sedangDipanggil && (
        <p>Belum ada antrean yang sedang dipanggil.</p>
      )}

      <div className="grid-antrean">
        <QueueForm onAmbil={ambilNomor} />

        <section className="kartu-antrean">
          <h2>Nomor Antrean Anda</h2>

          {antreanSaya ? (
            <>
              <p className="nomor-antrean">
                {antreanSaya.queueNumber}
              </p>
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
              Perhatikan halaman{" "}
              <a href="index.html">Antrean Saat Ini</a>.
            </li>
            <li>Menuju loket ketika nomor Anda dipanggil.</li>
          </ol>
        </section>
      </div>

      {pesan && <p role="alert">{pesan}</p>}
    </Layout>
  );
}
