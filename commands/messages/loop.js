const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "Loop",
    aliases: ["Repeat"],
    description: "Changes loop mode.",
    usage: "Loop <OFF / Song / Queue>",
    category: "Queue Commands",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        if (!args[0] || !["off", "song", "queue"].includes(args[0].toLowerCase())) {
            const noArgsEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Warn")
                .setDescription("Please enter a valid mode.\n\n**Valid Modes:** `OFF` | `SONG` | `QUEUE`")
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [noArgsEmbed] });
        }

        try {
            let mode = 0;
            if (args[0].toLowerCase() === "song") mode = 1;
            else if (args[0].toLowerCase === "queue") mode = 2;

            mode = await queue.setRepeatMode(mode);
            mode = mode ? (mode === 2 ? "All Queue" : "This Song") : "OFF";

            const loopEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔁 Loop")
                .setDescription(`Loop mode changed to \`${mode}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [loopEmbed] });
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
