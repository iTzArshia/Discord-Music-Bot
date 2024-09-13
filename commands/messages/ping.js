const Discord = require("discord.js");
const os = require("node:os");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "Ping",
    aliases: ["L", "Latency"],
    description: "Shows the bot's latency.",
    category: "Utilities Commands",
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const embed = new Discord.EmbedBuilder()
            .setColor(config.MainColor)
            .setTitle("🏓 Pong!")
            .addFields(
                {
                    name: `📡 Ping:`,
                    value: `${client.ws.ping}ms`,
                    inline: true,
                },
                {
                    name: `💾 Memory:`,
                    value: `${func.numberWithCommas(Math.round(process.memoryUsage().rss / 1024 / 1024))}/${func.numberWithCommas(
                        Math.round(os.totalmem() / 1024 / 1024)
                    )}MB`,
                    inline: true,
                },
                {
                    name: `⏳ Uptime:`,
                    value: func.timestamp(client.readyTimestamp),
                    inline: false,
                }
            )
            .setFooter({
                text: `Requested by ${message.author.globalName || message.author.username}`,
                iconURL: message.author.displayAvatarURL({ size: 1024 }),
            });

        await message.reply({ embeds: [embed] });
    },
};
