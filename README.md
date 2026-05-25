# Cyberpunk CV Website - Muhamad Tomi Tobuhita

Website portfolio curriculum vitae (CV) premium dengan tema **Cyberpunk Modern** yang dibangun menggunakan teknologi web vanilla (HTML5, CSS3, & JavaScript) yang dioptimalkan untuk performa tinggi, aksesibilitas dasar (a11y), ramah SEO, dan responsif sepenuhnya.

---

## 📂 Struktur Proyek
```text
tomi-cyberpunk-cv/
│
├── assets/
│   └── cyberpunk_avatar.png   # Avatar futuristik Muhamad Tomi Tobuhita (AI-generated)
│
├── index.html                 # Struktur utama halaman web (Semantic HTML)
├── styles.css                 # File desain & tata letak CSS (Cyberpunk Variables & Print Settings)
├── script.js                  # Engine interaksi (Particles, Typewriter, Scrollspy, & Print Engine)
└── README.md                  # Panduan penggunaan (Dokumen ini)
```

---

## ⚡ Cara Menjalankan Secara Lokal

Anda dapat menjalankan website ini secara lokal melalui beberapa cara mudah:

### Opsi 1: Klik Ganda Langsung (Paling Sederhana)
Cukup buka folder proyek lalu **klik ganda file `index.html`** untuk membukanya di browser apa pun (Chrome, Edge, Firefox, Safari).

### Opsi 2: Menggunakan Server Lokal (Direkomendasikan)
Untuk performa optimal dan menghindari isu pembatasan browser terkait pemuatan aset lokal, Anda dapat menggunakan server HTTP sederhana:
* **NodeJS (`http-server` / `live-server`):**
  ```bash
  npx live-server
  # atau
  npx http-server
  ```
* **Python (Bawaan):**
  ```bash
  python -m http.server 8000
  ```
  Kemudian akses `http://localhost:8000` pada web browser Anda.

---

## 🛠️ Panduan Kustomisasi Konten

Seluruh kode dirancang agar bersih dan mudah dimodifikasi:

1. **Mengubah Nama & Tagline:**
   * Buka `index.html` dan cari tag `<h1>` berisi `MUHAMAD TOMI TOBUHITA` untuk mengganti nama utama.
   * Cari tag `<span>` dengan id `typing-effect` dan edit nilai pada atribut `data-strings` untuk mengubah keahlian/tagline bergantian yang diketik di header.

2. **Mengubah Riwayat Pengalaman & Edukasi:**
   * Di `index.html`, navigasikan ke bagian `<section id="experience">` atau `<section id="education">`.
   * Ganti teks nama perusahaan, jabatan, tanggal, dan deskripsi tugas pada masing-masing kartu kontainer kelas `.cyber-card`.

3. **Mengubah Informasi Kontak:**
   * Cari bagian `<section id="contact">` pada `index.html`.
   * Edit URL tautan surat (`mailto:`), nomor telepon (`tel:`), GitHub, dan LinkedIn agar merujuk ke data asli Anda.

---

## 🔋 Mode Performa (Low-Power Device)

Website ini dilengkapi dengan **Mode Hemat Daya / Static Mode** untuk mengurangi beban CPU/GPU pada komputer lama atau layar kecil:
* **Secara Interaktif:** Pengguna dapat menekan tombol **"ANIMATION ON"** di bagian kanan atas navigasi header untuk membekukan partikel background menjadi grid statis yang hemat daya.
* **Secara Default (Melalui Kode):** Jika Anda ingin mematikan animasi partikel secara default langsung dari awal muat halaman, buka `script.js` lalu ubah variabel `let isAnimationActive = true;` menjadi `let isAnimationActive = false;` di dalam fungsi `initParticleBackground()`.
* **Mobile-Friendly:** Sistem partikel secara otomatis mengurangi jumlah partikel ke tingkat minimum (20 partikel) dan membekukannya di layar ponsel (<768px) untuk menghemat baterai ponsel pengguna.

---

## 🖨️ Menyimpan Sebagai PDF (Download CV)

Tombol **"DOWNLOAD CV"** menggunakan fitur cetak bawaan browser (`window.print()`).
Di dalam `styles.css`, telah ditambahkan modul CSS `@media print` khusus yang bertugas mereset dekorasi neon cyberpunk (warna neon gelap, canvas bergerak, scanlines, dan formulir input) menjadi format resume minimalis hitam-putih di atas kertas putih standar A4/Letter.

* **Cara menyimpan:** Klik tombol **Download CV**, lalu pilih opsi **"Save as PDF"** atau **"Simpan sebagai PDF"** pada kolom tujuan cetak browser Anda.
# Portofolio
