import { STATUS } from "../queue.js";
import { formatJam } from "../format.js";

function SelWaktu({ iso }) {
  if (!iso) return <td>—</td>;

  return (
    <td>
      <time dateTime={iso}>{formatJam(iso)}</time>
    </td>
  );
}

export default function QueueTable({ antrean, onSelesaikan }) {
  return (
    <section id="daftar-antrean" aria-labelledby="judul-daftar">
      <h2 id="judul-daftar">Daftar Antrean</h2>

      <div
        className="tabel-gulir"
        role="region"
        aria-label="Tabel daftar antrean"
        tabIndex={0}
      >
        <table>
          <caption>Antrean hari ini, urut dari yang terawal.</caption>

          <thead>
            <tr>
              <th scope="col">Nomor</th>
              <th scope="col">Status</th>
              <th scope="col">Dibuat</th>
              <th scope="col">Dipanggil</th>
              <th scope="col">Selesai</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {antrean.length === 0 ? (
              <tr>
                <td colSpan={6}>Belum ada antrean.</td>
              </tr>
            ) : (
              antrean.map((baris) => (
                <tr key={baris.id}>
                  <th scope="row">{baris.queueNumber}</th>
                  <td>{baris.status}</td>
                  <SelWaktu iso={baris.createdAt} />
                  <SelWaktu iso={baris.calledAt} />
                  <SelWaktu iso={baris.completedAt} />

                  <td>
                    {baris.status === STATUS.CALLED && (
                      <button
                        type="button"
                        onClick={() => onSelesaikan(baris.id)}
                      >
                        Selesaikan
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
