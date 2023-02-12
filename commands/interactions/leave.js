const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leaves from your current Voice Channel."),
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, interaction, memberVC, botVC, queue) {
   
    await interaction.deferReply();

    try {

      await client.distube.voices.leave(interaction.guild);

      const leaveEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("I\'ve disconnected from your Voice Channel.")
        .setFooter({
          text: `Commanded by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ size: 1024 })
        });

      return await interaction.editReply({ embeds: [leaveEmbed] });

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