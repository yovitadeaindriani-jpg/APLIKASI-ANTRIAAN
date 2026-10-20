import { currentCalled, waitingQueues } from "../queue.js";
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
  const state = {
    queues: antrean ?? [],
  };

  const dipanggil = currentCalled(state);
  const menunggu = waitingQueues(state);

  return (
    <Layout
      judul="Ambil Nomor Antrean"
      catatan="Minggu 07: routing dan lapisan data. Nomor dibuat di peramban ini."
    >
      {status === "memuat" ? (
        <p>Memuat data antrean...</p>
      ) : status === "galat" ? (
        <section>
          <p role="alert">
            {galat?.message ?? "Data antrean gagal dimuat."}
          </p>
          <button type="button" onClick={onMuatUlang}>
            Coba Lagi
          </button>
        </section>
      ) : (
        <>
          <section className="kartu-antrean">
            <h2>Antrean Saat Ini</h2>
            {dipanggil ? (
              <p>
                Nomor yang sedang dipanggil:{" "}
                <strong>{dipanggil.queueNumber}</strong>
              </p>
            ) : (
              <p>Belum ada antrean yang sedang dipanggil.</p>
            )}
            <p>Jumlah antrean menunggu: {menunggu.length}</p>
          </section>

          <section className="kartu-antrean">
            <h2>Nomor Antrean Anda</h2>
            {nomorSaya ? (
              <>
                <p className="nomor-antrean">
                  {nomorSaya.queueNumber}
                </p>
                <p>Status: {nomorSaya.status}</p>
                {nomorSaya.status === "WAITING" && (
                  <p>Silakan menunggu sampai nomor Anda dipanggil.</p>
                )}
              </>
            ) : (
              <p>Anda belum mengambil nomor antrean.</p>
            )}
          </section>

          <QueueForm
            onAmbil={onAmbil}
            sibuk={sibuk}
            pesan={pesan}
          />
        </>
      )}
    </Layout>
  );
}