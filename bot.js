const logo = require('asciiart-logo')
const { logger } = require("./api/logger.js")
const whatsappConnector = require("./api/connector/whatsapp/api.js")
const discordConnector = require("./api/connector/discord/api.js")
const { loadCommands } = require('./chat/CommandHandler.js')
const startup_ms = new Date().getMilliseconds()
const version = "0.0.1"

async function load() {

  console.log(
    logo({
      name: 'WhatsCord',
      font: 'Big Money-ne',
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: 'grey',
      logoColor: 'bold-green',
      textColor: 'green',
    })
      .right(`version ${version}`)
      .emptyLine()
      .center("github.com/pedruhb/botzin")
      .render()
  );

  logger.info("Starting...");

  await loadCommands("common");
  if (process.env.WHATSAPP_ENABLED == "true") await loadCommands("whatsapp");
  if (process.env.DISCORD_ENABLED == "true") await loadCommands("discord");

  await whatsappConnector.InitConnector();
  await discordConnector.InitConnector();


  //logger.info(`WhatsCord Bot started in ${new Date().getMilliseconds() - startup_ms}ms.`)

}

load();