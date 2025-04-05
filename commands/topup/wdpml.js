const {
	MessageType,
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const moment = require("moment-timezone");
const fs = require('fs');
const path = require('path');
const mime = require("mime-types");

module.exports = {
    name: "wdpml",
    aliases: ["beliwdp", "wdpmurah", "wdp", "wdpmlbb"],
    category: "topup",
	permissions: {
		acc: false,
        group: true
    },	
    code: async (ctx) => {		
		let listText = `
❌ Target (USER_ID ZONE_ID) diperlukan.

*${config.bot.name}* akan memberi Contoh:

${quote(`Format order: ${config.bot.prefix}wdpml user_id zone_id`)}
${quote(`Contoh: ${config.bot.prefix}wdpml 877851782 10683`)}
`;
		let input = ctx.quoted?.conversation || ctx.quoted?.extendedTextMessage?.text || Object.values(ctx.quoted || {}).find(msg => msg?.caption || msg?.text)?.caption || ctx.args.slice(ctx.args[0]?.length === 2 ? 1 : 0).join(" ") || null;
		if (!input) {
			return await ctx.reply(listText);
		}	
        const params = input.split(' ').map(param => param.trim());
        const [...targets] = params;
		const target = targets.join(' ');
		const reffId = Math.floor(Math.random() * (99999999999 -  10000000000)) + 10000000000;
		const senderNumber = tools.general.getID(ctx.sender.jid);
		const senderMe = senderNumber + "@c.us";
		const tmpFilePath = path.join(__dirname, '../../tmp/orders.json');
		let orderData = {};

        if (!target) {
			return await ctx.reply(listText);
		}			
		const rupiah = (number)=>{
			return new Intl.NumberFormat("id-ID", {
			  style: "currency",
			  currency: "IDR"
			}).format(number);
		}
		
		if (fs.existsSync(tmpFilePath)) {
		
			try {
				var path_data = JSON.parse(fs.readFileSync(tmpFilePath, 'utf8'));
				if (path_data[senderNumber]) {
					return ctx.reply(
						`❌ *Maaf, ${config.bot.name} tidak bisa meneruskan pembelian*\nDikarenakan kamu masih memiliki transaksi yang belum selesai. Tunggu hingga pembayaran selesai, kadaluarsa, atau gagal untuk membuat transaksi baru.`
					);
				}					
				const date = new Date();
				const currentDate = new Date(date.toLocaleString('id-ID', {
					timeZone: 'Asia/Jakarta'
				}));

				axios.post(`${config.apis.base_api}/v1/h2h/global/price_list`, {
					tokens: config.apis.tokens,
				})
				.then(response => {
					//const data = response.data;
					const data = response.data.data;
					const produk = data.find(item => item.provider_id == "1122");
					const profit = (config.bot.profit / 100) * produk.harga;
					const finalPrice = Number(produk.harga) + Math.ceil(profit);
					const produkDetail = `*Nama Produk:* ${produk.name}\n*Layanan:* ${produk.name_cat}\n*Provider ID:* ${produk.provider_id}`;
					const produk_kode = produk.code;
					const produk_name = produk.name_cat;
					console.log(target);
					console.log(produk_kode);
					performDeposit(produkDetail, finalPrice, target, produk_kode, produk_name);
				})
				.catch(error => {
					consolefy.error(error);
					return ctx.reply(quote(`❌ Aduh, Bot tidak bisa membuat transaksi ini.`));
				});					
				
				function performDeposit(product, nominal, target, produk_kode, produk_name) {
				axios.post(`${config.apis.base_api}/v1/h2h/global/deposit/create`, {
					amount: nominal,
					number: senderNumber,
					target: target,
					target_code: produk_kode,
					tokens: config.apis.tokens,
				})
				.then(response => {
					const data = response.data;
					console.log(data);
					console.log(data.code);
					
					if (data.code === 'x_not_found') {
						return ctx.reply(quote(`❌ ${data.msg}`));
					}
					else if (data.code === 'x_args') {
						return ctx.reply(quote(`❌ ${data.msg}`));
					}
					else if (data.code === 'x_errors') {
						return ctx.reply(quote(`❌ ${data.msg}`));
					}
					else if (data.code === 'x_player_not_found') {
						return ctx.reply(quote(`❌ ${data.msg}`));
					} else {
						
					orderData[senderNumber] = {
					reffId: data.data.invoice_id,
					payId: data.data.reference,							
					createdAt: data.ts
					};
					fs.writeFileSync(tmpFilePath, JSON.stringify(orderData, null, 2));

					const text = `*${config.bot.name} berhasil membuat transaksi*\n\n
*Kode Pembayaran:* ${data.data.invoice_id}\n
*Nominal:* ${rupiah(data.data.amount)}\n
${product}\n
*Player:* ${data.player}\n\n
*Dibuat Pada:* ${data.ts}\n\n
*Note:* Pembayaran akan otomatis dibatalkan oleh bot dalam 5 menit lagi!`;

					checkPaymentStatus(data.data.reference, data.data.invoice_id, target, produk_kode, produk_name);
					
					return ctx.reply({
						image: {
							url: data.data.url_checkout
						},
						mimetype: mime.lookup("png"),
						caption: text
					});
					
					
					}
					})
					.catch(error => {
						console.log(error);
						return ctx.reply(quote(`❌ Bot sedang tidak bekerja`));
					});					
				}

				function checkPaymentStatus(payId, reffId, target, produk_kode, produk_name) {
					const timeout = setTimeout(() => {
						clearInterval(interval);

						axios.post(`${config.apis.base_api}/v1/h2h/global/deposit/cancel`, {
							refId: reffId,
							tokens: config.apis.tokens,
						})
						.then(response => {
							const data = response.data;
							if(data.code === "x_not_found") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}
							else if(data.code === "x_errors") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}
							else if(data.code === "x_args") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							} else {
								delete orderData[senderNumber];
								fs.writeFileSync(tmpFilePath, JSON.stringify(orderData, null, 2));		
								
								return ctx.reply(`⚠️ *${config.bot.name}* telah membatalkan transaksi, dikarenakan Bot belum menerima pembayaran ini setelah 5 menit~`);												
							}
						})
						.catch(err => {
							console.error(`err:`, err);
						});
					}, 300000);

					const interval = setInterval(() => {
						axios.post(`${config.apis.base_api}/v1/h2h/global/deposit/status`, {
							refId: reffId,
							tokens: config.apis.tokens,
						})
						.then(response => {
							const data = response.data;
							
							//new coded
							if(data.code === "x_args") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}
							else if(data.code === "x_not_found") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}
							else if(data.code === "x_errors") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}
							else if(data.code === "x_cancel") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}
							else if(data.code === "x_ok") {
								clearInterval(interval);
								clearTimeout(timeout);
								delete orderData[senderNumber];
								fs.writeFileSync(tmpFilePath, JSON.stringify(orderData, null, 2));
								
								performTopupTransaction(reffId, target, produk_kode, produk_name);
								
								return ctx.reply(`*Yeeey! Pembayaran Berhasil!*\n\n` + `• RefId: ${data.reference}\n` + `• Status: ${data.status}\n` + `• Diterima: ${rupiah(data.amount)}\n` + `• Tanggal: ${data.ts}\n\n` + `Terimakasih.`);
							}
							//new coded
						});
					}, 5000);
				}
				
				function performTopupTransaction(reffId, target, produk_kode, produk_name) {
					axios.post(`${config.apis.base_api}/v1/h2h/global/transaction_create`, {
						refId: reffId,
						provider: "1122",
						target: target,
						tokens: config.apis.tokens,
					})
					.then(response => {
						
						const data = response.data;
						console.log(data);
						
						if(data.code === "x_args") {
							clearInterval(interval);
							return ctx.reply(quote(`❌ ${data.msg}`));
						}
						else if(data.code === "x_not_found") {
							clearInterval(interval);
							return ctx.reply(quote(`❌ ${data.msg}`));
						}
						else if(data.code === "x_errors") {
							clearInterval(interval);
							return ctx.reply(quote(`❌ ${data.msg}`));
						} else {
							const text = `Tunggu~, *${config.bot.name}* sedang membelikan ini untukmu...`;
							checkTransactionStatus(reffId, produk_kode, target, produk_name);	
							return ctx.reply(quote(`${text}`));
						}

						
					})
					.catch(error => console.error('Error:', error));
				}	

				function checkTransactionStatus(refId, produk_kode, target, produk_name) {
					const interval = setInterval(() => {
						axios.post(`${config.apis.base_api}/v1/h2h/global/transaction_status`, {
							refId: refId,
							tokens: config.apis.tokens,
						})
						.then(response => {
							const data = response.data;
							console.log(data);
							
							//new code
							if(data.code === "x_args") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}
							else if(data.code === "x_not_found") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}
							else if(data.code === "x_unkwn") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ ${data.msg}`));
							}else if(data.code === "x_gagal") {
								clearInterval(interval);
								return ctx.reply(quote(`❌ Tidak~, Transaksi ID *${data.refId}* gagal nih. lapor ke admin ya~`));
							} else {
								clearInterval(interval);
								const text = `*Yeey! ${config.bot.name}* berhasil membelikan *${data.service}* untukmu!\n\n` + `• Transaksi ID: *${data.refId}*\n` + `• Status: *${data.status}*\n` + `• Layanan: *${data.service}*\n` + `• Game: *${produk_name}*\n` + `• Target: *${target}*\n` + `• Player: *${data.username}*\n` + `• Tanggal: *${data.ts}*\n\n` + `Terimakasih.`;
								SendOd(data.refId);
								return ctx.reply(text);
							}
							//new code
						});	
					}, 5000);
				}

				function SendOd(refId) {
					const interval = setInterval(() => {
						axios.post(`${config.apis.base_api}/v1/h2h/global/transaction_status`, {
							refId: refId,
							tokens: config.apis.tokens,
						})
						.then(response => {
							const data = response.data;

							if (data.provider === 'sukses') {
								clearInterval(interval);
								const text = `*Halo @${tools.general.getID(ctx.sender.jid)},*\n\n` + `*_PEMBELIAN BERHASIL_*\n\n` + `• Transaksi ID: *${data.refId}*\n` + `• Status: *${data.provider}*\n\n` + `•••••••••••••••••••••••••••\n\n` + `••Detail Pembelian••\n\n` + `• SN: *${data.sn}*\n\n` + `Terimakasih.`;								
								return ctx.sendMessage(senderMe, { text });
							} else if (data.provider === 'gagal') {
								clearInterval(interval);
								const text = `*Halo @${tools.general.getID(ctx.sender.jid)},*\n\n` + `*_PEMBELIAN GAGAL SILAHKAN LAPOR KE ADMIN YA_*\n\n` + `• Transaksi ID: *${data.refId}*\n` + `• Status: *${data.provider}*\n\n` + `•••••••••••••••••••••••••••\n\n` + `••Detail Pembelian••\n\n` + `• SN: *${data.sn}*\n\n` + `Terimakasih.`;								
								return ctx.sendMessage(senderMe, { text });

							}
							
						});	
					}, 5000);	
				}				
					
			} catch (error) {
				var makedata = {};
				var strings = JSON.stringify(makedata);
				fs.writeFileSync(tmpFilePath, strings);	
				consolefy.error(`Error: ${error}`);
				if (error.status !== 200) return await ctx.reply(config.msg.notFound);
				return await ctx.reply(quote(`❌ Terjadi kesalahan`));
			}
		} else {
			return await ctx.reply(quote(`❌️ Path order tidak ada.`));					
		}	
    }
};