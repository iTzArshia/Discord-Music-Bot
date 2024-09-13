const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, queue, playlist) => {
    const embed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setTitle("📃 New Queue")
        .setDescription(`New playlist to the queue\n**Playlist:** ${playlist.name} (${playlist.songs.length} songs)`)
        .setFooter({
            text: `Requested by ${playlist.songs[0].user.globalName || playlist.songs[0].user.username}`,
            iconURL: playlist.songs[0].user.displayAvatarURL({ size: 1024 }),
        });

    await queue.textChannel?.send({ embeds: [embed] });
};
