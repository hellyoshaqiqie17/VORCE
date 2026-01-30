# Vorce HR Platform

Halo! Ini adalah repo untuk project **Vorce HR**. Isinya gabungan antara landing page buat marketing sama dashboard admin buat ngurusin kebutuhan HR (absensi, reimbursement, chat, dll).

## Fitur Utama

### 1. Landing Page (Public)
Halaman depan yang bisa diakses siapa aja.
- **Dinamis**: Konten teks dan gambar bisa diedit langsung lewat CMS di admin panel.
- **Showcase Fitur**: Ada section "Pink", "Cyan", "Purple" (ini nama kode buat section fiturnya) yang nampilin keunggulan produk.
- **Testimonial**: Slider buat nampilin review user.

### 2. Admin Dashboard (HRMS)
Pusat kontrol buat admin perusahaan. Login via `/admin`.
- **Dashboard**: Ringkasan statistik harian (siapa yang masuk, tugas pending, dll).
- **Attendance**: Log absensi karyawan plus lokasi (maps placeholder).
- **Tasks**: Manajemen tugas model Kanban board.
- **Reimburse**: Cek dan approve request klaim duit dari karyawan.
- **Chat**: Fitur ngobrol internal antar tim.
- **Contacts**: Direktori kontak semua karyawan.
- **CMS Editor**: Ini fitur killer-nya. Admin bisa ganti konten landing page (Header, Banner, Features, Testimoni) langsung dari sini tanpa perlu nyentuh kodingan.

## Cara Jalanin Project

Standar Next.js kok, gak ribet.

1.  **Install Dependensi**
    Pastikan udah ada Node.js, terus jalanin:
    ```bash
    npm install
    ```

2.  **Jalanin Server Dev**
    Buat mulai develop:
    ```bash
    npm run dev
    ```

3.  **Buka di Browser**
    Akses di `http://localhost:3000`.

## Struktur & Catatan Teknis

- **Font**: Kita pake **Montserrat** secara global. Pastikan gak ada font lain (kayak Axiforma atau Roboto) yang nyelip biar desainnya konsisten.
- **Styling**: 
  - Global style ada di `src/app/styles.css` dan `public/assets/css/style.css`.
  - Khusus Admin Sidebar & Topbar, kita pake `styled-jsx` dengan class yang diprefix `admin-` biar gak tabrakan sama style landing page.
- **Auth**: Saat ini login admin masih simulasi (mock) pake `localStorage`. Jadi kalo logout, tinggal clear storage atau klik tombol logout di sidebar.
- **Images**: Upload gambar dari CMS bakal masuk ke folder `public/assets/uploads`.

## Mau Kontribusi?

Boleh banget! Kalo mau nambah fitur atau benerin bug:
1.  Bikin branch baru.
2.  Coding yang rapi.
3.  Jangan lupa cek responsiveness-nya, terutama di bagian sidebar admin.

---
*Happy Coding! 🚀*
