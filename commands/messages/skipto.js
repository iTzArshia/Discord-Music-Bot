const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "SkipTo",
    aliases: ["ST", "Jump"],
    description: "Skips to the provided song id in the queue.",
    usage: "SkipTo <Song Number>",
    category: "Queue Commands",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        if (!args[0] || isNaN(Number(args[0]))) {
            const noArgsEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Warn")
                .setDescription("Please enter a valid number.")
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [noArgsEmbed] });
        }

        try {
            await client.distube.jump(message.guild, Number(args[0])).then(async (song) => {
                const skippedEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setTitle("⏭️ Skip To")
                    .setDescription(`Skipped to the **${args[0]}. [${song.name} (${song.formattedDuration})](${song.url})**`)
                    .setFooter({
                        text: `Requested by ${message.author.globalName || message.author.username}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 }),
                    });

                await message.reply({ embeds: [skippedEmbed] });
            });
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
