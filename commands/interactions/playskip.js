const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("playskip")
    .setDescription("Plays the song and skips current song.")
    .addStringOption(option => option
      .setName('query')
      .setDescription('Enter song name or playlist list.')
      .setRequired(true)
    ),
  memberVoice: true,
  botVoice: false,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, interaction, memberVC, botVC, queue) {
   
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString('query');
   
    const searchEmbed = new Discord.EmbedBuilder()
      .setColor(config.MainColor)
      .setDescription("Searching...")
      .setFooter({
        text: `Commanded by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ size: 1024 })
      });

    await interaction.editReply({ embeds: [searchEmbed] });

    try {

      await client.distube.play(memberVC, query, {
        member: interaction.member,
        textChannel: interaction.channel,
        skip: true
      });
      
      await interaction.deleteReply();

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