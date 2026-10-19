/* =============================================================================
   AdminDashboardPage — Dashboard Petugas
============================================================================= */

import { currentCalled, nextInLine, summary } from "../queue.js";
import { useQueue } from "../useQueue.js";
import Layout from "../components/Layout.jsx";
import AdminPreview from "../components/AdminPreview.jsx";
import QueueTable from "../components/QueueTable.jsx";

export default function AdminDashboardPage() {
  const { state, pesan, panggilBerikutnya, selesaikan } = useQueue();

  return (
    <Layout
      judul="Dashboard Petugas"
      aktif="admin-dashboard.html"
      petugas
      catatan="Minggu 06: React + Vite. Data antrean masih hidup di peramban ini — belum ada API maupun database."
    >
      <AdminPreview
        ringkasan={summary(state)}
        dipanggil={currentCalled(state)}
        berikutnya={nextInLine(state)}
        pesan={pesan}
        onPanggil={panggilBerikutnya}
      />

      <QueueTable
        antrean={state.queues}
        onSelesaikan={selesaikan}
      />
    </Layout>
  );
}
