import { useQueue } from "../useQueue.js";
import {
  currentCalled,
  waitingQueues,
  myQueue,
} from "../queue.js";
import Layout from "../components/Layout.jsx";
import QueueDisplay from "../components/QueueDisplay.jsx";
import QueueStatus from "../components/QueueStatus.jsx";
import StatusLegend from "../components/StatusLegend.jsx";

export default function HomePage() {
  const { state } = useQueue();

  return (
    <Layout
      judul="Antrean Saat Ini"
      aktif="index.html"
      catatan="Minggu 06: React + Vite. Data antrean masih tersimpan di peramban ini."
    >
      <QueueDisplay
        dipanggil={currentCalled(state)}
        menunggu={waitingQueues(state)}
      />
      <QueueStatus antrean={myQueue(state)} tautanAmbil />
      <StatusLegend />
    </Layout>
  );
}