/* =============================================================================
AdminDashboardPage — Dashboard Petugas (/admin/dashboard)
========================================================================== */
import { currentCalled, nextInLine, summary } from "../queue.js";
import Layout from "../components/Layout.jsx";
import DataState from "../components/DataState.jsx";
import AdminPreview from "../components/AdminPreview.jsx";
import QueueTable from "../components/QueueTable.jsx";
export default function AdminDashboardPage({
  status,
  galat,
  antrean,
  pesan,
  sibuk,
  onPanggil,
  onSelesaikan,
  onMuatUlang,
}) {
  return (
    <Layout
      judul="Dashboard Petugas"
      petugas
      catatan="Minggu 07: routing dan lapisan data. Data antrean masih hidup di peramban ini — belum
ada API maupun database."
    >
      <DataState status={status} galat={galat} onCobaLagi={onMuatUlang}>
        <AdminPreview
          ringkasan={summary(antrean)}
          dipanggil={currentCalled(antrean)}
          berikutnya={nextInLine(antrean)}
          pesan={pesan}
          sibuk={sibuk}
          onPanggil={onPanggil}
        />
        <QueueTable
          antrean={antrean}
          sibuk={sibuk}
          onSelesaikan={onSelesaikan}
        />
      </DataState>
    </Layout>
  );
}
