const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "volume",
    aliases: ["V", "Vol", "Set", "SetVolume"],
    description: "Sets the player volume.",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const volume = parseInt(args[0]);
        if (isNaN(volume)) {
            const notValidNumberEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setDescription("Please enter a valid number.")
                .setFooter({
                    text: `Commanded by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return await message.reply({ embeds: [notValidNumberEmbed] });
        }

        try {
            if (volume > 200 || volume < 0) {
                const volumeEmbed = new Discord.EmbedBuilder().setColor(config.ErrorColor).setFooter({
                    text: `Commanded by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

                if (volume > 200) volumeEmbed.setDescription("You can't make volume more than `200`");
                if (volume < 0) volumeEmbed.setDescription("You can't make volume less than `0`");

                return await message.reply({ embeds: [volumeEmbed] });
            }

            await queue.setVolume(volume);

            const volumeEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setDescription(`Volume changed to \`${volume}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Commanded by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return await message.reply({ embeds: [volumeEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
                .setFooter({
                    text: `Commanded by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return await message.reply({ embeds: [errorEmbed] });
        }
    },
};
