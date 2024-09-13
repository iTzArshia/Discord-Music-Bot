const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("queue").setDescription("Shows the server current queue."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        const queueSongs = queue.songs.map(
            (song, i) => `${i === 0 ? "**Playing:**" : `${i}.`} ${song.name} (${song.formattedDuration}) - ${song.user}`
        );
        const n = queue.songs.length / 20;
        const embeds = [];

        for (let i = 0; n > i; i++) {
            const queueEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle(`📃 ${interaction.guild.name}'s Queue [${i + 1}/${Math.ceil(n)}]`)
                .setDescription(queueSongs.slice(i * 20, (i + 1) * 20).join("\n"))
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            embeds.push(queueEmbed);
        }

        const { paginationStartButton, paginationBackButton, paginationForwardButton, paginationEndButton } = require("../../utils/components");
        const startButton = Discord.ButtonBuilder.from(paginationStartButton);
        const backButton = Discord.ButtonBuilder.from(paginationBackButton);
        const forwardButton = Discord.ButtonBuilder.from(paginationForwardButton);
        const endButton = Discord.ButtonBuilder.from(paginationEndButton);

        let group = new Discord.ActionRowBuilder().addComponents([
            startButton.setDisabled(true),
            backButton.setDisabled(true),
            forwardButton.setDisabled(true),
            endButton.setDisabled(true),
        ]);
        if (embeds.length > 1)
            group = new Discord.ActionRowBuilder().addComponents([
                startButton.setDisabled(true),
                backButton.setDisabled(true),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false),
            ]);

        const reply = await interaction.editReply({
            embeds: [embeds[0]],
            components: [group],
        });

        const collector = reply.createMessageComponentCollector({ time: 60000 });

        let currentPage = 0;

        collector.on("collect", async (int) => {
            if (int.member.id !== interaction.user.id)
                return int.reply({
                    content: `This button is only works for ${interaction.user.globalName || interaction.user.username}`,
                    ephemeral: true,
                });

            if (int.customId === "page-start") {
                currentPage = 0;
                group = new Discord.ActionRowBuilder().addComponents([
                    startButton.setDisabled(true),
                    backButton.setDisabled(true),
                    forwardButton.setDisabled(false),
                    endButton.setDisabled(false),
                ]);
                int.update({ embeds: [embeds[currentPage]], components: [group] });
            } else if (int.customId === "page-back") {
                --currentPage;
                if (currentPage === 0) {
                    group = new Discord.ActionRowBuilder().addComponents([
                        startButton.setDisabled(true),
                        backButton.setDisabled(true),
                        forwardButton.setDisabled(false),
                        endButton.setDisabled(false),
                    ]);
                } else {
                    group = new Discord.ActionRowBuilder().addComponents([
                        startButton.setDisabled(false),
                        backButton.setDisabled(false),
                        forwardButton.setDisabled(false),
                        endButton.setDisabled(false),
                    ]);
                }
                int.update({ embeds: [embeds[currentPage]], components: [group] });
            } else if (int.customId === "page-forward") {
                currentPage++;
                if (currentPage === embeds.length - 1) {
                    group = new Discord.ActionRowBuilder().addComponents([
                        startButton.setDisabled(false),
                        backButton.setDisabled(false),
                        forwardButton.setDisabled(true),
                        endButton.setDisabled(true),
                    ]);
                } else {
                    group = new Discord.ActionRowBuilder().addComponents([
                        startButton.setDisabled(false),
                        backButton.setDisabled(false),
                        forwardButton.setDisabled(false),
                        endButton.setDisabled(false),
                    ]);
                }
                int.update({ embeds: [embeds[currentPage]], components: [group] });
            } else if (int.customId === "page-end") {
                currentPage = embeds.length - 1;
                group = new Discord.ActionRowBuilder().addComponents([
                    startButton.setDisabled(false),
                    backButton.setDisabled(false),
                    forwardButton.setDisabled(true),
                    endButton.setDisabled(true),
                ]);
                int.update({ embeds: [embeds[currentPage]], components: [group] });
            }
        });

        collector.on("end", async (collected, reason) => {
            if (["messageDelete", "messageDeleteBulk"].includes(reason)) return;
            await reply.edit({
                components: [
                    new Discord.ActionRowBuilder().addComponents(
                        startButton.setDisabled(true),
                        backButton.setDisabled(true),
                        forwardButton.setDisabled(true),
                        endButton.setDisabled(true)
                    ),
                ],
            });
        });
    },
};
