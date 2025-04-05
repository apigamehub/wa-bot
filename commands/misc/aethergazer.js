const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
    name: "aethergazer",
    aliases: [],
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
			'aethergazer': {
				name: 'Aether Gazer',
                filter_code: 1009
            },			
		};
        const productKey = products['aethergazer'];
		if (!productKey) {
			return ctx.reply(quote(`❌ Aduh, Bot tidak bisa menggunakan perintah ini`));
		}		
        try {
		
			await axios.post(`${config.apis.base_api}/v1/h2h/global/price_list`, {
					service_id: productKey.filter_code,
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
${quote(`_Ingin melakukan topup?_ ketik .topup *provider_id* *tujuan*`)}

Contoh jika ingin topup:

*TIDAK MEMPUNYAI SERVER ID*
${quote(`_.topup 1124 2272144724_`)}

*MEMPUNYAI SERVER ID*
${quote(`_.topup 1000 877851782 10683_`)}

\n`;
					result.forEach((item) => {
						const profit = (config.bot.profit / 100) * item.harga;
						const finalPrice = Number(item.harga) + Number(Math.ceil(profit));
						if(item.status == "available") {
							var stats = `Tersedia`;
								
							listText += 
								`${quote(`*•••••••••••••••••••••••*`)}\n` +
								`${quote(`Items: *${item.name}*`)}\n` +
								`${quote(`Harga: *Rp ${rupiah(finalPrice)}*`)}\n` +
								`${quote(`Provider ID: *${item.provider_id}*`)}\n` +
								`${quote(`Status: *${stats}*`)}\n` +
								`${quote(`*•••••••••••••••••••••••*`)}\n` +
								`\n`;
									
						}
					});

					return ctx.reply(listText);									
				}).catch(error => {
                    return ctx.reply(`⚠️ Terjadi kesalahan`);
                    console.error('Error:', error);
                });						
		
        } catch (error) {
            consolefy.error(`Error: ${error}`);
            if (error.status !== 200) return await ctx.reply(config.msg.notFound);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan`));
        }
    }
};