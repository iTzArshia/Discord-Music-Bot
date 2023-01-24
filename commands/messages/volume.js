const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "volume",
  aliases: ['v', 'set', 'set-volume'],
  description: "Sets the player volume",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const volume = parseInt(args[0]);
    if (isNaN(volume)) {

      const notValidNumberEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please enter a valid number.');

      return message.reply({ embeds: [notValidNumberEmbed] });

    };

    await queue.setVolume(volume);

    const status = queue => `**Volume:** \`${queue.volume}%\` | **Filters:** \`${queue.filters.names.join(', ') || 'OFF'}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'OFF'}\` | **Autoplay:** \`${queue.autoplay ? 'ON' : 'OFF'}\``;

    const volumeEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setTitle('Volume Changed')
      .setDescription(`Volume set to \`${volume}\`\n\n${status(queue)}`)

    return message.reply({ embeds: [volumeEmbed] });

  },

};