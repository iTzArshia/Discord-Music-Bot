const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Queue",
  aliases: ['q'],
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
        .setDescription('There is nothing in the queue right now.');

      return message.reply({ embeds: [noQueueEmbed] });

    };

    const queueSongs = queue.songs.map((song, i) => `${i === 0 ? '**Playing:**' : `**${i}.**`} ${song.name} (${song.formattedDuration})`);
    const n = queue.songs / 20;
    const embeds = [];

    for (let i = 0; n > i; i++) {

      const queueEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setTitle(`Server Queue [${i + 1}/${Math.ceil(n)}]`)
        .setDescription(queueSongs.slice(i * 20, (i + 1) * 20).join('\n'));

      embeds.push(queueEmbed);

    };

    const { paginationStartButton, paginationBackButton, paginationCloseButton, paginationForwardButton, paginationEndButton } = require('../../utils/components');
    const startButton = Discord.ButtonBuilder.from(paginationStartButton);
    const backButton = Discord.ButtonBuilder.from(paginationBackButton);
    const forwardButton = Discord.ButtonBuilder.from(paginationForwardButton);
    const endButton = Discord.ButtonBuilder.from(paginationEndButton);

    let group = new Discord.ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(true), endButton.setDisabled(true)]);
    if (embeds.length > 1) group = new Discord.ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]);

    const reply = await message.reply({ embeds: [embeds[0]], components: [group] });
    const collector = reply.createMessageComponentCollector({ time: 60000 });

    let currentPage = 0;

    collector.on('collect', async (int) => {

      if (
        !(int.channel.permissionsFor(int.member).has('ManageMessages') && int.customId === 'messageDelete')
        && (int.member.id !== message.member.id)
      ) return await int.reply({
        content: `This button is only works for ${message.member}`,
        ephemeral: true
      });

      if (int.customId !== 'messageDelete') await collector.resetTimer();

      if (int.customId === 'start') {

        currentPage = 0;
        group = new Discord.ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
        int.update({ embeds: [embeds[currentPage]], components: [group] });

      } else if (int.customId === 'back') {

        --currentPage;
        if (currentPage === 0) { group = new Discord.ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]) } else { group = new Discord.ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), endButton.setDisabled(false)]) };
        int.update({ embeds: [embeds[currentPage]], components: [group] });

      } else if (int.customId === 'messageDelete') {

        await int.deferUpdate();
        await int.deleteReply().catch(() => null);
        await message.delete().catch(() => null);

      } else if (int.customId === 'forward') {

        currentPage++;
        if (currentPage === embeds.length - 1) { group = new Discord.ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)]) } else { group = new Discord.ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), endButton.setDisabled(false)]) };
        int.update({ embeds: [embeds[currentPage]], components: [group] });

      } else if (int.customId === 'end') {

        currentPage = embeds.length - 1;
        group = new Discord.ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)]);
        int.update({ embeds: [embeds[currentPage]], components: [group] });

      };

    });

    collector.on('end', async (collected, reason) => {

      if (["messageDelete", "messageDeleteBulk"].includes(reason)) return;
      await reply.edit({ components: [new Discord.ActionRowBuilder().addComponents(startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(true), endButton.setDisabled(true))] });

    });

  },

};