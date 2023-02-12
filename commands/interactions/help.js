const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows the Bot's commands list and information."),
  memberVoice: false,
  botVoice: false,
  sameVoice: false,
  queueNeeded: false,

  async execute(client, interaction, memberVC, botVC, queue) {
  
    await interaction.deferReply();

    const helpEmbed = new Discord.EmbedBuilder()
      .setColor(config.MainColor)
      .setAuthor({
        name: `${client.user.username} Commands`,
        iconURL: client.user.displayAvatarURL({ size: 1024 })
      })
      .setDescription(client.MessageCommands.map(c => `> \`${config.Prefix}${c.name}\` \`(${c.aliases?.map(a => `${config.Prefix}${a}`)?.join(' / ') || 'No Aliases'})\`\n> *${c.description}*`).join('\n\n'))
      .setFooter({ text: 'Developed by iTz Arshia#7650 https://github.com/iTzArshia/iTz-DJ' });

    return await interaction.editReply({ embeds: [helpEmbed] });

  },

};