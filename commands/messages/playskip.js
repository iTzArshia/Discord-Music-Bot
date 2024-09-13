const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "PlaySkip",
    aliases: ["PS"],
    description: "Plays the song and skips current song.",
    usage: "PlaySkip <Song Name / Song URL / Playlist URL>",
    category: "Play Commands",
    memberVoice: true,
    botVoice: false,
    sameVoice: true,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const string = args.join(" ");
        if (!string) {
            const stringEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Warn")
                .setDescription("Please enter a song url or query to search.")
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [stringEmbed] });
        }

        try {
            // await client.distube.play(memberVC, string, {
            //     member: message.member,
            //     textChannel: message.channel,
            //     message,
            //     skip: true,
            // });

            await client.distube.play(memberVC, string, {
                member: message.member,
                textChannel: message.channel,
                message,
                position: 1,
            });
            await queue.skip();
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
