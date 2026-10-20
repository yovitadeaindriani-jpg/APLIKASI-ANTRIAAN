import { currentCalled, waitingQueues } from "../queue.js";
import Layout from "../components/Layout.jsx";
import QueueDisplay from "../components/QueueDisplay.jsx";
import QueueStatus from "../components/QueueStatus.jsx";
import StatusLegend from "../components/StatusLegend.jsx";

export default function HomePage({
  status,
  galat,
  antrean,
  nomorSaya,
  onMuatUlang,
}) {
  const state = {
    queues: antrean ?? [],
  };

  return (
    <Layout
      judul="Antrean Saat Ini"
      catatan="Minggu 08: checkpoint Web MVP. Seluruh alur antrean berjalan, tetapi datanya masih
      hidup di peramban ini — belum ada API maupun database."
    >
      {status === "memuat" ? (
        <p>Memuat data antrean...</p>
      ) : status === "galat" ? (
        <section>
          <p role="alert">{galat?.message ?? "Data antrean gagal dimuat."}</p>
          <button type="button" onClick={onMuatUlang}>
            Coba Lagi
          </button>
        </section>
      ) : (
        <>
          <QueueDisplay
            dipanggil={currentCalled(state)}
            menunggu={waitingQueues(state)}
          />
          <QueueStatus antrean={nomorSaya} tautanAmbil />
        </>
      )}

      <StatusLegend />
    </Layout>
  );
}
