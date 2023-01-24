const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Skip",
  description: "Skips the current music",

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
        .setDescription('There is nothing in the queue right now.');

      return message.reply({ embeds: [noQueueEmbed] });

    };

    try {

      await queue.skip()

      const skippedEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setDescription('Skipping to the next track...');

      return message.reply({ embeds: [skippedEmbed] });

    } catch (error) {

      console.error(error)

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setTitle('An error encountered')
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + '...' : error.message);

      return message.reply({ embeds: [errorEmbed] });

    };

  },

};

    // const connection = DiscordVoice.getVoiceConnection(message.guildId);
    // if (!connection) {

    //   const inVoiceEmbed = new Discord.EmbedBuilder()
    //     .setColor(config.errorColor)
    //     .setDescription('I\'m not connected to any Voice Chnanel.');

    //   return message.reply({ embeds: [inVoiceEmbed] });

    // };

    // if (voiceChannel.id !== connection.joinConfig.channelId) {

    //   const inVoiceEmbed = new Discord.EmbedBuilder()
    //     .setColor(config.errorColor)
    //     .setDescription('You are not connected to my Voice Channel.');

    //   return message.reply({ embeds: [inVoiceEmbed] });

    // };