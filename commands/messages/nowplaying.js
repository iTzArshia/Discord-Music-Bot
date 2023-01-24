const Discord = require('discord.js');
const func = require('../../utils/functions');
const config = require('../../config.json');

module.exports = {
  name: "nowplaying",
  aliases: ["np", "now", "playing", "current"],
  description: "Shows the server current queue",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const nowEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setTitle("Now Playing")
      .setDescription(`**I'm playing:** ${queue.songs[0].name} (${queue.songs[0].formattedDuration})\n\n${func.queueStatus(queue)}`)
      .setFooter({
        text: `Requested by ${queue.songs[0].user.tag}`,
        iconURL: queue.songs[0].user.displayAvatarURL({ size: 1024 })
      });

    return message.reply({ embeds: [nowEmbed] });

  },

};