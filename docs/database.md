Pada Minggu 10, QueueApp mulai menggunakan database MySQL untuk menyimpan data antrean. Database dijalankan menggunakan Docker agar proses instalasi dan konfigurasi lebih mudah serta lingkungan pengembangan lebih konsisten.
Teknologi yang digunakan:
MySQL 8.0
Docker Compose
Node.js dan Express
mysql2
Schema dan Seed Database
Folder database digunakan untuk menyimpan file SQL yang diperlukan untuk inisialisasi database.
Folder tersebut dihubungkan ke container melalui:
./database:/docker-entrypoint-initdb.d:ro
File SQL di dalam folder tersebut dijalankan ketika MySQL pertama kali membuat database dengan volume yang masih kosong.
Jika schema atau seed diubah setelah database sudah dibuat, perubahan tidak otomatis dijalankan kembali
