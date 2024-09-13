const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("autoplay").setDescription("Toggles auto play."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        try {
            const autoPlayState = await queue.toggleAutoplay();

            const autoplayEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔧 Auto Play")
                .setDescription(`Auto Play mode changed to \`${autoPlayState ? "ON" : "OFF"}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await message.editReply({ embeds: [autoplayEmbed] });
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
