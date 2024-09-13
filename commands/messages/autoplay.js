const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "AutoPlay",
    aliases: ["A", "AP", "Auto"],
    description: "Toggles auto play.",
    category: "Queue Commands",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        try {
            const autoPlayState = await queue.toggleAutoplay();

            const autoplayEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔧 Auto Play")
                .setDescription(`Auto Play mode changed to \`${autoPlayState ? "ON" : "OFF"}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [autoplayEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [errorEmbed] });
        }
    },
};
