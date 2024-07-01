# patron
Perancangan website pasar tradisional online

# Pengenalan struktur project
project ini memiliki 2 buah folder utama yaitu folder server sebagai backend dan client sebagai frontend.
server : menggunakan laravel 9 yang dijadikan sebagai rest api
client : menggunakan react yang akan melakukan fetching data ke bagian rest api nantinya.

# Menjalankan project
1. ketika baru menambahkan project ke lokal
  - masuk kedalam folder backend dengan perintah "cd server"
  - jalankan perintah composer install
  - jalankan perintah php artisan migrate
  - jalankan perintah php artisan serve

  - masuk kedalam folder frontend dengan perintah "cd client"
  - jalankan perintah npm install
  - jalankan perintah npm run dev

2. ketika project sudah ada di lokal
  - masuk ke folder backend dengan perintah "cd server"
  - jalankan perintah php artisan migrate
  - jalankan perintah php artisan serve

  - masuk kedalam folder frontend dengan perintah "cd client"
  - jalankan perintah npm run dev

# Commit rule
- feat: (membuat fitur baru)
- fix: (melakukan perbaikan pada bug dan lain lain)
- docs: (mengganti isi dari dokumentasi)
- style: (pemformatan, titik koma hilang, dll)

contoh perintah commit : 
"git commit -m "feat(auth) : menambahkan fitur login dan register" 
 
 note : dalam melakukan commit pastikan fitur dan hal lainnya pada project sudah aman saat dijalankan
