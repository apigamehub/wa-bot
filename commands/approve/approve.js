const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require('axios');

module.exports = {
    name: "trf_update",
    aliases: ["tfs"],
    category: "approve",
    permissions: {
        acc: true,
        private: true
    },
    code: async (ctx) => {
		const rupiah = (number)=>{
			return new Intl.NumberFormat("id-ID", {
			  style: "currency",
			  currency: "IDR"
			}).format(number);
		}		
		let senderNumber = tools.general.getID(ctx.sender.jid);
		let listText = `❌Contoh: ${config.bot.prefix}tfs cancel/kirim 1234`;	
		let input = ctx.quoted?.conversation || ctx.quoted?.extendedTextMessage?.text || Object.values(ctx.quoted || {}).find(msg => msg?.caption || msg?.text)?.caption || ctx.args.slice(ctx.args[0]?.length === 2 ? 1 : 0).join(" ") || null;
		if (!input) {
			return await ctx.reply(quote(listText));
		}	
        const params = input.split(' ').map(param => param.trim());
        const [status, ...targets] = params;
		const target = targets.join(' ');
		
        if (!status || !target) {
			return await ctx.reply(quote(listText));
		}			
		
		try {
			const response = await axios.post(`${config.apis.base_api}/api/h2h/transfer/status`, {
				reference: target,
				pad: status,
				senderNumber: senderNumber,
			});
			
			const data = response.data;
			console.log(data);
			
			if(data.code == '-2') {
				return await ctx.reply(quote(`${data.msg}`));
			}else if(data.code == '-1') {
				return await ctx.reply(quote(`${data.msg}`));
			} else {
				const plus = Number(data.nom) + Number(data.fee);
				const text = `
*Halo ${data.nama}*\n\n` +
`Transaksi Penarikan Dana untuk No reference *${data.reference}* telah *${data.status}*\n` +							
`Berikut detailnya:\n` +
`• Reference: *${data.reference}*\n` +
`• Bank: *${data.bank}*\n` +
`• Dikirim ke: *${data.dst}*\n` +
`• Nama: *${data.nama}*\n` +
`• Diterima: *${rupiah(data.nom)}*\n` +
`• Fee: *${rupiah(data.fee)}*\n` +					
`• Total (w/ Fee): *${rupiah(plus)}*\n` +
`• Status: *${data.status}*\n\n` +
`Terimakasih`;		
				ctx.sendMessage(data.sender, { text });
				ctx.reply(quote(`${data.msg}`));
								
				
			}
			
        } catch (error) {
            consolefy.error(`Error: ${error}`);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};