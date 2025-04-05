// Impor modul dan dependensi yang diperlukan
const pkg = require("./package.json");
const {
    monospace,
    italic,
    quote
} = require("@mengkodingan/ckptw");

// Konfigurasi
global.config = {
    // Informasi bot dasar
    bot: {
        prefix: ".", // Karakter awalan perintah yang diizinkan
        // Konfigurasi autentikasi sesi bot
        authAdapter: {
            adapter: "default",
            default: {
                authDir: "state"
            }
        }
    },
	
	apis: {
		base_api: "https://api-v1.apigamehub.com",
		tokens: "TOKENS_TOKO"
	},

    // Pesan bot yang disesuaikan untuk situasi tertentu
    msg: {
        admin: quote("⛔ Perintah hanya dapat diakses oleh admin grup!"), // Pesan saat perintah hanya untuk admin
        banned: quote("⛔ Tidak dapat memproses karena Anda telah dibanned oleh Owner!"), // Pesan untuk pengguna yang dibanned
        botAdmin: quote("⛔ Tidak dapat memproses karena bot bukan admin grup ini!"), // Pesan jika bot bukan admin di grup
        botGroupMembership: quote("⛔ Tidak dapat memproses karena Anda tidak bergabung dengan grup bot! Ketik '/botgroup' untuk mendapatkan tautan grup bot."), // Pesan untuk pengguna yang tidak ada dalam grup
        cooldown: quote("🔄 Perintah ini sedang dalam cooldown, tunggu..."), // Pesan saat cooldown perintah
        group: quote("⛔ Perintah hanya dapat diakses dalam grup!"), // Pesan untuk perintah grup
        owner: quote("⛔ Perintah hanya dapat diakses Owner!"), // Pesan untuk perintah yang hanya owner bisa akses
        private: quote("⛔ Perintah hanya dapat diakses dalam obrolan pribadi!"), // Pesan untuk perintah obrolan pribadi
        restrict: quote("⛔ Perintah ini telah dibatasi karena alasan keamanan!"), // Pesan pembatasan perintah
        acc: quote("⛔ Perintah ini dibatasi, hanya pemilik yang bisa menggunakan!"), // Pesan pembatasan perintah
        readmore: "\u200E".repeat(4001), // String read more

        wait: quote("🔄 Tunggu sebentar..."), // Pesan loading
        notFound: quote("❎ Tidak ada yang ditemukan! Coba lagi nanti."), // Pesan item tidak ditemukan
    },

    // Sistem bot
    system: {
		
		isAdminTrue: true, // Jangan dirubah
        alwaysOnline: true, // Bot selalu berstatus "online"
        antiCall: true, // Bot secara otomatis membanned orang yang menelepon
        autoMention: true, // Bot otomatis mention seseorang dalam pesan yang dikirim
        autoRead: true, // Bot baca pesan otomatis
        autoTypingOnCmd: true, // Tampilkan status "sedang mengetik" saat memproses perintah
        cooldown: 10 * 1000, // Jeda antar perintah (ms)
        port: 3000, // Port (jika pakai server)
        restrict: false, // Batasi akses perintah
        requireBotGroupMembership: false, // Harus gabung grup bot
        selfOwner: true, // Bot jadi owner sendiri
        selfReply: true, // Bot balas pesan bot sendiri
        timeZone: "Asia/Jakarta", // Zona waktu bot
        usePairingCode: true, // Pakai kode pairing untuk koneksi
        useServer: false // Jalankan bot dengan server
		
    }
};