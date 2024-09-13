const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("filter")
        .setDescription("Applies different audio filters.")
        .addStringOption((option) =>
            option
                .setName("filter")
                .setDescription("Select any filter you want to ON/OFF.")
                .setChoices(
                    { name: "OFF", value: "off" },
                    { name: "3D", value: "3d" },
                    { name: "BassBoost", value: "bassboost" },
                    { name: "Earwax", value: "earwax" },
                    { name: "Echo", value: "echo" },
                    { name: "Flanger", value: "flanger" },
                    { name: "Gate", value: "gate" },
                    { name: "Haas", value: "haas" },
                    { name: "Karaoke", value: "karaoke" },
                    { name: "Mcompand", value: "mcompand" },
                    { name: "NightCore", value: "nightcore" },
                    { name: "Phaser", value: "phaser" },
                    { name: "Reverse", value: "reverse" },
                    { name: "Surround", value: "surround" },
                    { name: "Tremolo", value: "tremolo" },
                    { name: "VaporWave", value: "vaporwave" }
                )
                .setRequired(true)
        ),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        const filter = interaction.options.getString("filter").toLowerCase();

        try {
            if (filter === "off" && queue.filters.size) {
                await queue.filters.clear();
            } else if (Object.keys(client.distube.filters).includes(filter)) {
                if (queue.filters.has(filter)) {
                    await queue.filters.remove(filter);
                } else {
                    await queue.filters.add(filter);
                }
            }

            const filtersEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🎧 Filter")
                .setDescription(`**Current Queue Filters:** \`${queue.filters.names.join(", ") || "OFF"}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [filtersEmbed] });
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
