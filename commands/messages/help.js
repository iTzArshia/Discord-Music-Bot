const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "help",
  aliases: ['commands', 'command', 'cmds', 'cmd', 'c', 'h'],
  description: "Shows This!",

  async execute(client, message, args, cmd) {

    const helpEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setAuthor({
        name: `${client.user.username} Commands`,
        iconURL: client.user.displayAvatarURL({ size: 1024 })
      })
      .setDescription(client.MessageCommands.map(c => `\`${config.prefix}${c.name}\` \`(${c.aliases.map(a => `${config.prefix}${a}`).join(' | ')})\`\n*${command.description}*`).join('\n\n'))

    return message.reply({ embeds: [helpEmbed] });

  },

};