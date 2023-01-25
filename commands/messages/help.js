const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "help",
  aliases: ["h", "cmd", "cmds", "command", "commands"],
  description: "Shows This!",
  memberVoice: false,
  botVoice: false,
  sameVoice: false,
  queueNeeded: false,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const helpEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setAuthor({
        name: `${client.user.username} Commands`,
        iconURL: client.user.displayAvatarURL({ size: 1024 })
      })
      .setDescription(client.MessageCommands.map(c => `> \`${config.prefix}${c.name}\` \`(${c.aliases?.map(a => `${config.prefix}${a}`)?.join(' / ') || 'No Aliases'})\`\n> *${c.description}*`).join('\n\n'))

    return await message.reply({ embeds: [helpEmbed] });

  },

};