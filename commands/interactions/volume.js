const Discord = require('discord.js');
const func = require('../../utils/functions');
const config = require('../../config.json');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("volume")
    .setDescription("Sets the player volume.")
    .addIntegerOption(option => option
      .setName('volume')
      .setDescription('Enter new volume value to set.')
      .setRequired(true)
    ),
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, interaction, memberVC, botVC, queue) {
   
    await interaction.deferReply();

    const volume = interaction.options.getInteger('volume');

    try {

      await queue.setVolume(volume);

      const volumeEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription(`Volume changed to \`${volume}\`\n\n${func.queueStatus(queue)}`)
        .setFooter({
          text: `Commanded by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ size: 1024 })
        });

      return await interaction.editReply({ embeds: [volumeEmbed] });

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