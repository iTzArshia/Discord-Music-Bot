const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, queue) => {
    const embed = new Discord.EmbedBuilder().setColor(config.ErrorColor).setDescription("I can't find any related song to play");

    await queue.textChannel?.send({ embeds: [embed] });
};
