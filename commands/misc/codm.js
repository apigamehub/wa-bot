const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
    name: "codm",
    aliases: ["cod", "hargacod"],
    category: "misc",
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
		const products = {
			'codm': {
				name: 'Call Of Duty Mobile',
                filter_code: 1004
            },			
		};
        const productKey = products['codm'];
		if (!productKey) {
			return ctx.reply(quote(`❌ Aduh, Bot tidak bisa menggunakan perintah ini`));
		}		
        try {
			
			await axios.post(`${config.apis.base_api}/api/h2h/get-account/info`, {
			  tokens: config.apis.tokens,
			}).then(response => {
				const info_account = response.data;
				console.log(info_account);
				if(info_account.status == false) {
					return ctx.reply(quote(`${info_account.msg}`));
				} else {
					const takeprofit = info_account.take_profit;
					CheckRspnse(takeprofit, productKey.filter_code);
					console.log(takeprofit);
				}					
			})
			.catch(error => {
				return ctx.reply(quote(`⚠️ Terjadi kesalahan`));
			});
			
			function CheckRspnse(takeprofit, filter, name) {
				axios.post(`${config.apis.base_api}/api/h2h/price-list/all`, {
					service_id: filter,
					tokens: config.apis.tokens,
				})
				.then(response => {
					const result = response.data.data;
					console.log(result);
						let listText = `
Hai @${tools.general.getID(ctx.sender.jid)},

${quote(`Tanggal: ${moment.tz(config.system.timeZone).locale("id").format("dddd, DD MMMM YYYY")}`)}
${quote(`Waktu: ${moment.tz(config.system.timeZone).format("HH.mm.ss")}`)}
${quote(`Uptime: ${tools.general.convertMsToDuration(Date.now() - config.bot.readyAt)}`)}

Bot telah menemukan layanan *${productKey.name}*
${quote(`_Ingin melakukan topup?_ ketik topup *provider_id* *tujuan*`)}

Contoh jika ingin topup:

*TIDAK MEMPUNYAI SERVER ID*
${quote(`_topup 1124 2272144724_`)}

*MEMPUNYAI SERVER ID*
${quote(`_topup 1000 877851782 10683_`)}

\n`;
					result.data.forEach((item) => {
						const profit = (takeprofit / 100) * item.harga;
						const finalPrice = Number(item.harga) + Number(Math.ceil(profit));
						if(item.status == "available") {
							var stats = `Tersedia`;
								
							listText += 
								`${quote(`*•••••••••••••••••••••••*`)}\n` +
								`${quote(`Items: *${item.name}*`)}\n` +
								`${quote(`Harga: *Rp ${rupiah(finalPrice)}*`)}\n` +
								`${quote(`Provider ID: *${item.provider_id}*`)}\n` +
								`${quote(`Status: *${stats}*`)}\n` +
								`${quote(`*•••••••••••••••••••••••*\n\n`)}` +
								`\n`;
									
						}
					});

					return ctx.reply(listText);									
				}).catch(error => {
                    msg.reply(`⚠️ Terjadi kesalahan`);
                    console.error('Error:', error);
                });				
			}
        } catch (error) {
            consolefy.error(`Error: ${error}`);
            if (error.status !== 200) return await ctx.reply(config.msg.notFound);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan`));
        }
    }
};