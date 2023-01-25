const Discord = require('discord.js');
const func = require('../../utils/functions');
const config = require('../../config.json');

module.exports = {
  name: "loop",
  aliases: ["repeat"],
  description: "Changes loop mode",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (!args[0]) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please enter a valid mode.\n\n**Valid Modes:** `OFF` | `SONG` | `QUEUE`');

      return await message.reply({ embeds: [noArgsEmbed] });

    };

    let mode = null
    switch (args[0].toLowerCase()) {
      case "off":
        mode = 0
        break
      case "song":
        mode = 1
        break
      case "queue":
        mode = 2
        break
    };
    mode = await queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'All Queue' : 'This Song') : 'OFF'

    const loopEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription(`Loop mode changed to \`${mode}\`\n\n${func.queueStatus(queue)}`);

    return await message.reply({ embeds: [loopEmbed] });

  },

};