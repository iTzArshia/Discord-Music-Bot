const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "nowplaying",
  aliases: ['np', 'now', 'playing', 'current'],
  description: "Shows the server current queue",

  async execute(client, message, args, cmd) {

    const memberVoiceChannel = message.member.voice.channel;
    if (!memberVoiceChannel) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You are not connected to any Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    const botVoiceChannel = message.guild.members.me.voice.channel;
    if (!botVoiceChannel) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('I\'m not connected to any Voice Chnanel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    if (memberVoiceChannel.id !== botVoiceChannel.id) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You are not connected to my Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    const queue = client.distube.getQueue(message.guild)
    if (!queue) {

      const noQueueEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('I\'m not playing anything right now.');

      return message.reply({ embeds: [noQueueEmbed] });

    };

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