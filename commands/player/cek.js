const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require('axios');

module.exports = {
    name: "cek",
    aliases: ["cekplayer", "cekign", "check", "cariplayer", "cari"],
    category: "player",
	permissions: {
		acc: false,
        group: true
    },	
    code: async (ctx) => {
		const rupiah = (number)=>{
			return new Intl.NumberFormat("id-ID", {
			  style: "currency",
			  currency: "IDR"
			}).format(number);
		}		
		let senderNumber = tools.general.getID(ctx.sender.jid);
		let listText = `❌ Semua parameter (target_code target) diperlukan, *${config.bot.name}* akan memberi Contoh:

${quote(`Format cek: ${config.bot.prefix}cek target_code user_id`)}

List target kode Game:
${quote(`mlbb (Mobile Legends)`)}
${quote(`genshin (Genshin Impact)`)}
${quote(`ff (Free Fire / Free Fire MAX)`)}
${quote(`mcgg (Magic Chess: GO GO)`)}
${quote(`tomjerry (Tom and Jerry: Chase)`)}
${quote(`speed (Speed Drifters)`)}
${quote(`marvelsnap (Marvel SNAP)`)}
${quote(`marvelduel (Marvel DUEL)`)}
${quote(`reve (Revelation: Infinite Journey)`)}
${quote(`punchman (ONE PUNCH MAN: The Strongest)`)}
${quote(`lifeafter (Life After)`)}
${quote(`sus (Super SUS)`)}
${quote(`sausage (Sausage Man)`)}
${quote(`dragonraja (Dragon Raja SEA)`)}
${quote(`honkairail (Honkai: Star Rail)`)}
${quote(`zzz (Zenless Zone Zero)`)}
${quote(`sky (Sky: Children of the Light)`)}
${quote(`egg (Eggy Party)`)}
${quote(`identity (Identity V)`)}
${quote(`harrypotter (Harry Potter: Magic Awakened)`)}
${quote(`fcmobile (EA SPORTS FC™ Mobile)`)}
${quote(`aethergazer (Aether Gazer)`)}
${quote(`laplace (Laplace M)`)}
${quote(`honkai (Honkai Impact 3)`)}
${quote(`aov (Arena Of Valor)`)}
${quote(`roeternal (Ragnarok M Eternal Love)`)}
${quote(`cod (Call Of Duty Mobile)`)}

List target kode Entertainment:
${quote(`lita (Lita)`)}
${quote(`bigo (Bigo Live)`)}

Contoh:
${quote(`${config.bot.prefix}cek mlbb 877851782 10683`)}
${quote(`${config.bot.prefix}cek ff 8551852055`)}
${quote(`${config.bot.prefix}cek mcgg 4759636 4071`)}
`;	
		let input = ctx.quoted?.conversation || ctx.quoted?.extendedTextMessage?.text || Object.values(ctx.quoted || {}).find(msg => msg?.caption || msg?.text)?.caption || ctx.args.slice(ctx.args[0]?.length === 2 ? 1 : 0).join(" ") || null;
		if (!input) {
			return await ctx.reply(quote(listText));
		}	
        const params = input.split(' ').map(param => param.trim());
        const [target_code, ...targets] = params;
		const target = targets.join(' ');
		
        if (ctx.args[0] === "ff") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				//console.log(data);
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
        }else if (ctx.args[0] === "mlbb") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "genshin") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "mcgg") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "punchman") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "honkairail") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "zzz") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "lifeafter") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "harrypotter") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "identity") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "roeternal") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: target,
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "tomjerry") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "cod") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "speed") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "marvelsnap") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "aethergazer") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "laplace") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "aov") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "honkai") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "fcmobile") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "marvelduel") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "reve") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "sus") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "sausage") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "dragonraja") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "sky") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		}else if (ctx.args[0] === "egg") {
			try {
				
				const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/cek_player`, {
					target: ctx.args[1],
					target_code: ctx.args[0],
					tokens: config.apis.tokens,
				});
				
				const data = response.data;
				
				if(data.code === 'x_ok') {
					return await ctx.reply(`${data.msg}`);
				} else {
					return await ctx.reply(`${data.msg}`);
				}
				
			} catch (error) {
				consolefy.error(`Error: ${error}`);
				return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
			}
		} else {
			return await ctx.reply(quote(`❌ Kami tidak menemukan target code yang kamu tuju.`));
		}
		
    }
};