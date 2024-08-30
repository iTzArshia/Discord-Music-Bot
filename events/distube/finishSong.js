const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, queue) => {
    const embed = new Discord.EmbedBuilder().setColor(config.ErrorColor).setDescription("Finish song!");

    await queue.textChannel?.send({ embeds: [embed] });
};
