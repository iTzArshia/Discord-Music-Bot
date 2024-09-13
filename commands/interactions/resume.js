const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("resume").setDescription("Resumes the current song."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        if (!queue.paused) {
            const pauseEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Warn")
                .setDescription("Queue isn't paused.")
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            return interaction.editReply({ embeds: [pauseEmbed] });
        }

        try {
            await queue.resume();

            const pauseEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("▶️ Resume")
                .setDescription("Resumed the song for you.")
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [pauseEmbed] });
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
