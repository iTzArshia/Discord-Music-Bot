const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = async (client, queue) => {
    const embed = new Discord.EmbedBuilder().setColor(config.MainColor).setDescription(`**Current Queue Settings:**\n\n${func.queueStatus(queue)}`);

    await queue.textChannel?.send({ embeds: [embed] });
};
