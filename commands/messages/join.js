const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Join",
  aliases: ["j", "connect"],
  description: "Joins to your Voice Channel",
  memberVoice: true,
  botVoice: false,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if ((memberVC && botVC) && memberVC.id === botVC.id) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription("I\'m already connected to your Voice Channel");

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    await client.distube.voices.join(memberVC);

    const joinEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription("I\'ve connected to your Voice Channel.");

    return message.reply({ embeds: [joinEmbed] });

  },

};