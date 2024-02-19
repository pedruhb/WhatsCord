const { logger } = require("../../logger.js")
const { handleCommand } = require("../../../chat/CommandHandler.js");

let client;

async function InitConnector() {
        logger.info(`Discord connector is ${process.env.DISCORD_ENABLED == "true" ? "enabled" : "disabled"}.`);
}

function getClient() {
        return client;
}

module.exports = { InitConnector, getClient }