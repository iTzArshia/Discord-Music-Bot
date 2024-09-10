const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, textChannel, error) => {
    console.log(error);

    if (error.message) {
        const embed = new Discord.EmbedBuilder()
            .setColor(config.ErrorColor)
            .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

        await textChannel?.send({ embeds: [embed] });
    }
};
