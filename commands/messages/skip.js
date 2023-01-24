const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');
const config = require('../../config.json');

module.exports = {
  name: "Skip",
  description: "Skips the current music",

  async execute(client, message, args, cmd) {

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You are not connected to any Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    const oldConnection = DiscordVoice.getVoiceConnection(message.guild.id);
    if (!oldConnection) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('I\'m not connected to any Voice Chnanel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    if (voiceChannel.id !== oldConnection.joinConfig.channelId) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You are not connected to my Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    const queue = client.distube.getQueue(message.guild)
    if (!queue) {

      const noQueueEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('There is nothing in the queue right now.');

      return message.reply({ embeds: [noQueueEmbed] });

    };

    try {

      const song = await queue.skip()

      const skippedEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setTitle('Skipped')
        .setDescription(`Now playing:\n**${song.name}**`);

      return message.reply({ embeds: [skippedEmbed] });

    } catch (error) {

      console.error(error)

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription(`An error encountered: ${error.message.length > 4096 ? error.message.slice(0, 4093) + '...' : error.message}`);

      return message.reply({ embeds: [errorEmbed] });

    };

  },

};