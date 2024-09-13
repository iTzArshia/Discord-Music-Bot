const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Skips to the provided song id in the queue.")
        .addStringOption((option) => option.setName("song-id").setDescription("Enter the song id you want skip to.").setRequired(true)),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        const songId = interaction.options.getInteger("song-id");

        try {
            await client.distube.jump(interaction.guild, songId).then(async (song) => {
                const skippedEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setTitle("⏭️ Skip To")
                    .setDescription(`Skipped to the **${songId}. [${song.name} (${song.formattedDuration})](${song.url})**`)
                    .setFooter({
                        text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                    });

                await interaction.editReply({ embeds: [skippedEmbed] });
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
