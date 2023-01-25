const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "filter",
  aliases: ["f", "mode", "filters"],
  description: "Changes loop mode",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const filter = args[0]?.toLowerCase()

    if (!args[0]) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please enter a valid filter or `OFF`.\n\n**Valid Filters:** `3D` | `BassBoost` | `Echo` | `Karaoke` | `NightCore` | `VaporWave` | `Flanger` | `Gate` | `Haas` | `Reverse` | `Surround` | `Mcompand` | `Phaser` | `Tremolo` | `Earwax`');

      return await message.reply({ embeds: [noArgsEmbed] });

    };

    if (filter === 'off' && queue.filters.size) {

      await queue.filters.clear()

    } else if (Object.keys(client.distube.filters).includes(filter)) {

      if (queue.filters.has(filter)) {
        await queue.filters.remove(filter);
      } else {
        await queue.filters.add(filter);
      };

    } else if (args[0]) {

      const notAvalidFilter = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please enter a valid filter or `OFF`.\n\n**Valid Filters:** `3D` | `BassBoost` | `Echo` | `Karaoke` | `NightCore` | `VaporWave` | `Flanger` | `Gate` | `Haas` | `Reverse` | `Surround` | `Mcompand` | `Phaser` | `Tremolo` | `Earwax`');

      return await message.reply({ embeds: [notAvalidFilter] });

    };

    const filtersEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription(`**Current Queue Filters:** \`${queue.filters.names.join(', ') || 'OFF'}\``);

    return await message.reply({ embeds: [filtersEmbed] });

  },

};