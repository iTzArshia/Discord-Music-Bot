const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Stop",
    aliases: ["OFF", "Exit", "Quit"],
    description: "Stops the queue.",
    category: "Queue Commands",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        try {
            await queue.stop();
            if (client.distubeSettings.leaveOnStop) await queue.voice.leave();

            const stopEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🚫 Stop")
                .setDescription("Stopped playing.")
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [stopEmbed] });
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
