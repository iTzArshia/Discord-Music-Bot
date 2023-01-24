const Discord = require('discord.js');
const func = require('../../utils/functions');
const config = require('../../config.json');

module.exports = {
  name: "nowplaying",
  aliases: ["np", "now", "song", "music", "playing", "current", "nowplay"],
  description: "Shows the server current queue",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const nowEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription(`**Now playing:** [${queue.songs[0].name} (${queue.songs[0].formattedDuration})](${queue.songs[0].url})\n\n${func.queueStatus(queue)}`)
      .addFields(
        {
          name: '👀 Views:',
          value: `${func.numberWithCommas(queue.songs[0].views)}`,
          inline: true
        },
        {
          name: '👍🏻 Likes:',
          value: `${func.numberWithCommas(queue.songs[0].likes)}`,
          inline: true
        },
        {
          name: '👎🏻 DisLikes:',
          value: `${func.numberWithCommas(queue.songs[0].dislikes)}`,
          inline: true
        },
      )
      .setThumbnail(queue.songs[0]?.thumbnail)
      .setFooter({
        text: `Requested by ${queue.songs[0].user.tag}`,
        iconURL: queue.songs[0].user.displayAvatarURL({ size: 1024 })
      });

    return message.reply({ embeds: [nowEmbed] });

  },

};