const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("volume")
        .setDescription("Sets the player volume.")
        .addIntegerOption((option) => option.setName("volume").setDescription("Enter new volume value to set.").setRequired(true)),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        const volume = interaction.options.getInteger("volume");

        try {
            if (volume > 200 || volume < 0) {
                const volumeEmbed = new Discord.EmbedBuilder().setColor(config.ErrorColor).setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

                if (volume > 200) volumeEmbed.setDescription("You can't make volume more than `200`");
                if (volume < 0) volumeEmbed.setDescription("You can't make volume less than `0`");

                return interaction.editReply({ embeds: [volumeEmbed] });
            }

            await queue.setVolume(volume);

            const volumeEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔊 Volume")
                .setDescription(`Volume changed to \`${volume}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [volumeEmbed] });
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
