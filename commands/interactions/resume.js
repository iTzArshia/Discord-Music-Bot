const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the current song."),
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, interaction, memberVC, botVC, queue) {
   
    await interaction.deferReply();

    if (queue.playing) {

      const pauseEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("Queue isn't paused.")
        .setFooter({
          text: `Commanded by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ size: 1024 })
        });

      return await interaction.editReply({ embeds: [pauseEmbed] });

    };

    try {

      await queue.resume();

      const pauseEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("Resumed the song for you.")
        .setFooter({
          text: `Commanded by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ size: 1024 })
        });

      return await interaction.editReply({ embeds: [pauseEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
        .setFooter({
          text: `Commanded by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ size: 1024 })
        });

      return await interaction.editReply({ embeds: [errorEmbed] });

    };

  },

};