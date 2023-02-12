const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Play",
  aliases: ["P", "start"],
  description: "Plays song for you.",
  memberVoice: true,
  botVoice: false,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const string = args.join(' ');
    if (!string) {

      const stringEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription("Please enter a song url or query to search.")
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [stringEmbed] });

    };

    try {

      await client.distube.play(memberVC, string, {
        member: message.member,
        textChannel: message.channel,
        message
      });

    } catch (error) {
      
      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [errorEmbed] });

    };

  },

};