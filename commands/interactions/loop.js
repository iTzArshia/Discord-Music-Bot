const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("loop")
        .setDescription("Changes loop mode.")
        .addStringOption((option) =>
            option
                .setName("mode")
                .setDescription("loop song or queue.")
                .setChoices({ name: "OFF", value: "0" }, { name: "Song", value: "1" }, { name: "Queue", value: "2" })
                .setRequired(true)
        ),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        try {
            const selectedMode = interaction.options.getString("mode");
            await queue.setRepeatMode(selectedMode);
            const mode = selectedMode ? (selectedMode === 2 ? "All Queue" : "This Song") : "OFF";

            const loopEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔁 Loop")
                .setDescription(`Loop mode changed to \`${mode}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [loopEmbed] });
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
