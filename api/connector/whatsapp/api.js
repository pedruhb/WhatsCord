const { logger } = require("../../logger.js")
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { handleCommand } = require("../../../chat/CommandHandler.js");

let client;

async function InitConnector() {

	const ms = new Date().getMilliseconds()

	logger.info(`WhatsApp connector is ${process.env.WHATSAPP_ENABLED == "true" ? "enabled" : "disabled"}.`);

	if (process.env.WHATSAPP_ENABLED == "false") return;

	client = new Client({
		authStrategy: new LocalAuth({
			dataPath: "./data/auth",
		})
	});

	client.on("qr", (qr) => {
		qrcode.generate(qr, { small: true });
		logger.info("Waiting WhatsApp Web QR");
	});

	client.on("ready", () => {
		logger.info(`WhatsApp connector started in ${new Date().getMilliseconds() - ms}ms.`);
	});

	client.on("message", async (message) => {

		logger.debug(`[WHATSAPP] NEW MESSAGE`, message);

		if (message.body.startsWith(process.env.COMMAND_PREFIX)) {

			message.bot.reply = async (text) => {
				await message.reply(text);
			}

			await handleCommand(message);
		}

	});

	client.initialize();

}

function getClient() {
	return client;
}

module.exports = { InitConnector, getClient }