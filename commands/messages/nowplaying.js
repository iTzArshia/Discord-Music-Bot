const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "nowplaying",
  aliases: ['np', 'now', 'playing', 'current'],
  description: "Shows the server current queue",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const status = queue => `**Volume:** \`${queue.volume}%\` | **Filters:** \`${queue.filters.names.join(', ') || 'OFF'}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'OFF'}\` | **Autoplay:** \`${queue.autoplay ? 'ON' : 'OFF'}\``;

    const nowEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setTitle('Now Playing')
      .setDescription(`**I'm playing:** ${queue.songs[0].name} (${queue.songs[0].formattedDuration})\n\n${status(queue)}`)
      .setFooter({
        text: `Requested by ${queue.songs[0].user.tag}`,
        iconURL: queue.songs[0].user.displayAvatarURL({ size: 1024 })
      });

    return message.reply({ embeds: [nowEmbed] });

  },

};