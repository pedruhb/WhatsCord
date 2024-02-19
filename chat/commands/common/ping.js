module.exports = {
  command: {
    name: "Ping",
    description: "Ping? Pong!",
    aliases: ["ping"],
  },
  async execute(message) {
    await message.bot.reply("Pong!");
  }
};