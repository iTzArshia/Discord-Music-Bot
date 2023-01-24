const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Play",
  aliases: ["p"],
  description: "Plays song for you",
  memberVoice: true,
  botVoice: false,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const string = args.join(' ');
    if (!string) {

      const stringEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription("Please enter a song url or query to search.");

      return message.reply({ embeds: [stringEmbed] });

    };

    await client.distube.play(memberVC, string, {
      member: message.member,
      textChannel: message.channel,
      message
    });

  },

};