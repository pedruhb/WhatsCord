const path = require("node:path");
const fs = require("node:fs");
const { logger } = require("../api/logger");

let commands = { "common": [], "whatsapp": [], "discord": [] };

async function loadCommands(type) {

  logger.info(`Loading ${type} commands...`);

  let ms = new Date().getMilliseconds()

  const commandFolderPath = path.join(__dirname, "commands", type);
  const commandFolder = fs.readdirSync(commandFolderPath)

  const commandFiles = commandFolder.filter((file) => file.endsWith(".js"))

  for (const file of commandFiles) {

    const filePath = path.join(commandFolderPath, file)
    const command = require(filePath)

    if ("command" in command && "execute" in command) {

      commands[type].push(command);
      logger.info(`Loaded ${command.command.name} command from ${filePath}.`)

    } else {

      logger.console.warn(); (`The command at ${filePath} is missing a required "command" or "execute" property.`)

    }

  }

  logger.info(`Loaded ${commands[type].length} ${type} commands in ${new Date().getMilliseconds() - ms}ms.`);

}

function reloadCommands() {
  commands = { "common": [], "whatsapp": [], "discord": [] };
  loadCommands();
}

async function handleCommand(message) {

  logger.debug(`Handled Command`, message)

}

module.exports = { handleCommand, loadCommands, reloadCommands }