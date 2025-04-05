const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "about",
    category: "information",
	permissions: {
        group: false
    },
    code: async (ctx) => {
        return await ctx.reply(quote(`👋 Halo! Saya adalah ${config.bot.name}, Saya bisa melakukan banyak perintah, seperti membeli layanan, cek player, cek harga layanan dan beberapa kegunaan lainnya. Saya di sini untuk membantu kamu!!`));
    }
};