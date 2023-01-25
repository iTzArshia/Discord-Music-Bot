const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Stop",
  description: "Stops the queue",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    await queue.stop()

    const stopEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription("Stopped playing.");

    return await message.reply({ embeds: [stopEmbed] });

  },

};