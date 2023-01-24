const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "PlaySkip",
  aliases: ["ps"],
  description: "Plays the song and skips current song",
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

    client.distube.play(memberVC, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      skip: true
    })

  },

};