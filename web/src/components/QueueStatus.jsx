export default function QueueStatus({ antrean, tautanAmbil = false }) {
  return (
    <section aria-labelledby="judul-status-saya">
      <h2 id="judul-status-saya">Antrean Saya</h2>

      {antrean ? (
        <>
          <p>Nomor antrean: {antrean.queueNumber}</p>
          <p>Status: {antrean.status}</p>
        </>
      ) : (
        <p>Anda belum mengambil nomor antrean.</p>
      )}

      {tautanAmbil && (
        <p>
          <a href="take-queue.html">Ambil nomor antrean</a>
        </p>
      )}
    </section>
  );
}
