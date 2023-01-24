module.exports = {
  name: 'forward',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Please provide time (in seconds) to go forward!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`)
    queue.seek((queue.currentTime + time))
    message.channel.send(`Forwarded the song for ${time}!`)
  }
}


const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "forward",
  description: "-",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (!args[0] || isNaN(Number(args[0]))) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please provide time (in seconds) to go forward!\n**Example:** `10` for 10 seconds forward!');

      return message.reply({ embeds: [noArgsEmbed] });

    };

    await queue.seek(queue.currentTime + Number(args[0]));

    const seekEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription(`forwarded the song for ${Number(args[0])} seconds.`);

    return message.reply({ embeds: [seekEmbed] });

  },

};