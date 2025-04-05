// Impor modul dan dependensi yang diperlukan
const {
    bold,
    italic,
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

async function get(type) {
    try {
        let text = "";

        const createList = (data, formatter) =>
            `${data.map(formatter).join(`\n${quote("─────")}\n`)}\n`;

        switch (type) {
            case "fixdb": {
                const data = [
                    "user (Data pengguna)",
                    "group (Data grup)",
                    "menfess (Data menfess)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "group": {
                const data = [
                    "open (Buka grup)",
                    "close (Tutup grup)",
                    "lock (Kunci grup)",
                    "unlock (Buka kunci grup)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "mode": {
                const data = [
                    "group (Mode group, hanya merespons dalam obrolan grup)",
                    "private (Mode private, hanya merespons dalam obrolan pribadi)",
                    "public (Mode publik, merespons dalam obrolan grup dan obrolan pribadi)",
                    "self (Mode self, hanya merespons dirinya sendiri dan ownernya)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "setoption": {
                const data = [
                    "antilink (Anti link)",
                    "antinsfw (Anti NSFW, seperti pornografi)",
                    "antispam (Anti spam)",
                    "antisticker (Anti stiker)",
                    "antitoxic (Anti toxic, seperti bahasa kasar)",
                    "autokick (Dikeluarkan secara otomatis, jika ada yang melanggar salah satu opsi 'anti...')",
                    "welcome (Sambutan member)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "setprofile": {
                const data = [
                    "autolevelup (Otomatis naik level)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "settext": {
                const data = [
                    "goodbye (Teks goodbye, variabel yang tersedia: %tag%, %subject%, %description%) (Atur pesan perpisahan)",
                    "intro (Teks intro)",
                    "welcome (Teks welcome, variabel yang tersedia: %tag%, %subject%, %description%) (Atur pesan selamat datang)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            default: {
                text = quote(`❎ Tipe tidak diketahui: ${type}`);
                break;
            }
        }

        return text;
    } catch (error) {
        consolefy.error(`Error: ${error}`);
        return null;
    }
}

module.exports = {
    get
};