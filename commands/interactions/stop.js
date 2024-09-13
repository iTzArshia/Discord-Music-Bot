const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("stop").setDescription("Stops the queue."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        try {
            await queue.stop();
            if (client.distubeSettings.leaveOnStop) await queue.voice.leave();

            const stopEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🚫 Stop")
                .setDescription("Stopped playing.")
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [stopEmbed] });
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
