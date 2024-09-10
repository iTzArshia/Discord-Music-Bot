const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        if (
            !interaction.channel.permissionsFor(interaction.guild.members.me).has(["ViewChannel", "SendMessages", "EmbedLinks", "ReadMessageHistory"])
        )
            return;

        const command = client.SlashCommands.get(interaction.commandName);
        if (command) {
            const memberVC = interaction.member.voice.channel || null;
            const botVC = interaction.guild.members.me.voice.channel || null;
            const queue = client.distube.getQueue(interaction.guild) || null;

            if (command.memberVoice) {
                if (!memberVC) return await interaction.reply({ content: "You aren't connected to any Voice Channel.", ephemeral: true });
            }

            if (command.botVoice) {
                if (!botVC) return await interaction.reply({ content: "I'm not connected to any Voice Chnanel.", ephemeral: true });
            }

            if (command.sameVoice) {
                if (memberVC && botVC && memberVC.id !== botVC.id)
                    return await interaction.reply({ content: "You aren't connected to my Voice Channel.", ephemeral: true });
            }

            if (command.queueNeeded) {
                if (!queue) return await interaction.reply({ content: "I'm not playing anything right now.", ephemeral: true });
            }

            try {
                command.execute(client, interaction, memberVC, botVC, queue);
            } catch (error) {
                return await interaction
                    .reply({ content: error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message, ephemeral: true })
                    .catch(() => null);
            }
        }
    } else if (interaction.isButton() || interaction.isStringSelectMenu()) {
        if (["filters", "loop", "previous", "pauseUnpause", "next", "vol", "backward", "stop", "forward"].includes(interaction.customId)) {
            const memberVC = interaction.member.voice.channel || null;
            const botVC = interaction.guild.members.me.voice.channel || null;

            if (memberVC && botVC && memberVC.id !== botVC.id) {
                const inVoiceEmbed = new Discord.EmbedBuilder()
                    .setColor(config.ErrorColor)
                    .setDescription("You aren't connected to my Voice Channel.");

                return await interaction.reply({
                    embeds: [inVoiceEmbed],
                    ephemeral: true,
                });
            }

            await interaction.deferReply();

            try {
                const queue = client.distube.getQueue(interaction.guild) || null;

                if (interaction.customId === "filters") {
                    if (queue.filters.has(interaction.values[0])) {
                        await queue.filters.remove(interaction.values[0]);
                    } else {
                        await queue.filters.add(interaction.values[0]);
                    }

                    const filtersEmbed = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setDescription(`**Current Queue Filters:** \`${queue.filters.names.join(", ") || "OFF"}\`\n\n${func.queueStatus(queue)}`)
                        .setFooter({
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    return await interaction.editReply({ embeds: [filtersEmbed] });
                } else if (interaction.customId.startsWith("loop")) {
                    const loopState = interaction.customId.split("-")[1];
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
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    return await interaction.editReply({ embeds: [loopEmbed] });
                } else if (interaction.customId === "previous") {
                    await queue.previous();

                    const skippedEmbed = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setDescription("Skipping to the previus song.")
                        .setFooter({
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    await interaction.editReply({ embeds: [skippedEmbed] });

                    return await collector.stop();
                } else if (interaction.customId === "pauseUnpause") {
                    if (queue.paused) {
                        await queue.resume();
                    } else {
                        await queue.pause();
                    }

                    const pauseUnpauseEmbed = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setDescription(`${queue.paused ? "Paused" : "Resumed"} the song for you.`)
                        .setFooter({
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    return await interaction.editReply({ embeds: [pauseUnpauseEmbed] });
                } else if (interaction.customId === "next") {
                    await queue.skip();

                    const skippedEmbed = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setDescription("Skipping to the next song.")
                        .setFooter({
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    await interaction.editReply({ embeds: [skippedEmbed] });
                } else if (interaction.customId.startsWith("vol")) {
                    const volumeUpDown = interaction.customId.split("-")[1];

                    if (volumeUpDown === "up") {
                        if (queue.volume === 200) {
                            const volumeEmbed = new Discord.EmbedBuilder()
                                .setColor(config.ErrorColor)
                                .setDescription("You can't make volume more than `200`")
                                .setFooter({
                                    text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                                });

                            return await interaction.editReply({ embeds: [volumeEmbed] });
                        }
                        await queue.setVolume(queue.volume + 10);
                    } else if (volumeUpDown === "down") {
                        if (queue.volume === 0) {
                            const volumeEmbed = new Discord.EmbedBuilder()
                                .setColor(config.ErrorColor)
                                .setDescription("You can't make volume less than `0`")
                                .setFooter({
                                    text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                                });

                            return await interaction.editReply({ embeds: [volumeEmbed] });
                        }
                        await queue.setVolume(queue.volume - 10);
                    }

                    const volumeEmbed = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setDescription(`Volume changed to \`${queue.volume}\`\n\n${func.queueStatus(queue)}`)
                        .setFooter({
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    return await interaction.editReply({ embeds: [volumeEmbed] });
                } else if (interaction.customId === "backward") {
                    await queue.seek(queue.currentTime - 10);

                    const seekEmbed = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setDescription(`Backwarded the song for 10 seconds.`)
                        .setFooter({
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    return await interaction.editReply({ embeds: [seekEmbed] });
                } else if (interaction.customId === "stop") {
                    await queue.stop();
                    if (client.distubeSettings.leaveOnStop) await queue.voice.leave();

                    const stopEmbed = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setDescription("Stopped playing.")
                        .setFooter({
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    await interaction.editReply({ embeds: [stopEmbed] });

                    return await collector.stop();
                } else if (interaction.customId === "forward") {
                    await queue.seek(queue.currentTime + 10);

                    const seekEmbed = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setDescription(`forwarded the song for 10 seconds.`)
                        .setFooter({
                            text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                            iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                        });

                    return await interaction.editReply({ embeds: [seekEmbed] });
                }
            } catch (error) {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setColor(config.ErrorColor)
                    .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
                    .setFooter({
                        text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                    });

                return await interaction.editReply({ embeds: [errorEmbed] });
            }
        }
    }
};
