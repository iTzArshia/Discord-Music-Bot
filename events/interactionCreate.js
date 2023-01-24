const Discord = require('discord.js');

module.exports = async (client, interaction) => {

  if (!global.isReady) return;

  if (interaction.isChatInputCommand()) {

    if (interaction.channel.type === Discord.ChannelType.DM) return await interaction.reply({ content: 'You can\'t ues slash commands here', ephemeral: true });

    if (!client.SlashCommands.has(interaction.commandName)) return;

    try {
      await client.SlashCommands.get(interaction.commandName).execute(client, interaction);
    } catch (error) {
      console.error(interaction.guild.id, error);
      if (interaction.isRepliable()) return await interaction.reply({ content: `There was an error while executing this command`, ephemeral: true });
      if (!interaction.isRepliable()) return await interaction.editReply({ content: `There was an error while executing this command`, embeds: [], components: [] });
    }
  };

};