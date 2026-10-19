export default function AdminPreview({
  ringkasan,
  dipanggil,
  berikutnya,
  pesan,
  onPanggil,
}) {
  return (
    <>
      <section aria-labelledby="judul-ringkasan">
        <h2 id="judul-ringkasan">Ringkasan Hari Ini</h2>

        <dl>
          <dt>Sedang dipanggil</dt>
          <dd>{dipanggil ? dipanggil.queueNumber : '—'}</dd>

          <dt>Menunggu</dt>
          <dd>{ringkasan.waiting}</dd>

          <dt>Selesai</dt>
          <dd>{ringkasan.completed}</dd>
        </dl>
      </section>

      <section aria-labelledby="judul-aksi">
        <h2 id="judul-aksi">Aksi</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onPanggil();
          }}
        >
          <button
              type="button"
             onClick={onPanggil}
              >
              Panggil Antrean Berikutnya
          </button>
        </form>

        <p>
          {berikutnya
            ? `Antrean berikutnya yang akan dipanggil: ${berikutnya.queueNumber}.`
            : 'Belum ada antrean yang menunggu.'}
        </p>

        <p className="pesan-galat" role="alert">
          {pesan}
        </p>
      </section>
    </>
  );
}
