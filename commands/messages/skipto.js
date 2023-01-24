const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "SkipTo",
  aliases: ["st", "to"],
  description: "Skips to the provided song id in the queue",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (!args[0] || isNaN(Number(args[0]))) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please enter a valid number.');

      return message.reply({ embeds: [noArgsEmbed] });

    };

    try {

      await client.distube.jump(message, Number(args[0])).then(song => {

        const skippedEmbed = new Discord.EmbedBuilder()
          .setColor(config.mainColor)
          .setDescription(`Skipped to the **${args[0]}. ${song.name}**`);

        return message.reply({ embeds: [skippedEmbed] });
      
      });

    } catch (error) {

      console.error(error)

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

      return message.reply({ embeds: [errorEmbed] });

    };

  },

};