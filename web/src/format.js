/* ISO 8601 → jam dan menit setempat, misalnya "09.15".
Peramban yang menentukan formatnya, sesuai pengaturan bahasa pengguna. */
export function formatJam(iso) {
if (!iso) return '—';
return new Date(iso).toLocaleTimeString('id-ID', {
hour: '2-digit',
minute: '2-digit',
});
}
/* Nilai untuk atribut datetime pada elemen <time>, yang dibaca mesin. */
export function isoUntukAtribut(iso) {
return iso ?? '';
}