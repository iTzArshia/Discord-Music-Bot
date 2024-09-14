const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, error, queue, song) => {
    const embed = new Discord.EmbedBuilder()
    .setColor(config.ErrorColor)
    .setTitle("❌ Error")
    .setDescription(`An error encountered: ${error}`);
    await queue.textChannel?.send({ embeds: [embed] });
    console.error(error)
};
