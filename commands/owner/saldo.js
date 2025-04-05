const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require('axios');


module.exports = {
    name: "saldo",
    aliases: ["balance", "uang", "hasil"],
    category: "owner",
    permissions: {
        owner: true,
		private: true
    },
    code: async (ctx) => {
		const rupiah = (number)=>{
			return new Intl.NumberFormat("id-ID", {
			  style: "currency",
			  currency: "IDR"
			}).format(number);
		}
		
        try {

			const response = await axios.post(`${config.apis.base_api}/v1/h2h/global/check`, {
				tokens: config.apis.tokens,
			});

			const data = response.data;
			if(data.code === "x_ok") {
				return await ctx.reply(quote(`Jumlah saldo kamu: ${rupiah(data.saldo)}`));
			}
			else if(data.code === "x_not_upgrade") {
				return await ctx.reply(quote(`❌ ${data.msg}`));
			}
			else if(data.code === "x_not_found") {
				return await ctx.reply(quote(`❌ ${data.msg}`));
			}
			else if(data.code === "x_errors") {
				return await ctx.reply(quote(`❌ ${data.msg}`));
			}
			else if(data.code === "x_disable") {
				return await ctx.reply(quote(`❌ ${data.msg}`));
			}
			else if(data.code === "x_args") {
				return await ctx.reply(quote(`❌ ${data.msg}`));
			} else {
				return await ctx.reply(quote(`️ Terjadi kesalahan`));
			}
			
        } catch (error) {
            consolefy.error(`Error: ${error}`);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};