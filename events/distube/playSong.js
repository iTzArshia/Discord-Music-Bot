const Discord = require("discord.js");
const func = require("../../utils/functions");
const { row2, row3 } = require("../../utils/components");
const config = require("../../config.json");

module.exports = async (client, queue, song) => {
    const voiceChannel = queue.distube.client.channels.cache.get(queue.voice.channelId);
    const voiceChannelMembers = voiceChannel.members.filter((member) => !member.user.bot);

    const embed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription(
            `Now Playing **[${song.name} (${song.formattedDuration})](${song.url})** for ${voiceChannelMembers.size} ${
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

    const reply = await queue.textChannel?.send({
        embeds: [embed],
        components: [row1, row2, row3],
    });

    const collector = await reply.createMessageComponentCollector({ time: song.duration * 1000 });

    collector.on("collect", async (int) => {
        const memberVC = int.member.voice.channel || null;
        const botVC = int.guild.members.me.voice.channel || null;

        if (memberVC && botVC && memberVC.id !== botVC.id) {
            const inVoiceEmbed = new Discord.EmbedBuilder().setColor(config.ErrorColor).setDescription("You aren't connected to my Voice Channel.");

            return await int.reply({
                embeds: [inVoiceEmbed],
                ephemeral: true,
            });
        }

        await int.deferReply();

        try {
            if (int.customId === "filters") {
                if (queue.filters.has(int.values[0])) {
                    await queue.filters.remove(int.values[0]);
                } else {
                    await queue.filters.add(int.values[0]);
                }

                await reply.edit({
                    components: [row1, row2, row3],
                });

                const filtersEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription(`**Current Queue Filters:** \`${queue.filters.names.join(", ") || "OFF"}\`\n\n${func.queueStatus(queue)}`)
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                return await int.editReply({ embeds: [filtersEmbed] });
            } else if (int.customId.startsWith("loop")) {
                const loopState = int.customId.split("-")[1];
                const currentLoopState = queue.repeatMode;
                const convertedLoopStates = {
                    0: "off",
                    1: "song",
                    2: "queue",
                };

                let mode = 0;

                if (convertedLoopStates[currentLoopState] === "off") {
                    if (loopState === "song") mode = 1;
                    else if (loopState === "queue") mode = 2;
                } else {
                    if (loopState !== convertedLoopStates[currentLoopState]) {
                        if (loopState === "song") mode = 1;
                        else if (loopState === "queue") mode = 2;
                    }
                }

                mode = await queue.setRepeatMode(mode);
                mode = mode ? (mode === 2 ? "All Queue" : "This Song") : "OFF";

                const loopEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription(`Loop mode changed to \`${mode}\`\n\n${func.queueStatus(queue)}`)
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                return await int.editReply({ embeds: [loopEmbed] });
            } else if (int.customId === "previous") {
                await queue.previous();

                const skippedEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription("Skipping to the previus song.")
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                await int.editReply({ embeds: [skippedEmbed] });

                return await collector.stop();
            } else if (int.customId === "pauseUnpause") {
                if (queue.playing) {
                    await queue.pause();
                } else {
                    await queue.resume();
                }

                const pauseUnpauseEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription(`${queue.playing ? "Resumed" : "Paused"} the song for you.`)
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                return await int.editReply({ embeds: [pauseUnpauseEmbed] });
            } else if (int.customId === "next") {
                await queue.skip();

                const skippedEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription("Skipping to the next song.")
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                await int.editReply({ embeds: [skippedEmbed] });

                return await collector.stop();
            } else if (int.customId.startsWith("vol")) {
                const volumeUpDown = int.customId.split("-")[1];

                if (volumeUpDown === "up") {
                    
                    if (queue.volume === 200) {

                        const volumeEmbed = new Discord.EmbedBuilder()
                    .setColor(config.ErrorColor)
                    .setDescription("You can't make volume more than `200`")
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                        return await int.editReply({ embeds: [volumeEmbed] });
                    }
                    await queue.setVolume(queue.volume + 10);

                }

                else if (volumeUpDown === "down") {
                    
                    if (queue.volume === 0) {

                        const volumeEmbed = new Discord.EmbedBuilder()
                        .setColor(config.ErrorColor)
                        .setDescription("You can't make volume less than `0`")
                        .setFooter({
                            text: `Commanded by ${int.user.globalName || int.user.username}`,
                            iconURL: int.user.displayAvatarURL({ size: 1024 }),
                        });

                        return await int.editReply({ embeds: [volumeEmbed] });
                    }
                    await queue.setVolume(queue.volume - 10);

                }

                const volumeEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription(`Volume changed to \`${queue.volume}\`\n\n${func.queueStatus(queue)}`)
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                return await int.editReply({ embeds: [volumeEmbed] });
            } else if (int.customId === "backward") {
                await queue.seek(queue.currentTime - 10);

                const seekEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription(`Backwarded the song for 10 seconds.`)
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                return await int.editReply({ embeds: [seekEmbed] });
            } else if (int.customId === "stop") {
                await queue.stop();
                if (client.distubeSettings.leaveOnStop) await queue.voice.leave();

                const stopEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription("Stopped playing.")
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                await int.editReply({ embeds: [stopEmbed] });

                return await collector.stop();
            } else if (int.customId === "forward") {
                await queue.seek(queue.currentTime + 10);

                const seekEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription(`forwarded the song for 10 seconds.`)
                    .setFooter({
                        text: `Commanded by ${int.user.globalName || int.user.username}`,
                        iconURL: int.user.displayAvatarURL({ size: 1024 }),
                    });

                return await int.editReply({ embeds: [seekEmbed] });
            }
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
                .setFooter({
                    text: `Commanded by ${int.user.globalName || int.user.username}`,
                    iconURL: int.user.displayAvatarURL({ size: 1024 }),
                });

            return await int.editReply({ embeds: [errorEmbed] });
        }
    });

    collector.on("end", async (collection, reason) => {
        if (["messageDelete", "messageDeleteBulk"].includes(reason)) return;
        await reply.edit({ components: [] }).catch(() => null);
    });
};
