const {
    bold,
    italic,
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const moment = require("moment-timezone");

module.exports = {
    name: "menu",
    aliases: ["allmenu", "help", "list", "listmenu", "bantuan"],
    category: "general",
	permissions: {
		acc: false,
        group: true
    },	
    code: async (ctx) => {
        try {
            const {
                cmd
            } = ctx.bot;
            const tag = {
                "misc": "Daftar Harga Game",
                //"pulsa": "Daftar Harga Pulsa",
                "entertainment": "Daftar Harga Entertainment",
				"topup": "TopUp Layanan",
				"player": "Cek Player",
				"information": "Informasi"
            };

            let text = `Hai @${tools.general.getID(ctx.sender.jid)}, berikut adalah daftar perintah yang tersedia!\n` +
                "\n" +
                `${quote(`Tanggal: ${moment.tz(config.system.timeZone).locale("id").format("dddd, DD MMMM YYYY")}`)}\n` +
                `${quote(`Waktu: ${moment.tz(config.system.timeZone).format("HH.mm.ss")}`)}\n` +
                "\n" +
                `${quote(`Uptime: ${tools.general.convertMsToDuration(Date.now() - config.bot.readyAt)}`)}\n` +
                "\n" +
                `${config.msg.readmore}\n`;

            for (const category of Object.keys(tag)) {
                const categoryCommands = Array.from(cmd.values())
                    .filter(command => command.category === category)
                    .map(command => ({
                        name: command.name,
                        aliases: command.aliases,
                        permissions: command.permissions || {}
                    }));

                if (categoryCommands.length > 0) {
                    text += `◆ ${bold(tag[category])}\n`;

                    categoryCommands.forEach(cmd => {
                        if (cmd.permissions.group);
                        if (cmd.permissions.owner);

                        text += quote(monospace(`${ctx.used.prefix + cmd.name}`));
                        text += "\n";
                    });

                }
            }

            return await ctx.sendMessage(ctx.id, {
                text,
                mentions: [ctx.sender.jid]
            });
        } catch (error) {
            consolefy.error(`Error: ${error}`);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};