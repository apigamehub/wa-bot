# Apigamehub Whatsapp bot TopUp

`Apigamehub wa-bot` adalah bot WhatsApp.

Bot ini berguna untuk yang ingin membuat TopUp otomatis di Whatsapp tanpa harus repot-repot untuk buka website mana-pun.

## Cara Memulai

Ikuti langkah-langkah berikut untuk mengatur dan menjalankan `ckptw-wabot`:

### 1. Kloning Repositori

Pertama, kloning repositori dan masuk ke direktori proyek:

```bash
git clone https://github.com/apigamehub/wa-bot.git
cd wa-bot
```

### 2. Instalasi Dependensi

Instal semua dependensi yang dibutuhkan dengan perintah berikut:

```bash
npm install
```

### 3. Konfigurasi

Pastikan kamu sudah terdaftar di [Apigamehub](https://apigamehub.com/).
lalu membuat Toko dan pergi ke halaman [Bot Whatsapp](https://apigamehub.com/dashboard/bot/config) dan copy tokens
lalu edit file config.js
```bash
apis: {
  base_api: "https://api-v1.apigamehub.com",
  tokens: "MASUKAN TOKENS TOKO DISINI"
}
```

setelah itu masukan nomor Bot, Nomor Owner dan nama bot di Halaman Bot Whatsapp

## Menjalankan Bot

Setelah konfigurasi selesai, Anda dapat menjalankan bot dengan dua opsi berikut:

### 1. Jalankan Secara Langsung

Untuk menjalankan bot secara langsung di terminal, gunakan perintah:

```bash
npm start
```

Bot akan berjalan hingga Anda menutup terminal atau menghentikannya secara manual.

### 2. Jalankan dengan PM2

Jika Anda ingin menjalankan bot sebagai layanan latar belakang (background process) yang tetap aktif meskipun terminal ditutup, gunakan PM2:

```bash
npm run start:pm2
```

## Autentikasi WhatsApp

Metode autentikasi yang dapat digunakan untuk menghubungkan bot ke akun WhatsApp Anda:

### Menggunakan Kode Pairing

- Setelah bot dijalankan, kode pairing akan ditampilkan di terminal.
- Buka aplikasi WhatsApp di ponsel, pilih menu **Perangkat Tertaut**, lalu ketuk **Tautkan Perangkat**.
- Masukkan kode pairing yang ditampilkan di terminal untuk menautkan akun WhatsApp dengan bot.

Setelah proses autentikasi berhasil, bot siap untuk menerima dan merespons pesan sesuai dengan perintah yang diberikan.

## Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).
