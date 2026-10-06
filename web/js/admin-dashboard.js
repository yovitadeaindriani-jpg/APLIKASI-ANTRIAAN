function barisUntuk(antrean) {
  const baris = document.createElement("tr");
  /* Nomor antrean adalah kepala baris, bukan sel biasa — penanda yang
sama dengan markup statis Minggu 03 agar pembaca layar membacakan
sel lain relatif terhadap nomornya. */
  const nomor = document.createElement("th");
  nomor.scope = "row";
  nomor.textContent = antrean.queueNumber;
  baris.append(nomor);
  const status = selUntuk(antrean.status);
  /* Atribut inilah yang diwarnai dan diberi bentuk oleh CSS Minggu 04. */
  status.dataset.status = antrean.status;
  baris.append(status);
  baris.append(selWaktu(antrean.createdAt));
  baris.append(selWaktu(antrean.calledAt));
  baris.append(selWaktu(antrean.completedAt));
  const aksi = document.createElement("td");
  if (antrean.status === STATUS.CALLED) {
    const tombol = document.createElement("button");
    tombol.type = "button";
    tombol.textContent = `Selesaikan ${antrean.queueNumber}`;
    tombol.dataset.selesaikan = String(antrean.id);
    aksi.append(tombol);
  } else {
    aksi.textContent = "—";
  }
  baris.append(aksi);
  return baris;
}
function tampilkanAksi() {
  const berikutnya = nextInLine();
  el("berikutnya").textContent = berikutnya
    ? `Antrean berikutnya yang akan dipanggil: ${berikutnya.queueNumber}.`
    : "Belum ada antrean yang menunggu.";
  /* Tombol dimatikan ketika tidak ada yang bisa dipanggil. UI membatasi,
tetapi queue.js tetap menolak permintaannya seandainya tombol ini
ditekan dengan cara lain — pembatasan di layar bukan pengamanan. */
  el("tombol-panggil").disabled = berikutnya === null;
}
function pesan(teks) {
  el("pesan-aksi").textContent = teks;
}
function render() {
  tampilkanRingkasan();
  tampilkanAksi();
  tampilkanTabel();
}
/* ---- Aksi ---------------------------------------------------------------- */
el("form-panggil").addEventListener("submit", (event) => {
  event.preventDefault();
  const hasil = callNext();
  pesan(hasil.ok ? "" : hasil.message);
  render();
});
/* Satu pendengar di tbody, bukan satu pendengar per tombol. Baris dibuat
ulang setiap render, sehingga pendengar yang menempel pada tombol akan
ikut hilang; pendengar di induknya tetap bekerja untuk baris yang belum
ada saat kode ini dijalankan. */
el("isi-antrean").addEventListener("click", (event) => {
  const tombol = event.target.closest("[data-selesaikan]");
  if (!tombol) return;
  const hasil = completeQueue(Number(tombol.dataset.selesaikan));
  pesan(hasil.ok ? "" : hasil.message);
  render();
});
render();
