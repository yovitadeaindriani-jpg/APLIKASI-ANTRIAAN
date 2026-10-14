const HALAMAN_PENGUNJUNG = [
{ url: 'index.html', label: 'Antrean Saat Ini' },
{ url: 'take-queue.html', label: 'Ambil Nomor' },
{ url: 'admin-login.html', label: 'Masuk sebagai Petugas' },
];
const HALAMAN_PETUGAS = [
{ url: 'index.html', label: 'Antrean Saat Ini' },
{ url: 'take-queue.html', label: 'Ambil Nomor' },
{ url: 'admin-dashboard.html', label: 'Dashboard Petugas' },
{ url: 'admin-login.html', label: 'Keluar' },
];
export default function Layout({ judul, aktif, petugas = false, catatan, children }) {
const halaman = petugas ? HALAMAN_PETUGAS : HALAMAN_PENGUNJUNG;
return (
<>
<a className="lewati" href="#konten-utama">Lewati ke konten utama</a>
<header>
<p><strong>QueueApp</strong></p>
<nav aria-label="Navigasi utama">
<ul>
{halaman.map((item) => (
<li key={item.url}>
<a
href={item.url}
/* aria-current menandai halaman yang sedang dibuka, dan
CSS Minggu 04 memakai penanda itu untuk menebalkannya.
undefined membuat atributnya tidak ditulis sama sekali;
false akan ditulis sebagai aria-current="false". */
aria-current={item.url === aktif ? 'page' : undefined}
>
{item.label}
</a>
</li>
))}
</ul>
</nav>
</header>
<main id="konten-utama">
<h1>{judul}</h1>
{children}
</main>
<footer>
<p>QueueApp — reference implementation mata kuliah Web and Mobile Technology (BD323).</p>
<p>{catatan}</p>
</footer>
</>
);
}