const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = async (client, queue, song) => {
    const voiceChannel = queue.distube.client.channels.cache.get(queue.voice.channelId);
    const voiceChannelMembers = voiceChannel.members.filter((member) => !member.user.bot);

    const embed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setTitle("💿 Now Playing")
        .setDescription(
            `Playing **[${song.name} (${song.formattedDuration})](${song.url})** for ${voiceChannelMembers.size} ${
                voiceChannelMembers.size > 1 ? "listeners" : "listener"
            } in ${voiceChannel}`
        )
        .setThumbnail(song?.thumbnail)
        .setFooter({
            text: `Requested by ${song.user.globalName || song.user.username}`,
            iconURL: song.user.displayAvatarURL({ size: 1024 }),
        });

    if (song.views)
        embed.addFields({
            name: "👀 Views:",
            value: `${func.numberWithCommas(song.views)}`,
            inline: true,
        });

    if (song.likes)
        embed.addFields({
            name: "👍🏻 Likes:",
            value: `${func.numberWithCommas(song.likes)}`,
            inline: true,
        });

    if (song.dislikes)
        embed.addFields({
            name: "👎🏻 Dislikes:",
            value: `${func.numberWithCommas(song.dislikes)}`,
            inline: true,
        });

    const filters = new Discord.StringSelectMenuBuilder().setCustomId("filters").setPlaceholder("Select Filters");

    const options = [];

    for (const filter of Object.keys(queue.distube.filters)) {
        options.push({
            label: filter.charAt(0).toUpperCase() + filter.slice(1),
            value: filter,
        });
    }

    filters.addOptions(options);
    const row1 = new Discord.ActionRowBuilder().addComponents([filters]);

    const loopSongToggle = new Discord.ButtonBuilder().setCustomId("loop").setEmoji("🔁").setStyle(Discord.ButtonStyle.Secondary);

    const previousSong = new Discord.ButtonBuilder().setCustomId("previous").setEmoji("⏮️").setStyle(Discord.ButtonStyle.Secondary);

    const paunseUnpause = new Discord.ButtonBuilder().setCustomId("pauseUnpause").setEmoji("⏯️").setStyle(Discord.ButtonStyle.Secondary);

    const nextSong = new Discord.ButtonBuilder().setCustomId("next").setEmoji("⏭️").setStyle(Discord.ButtonStyle.Secondary);

    const loopQueueToggle = new Discord.ButtonBuilder().setCustomId("shuffle").setEmoji("🔀").setStyle(Discord.ButtonStyle.Secondary);

    const volumeDown = new Discord.ButtonBuilder().setCustomId("vol-down").setEmoji("🔉").setStyle(Discord.ButtonStyle.Secondary);

    const backward = new Discord.ButtonBuilder().setCustomId("backward").setEmoji("⏪").setStyle(Discord.ButtonStyle.Secondary);

    const stop = new Discord.ButtonBuilder().setCustomId("stop").setEmoji("⏹️").setStyle(Discord.ButtonStyle.Secondary);

    const forward = new Discord.ButtonBuilder().setCustomId("forward").setEmoji("⏩").setStyle(Discord.ButtonStyle.Secondary);

    const volumeUp = new Discord.ButtonBuilder().setCustomId("vol-up").setEmoji("🔊").setStyle(Discord.ButtonStyle.Secondary);

    const row2 = new Discord.ActionRowBuilder().addComponents([loopSongToggle, previousSong, paunseUnpause, nextSong, loopQueueToggle]);
    const row3 = new Discord.ActionRowBuilder().addComponents([volumeDown, backward, stop, forward, volumeUp]);

    const playingMessage = await queue.textChannel?.send({
        embeds: [embed],
        components: [row1, row2, row3],
    });

    client.PlayingMessageID = playingMessage.id;
};
