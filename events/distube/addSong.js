const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, queue, song) => {
    const embed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setTitle("🎶 New Song")
        .setDescription(`New song added to the queue\n**Song:** [${song.name} (${song.formattedDuration})](${song.url})`)
        .setFooter({
            text: `Requested by ${song.user.globalName || song.user.username}`,
            iconURL: song.user.displayAvatarURL({ size: 1024 }),
        });

    await queue.textChannel?.send({ embeds: [embed] });
};
