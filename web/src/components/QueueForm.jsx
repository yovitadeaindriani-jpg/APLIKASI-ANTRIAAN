export default function QueueForm({ onAmbil }) {
  function tanganiSubmit(event) {
    /* Sama seperti Minggu 05: tanpa ini peramban mengirim form dan memuat
ulang halaman. Yang berubah hanya tempatnya — dulu dipasang dengan
addEventListener, sekarang dioper sebagai prop onSubmit. */
    event.preventDefault();
    onAmbil();
  }
  return (
    <section aria-labelledby="judul-ambil">
      <h2 id="judul-ambil">Ambil Nomor</h2>
      <form id="form-ambil" onSubmit={tanganiSubmit}>
        <fieldset>
          <legend>Konfirmasi pengambilan antrean</legend>
          <p>
            Nomor antrean akan dibuatkan untuk Anda. Anda tidak perlu mengisi
            data apa pun.
          </p>
          <button type="submit">Ambil Nomor Antrean</button>
        </fieldset>
      </form>
    </section>
  );
}
