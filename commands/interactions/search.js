const Discord = require("discord.js");
const { YouTubePlugin } = require("@distube/youtube");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("search")
        .setDescription("Search song for you.")
        .addStringOption((option) => option.setName("query").setDescription("Enter song name.").setRequired(true)),
    memberVoice: true,
    botVoice: false,
    sameVoice: true,
    queueNeeded: false,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply({ ephemeral: true });

        const query = interaction.options.getString("query");

        try {
            const ytPlugin = new YouTubePlugin();
            const songsArray = await ytPlugin.search(query, { type: "video", limit: client.distubeSettings.searchSongs, safeSearch: true });

            const searchEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔍 Search")
                .setDescription(
                    `Please select one of the songs below to enjoy your chosen song!\n\n` +
                        songsArray.map((song, index) => `[${index + 1}.](${song.url}) ${song.name} (${song.formattedDuration})`).join("\n")
                )
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            const menu = new Discord.StringSelectMenuBuilder()
                .setCustomId("songsMenu")
                .setPlaceholder("Select a song.")
                .setMaxValues(songsArray.length)
                .addOptions(
                    songsArray.map((song) => {
                        return {
                            label: song.name.length > 80 ? song.name.slice(0, 77) + "..." : song.name,
                            value: song.id,
                        };
                    })
                );

            const row = new Discord.ActionRowBuilder().addComponents(menu);

            const reply = await interaction.editReply({ embeds: [searchEmbed], components: [row] });
            const collector = reply.createMessageComponentCollector({ time: 60000 });

            collector.on("collect", async (int) => {
                if (int.member.id !== interaction.user.id)
                    await int.reply({
                        content: `⚠️ You can't use this, it's only works for ${interaction.user.globalName || interaction.user.username}`,
                        ephemeral: true,
                    });

                await collector.stop("played");
                await int.deferUpdate();

                for (const value of int.values) {
                    const thisSong = songsArray.find((song) => song.id === value);

                    await client.distube.play(memberVC, thisSong.url, {
                        member: interaction.member,
                        textChannel: interaction.channel,
                    });
                }
            });

            collector.on("end", async (collected, reason) => {
                if (["messageDelete", "messageDeleteBulk"].includes(reason)) return;
                menu.setDisabled();
                const disabledRow = new Discord.ActionRowBuilder().addComponents(menu);
                await reply.edit({ components: [disabledRow] });
            });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
