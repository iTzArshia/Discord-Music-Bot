const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "backward",
  aliases: ["rewind"],
  description: "-",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (!args[0] || isNaN(Number(args[0]))) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please provide time (in seconds) to go backward!\n**Example:** `10` for 10 seconds backward.');

      return await message.reply({ embeds: [noArgsEmbed] });

    };

    await queue.seek(queue.currentTime - Number(args[0]));

    const seekEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription(`Backwarded the song for ${Number(args[0])} seconds.`);

    return await message.reply({ embeds: [seekEmbed] });

  },

};