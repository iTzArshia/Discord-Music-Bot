const Discord = require("discord.js");
const { YouTubePlugin } = require("@distube/youtube");
const config = require("../../config.json");

module.exports = {
    name: "Search",
    aliases: ["S"],
    description: "Search song for you.",
    usage: "Search <Song Name>",
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
                .setDescription("Please enter a song name or query to search.")
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [stringEmbed] });
        }

        try {
            const ytPlugin = new YouTubePlugin();
            const songsArray = await ytPlugin.search(string, { type: "video", limit: client.distubeSettings.searchSongs, safeSearch: true });

            const searchEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔍 Search")
                .setDescription(
                    `Please select one of the songs below to enjoy your chosen song!\n\n` +
                        songsArray.map((song, index) => `[${index + 1}.](${song.url}) ${song.name} (${song.formattedDuration})`).join("\n")
                )
                .setFooter({
                    text: `Requested by ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            const menu = new Discord.StringSelectMenuBuilder()
                .setCustomId("songsMenu")
                .setPlaceholder("Select a song.")
                .setMaxValues(songsArray.length)
                .addOptions(
                    songsArray.map((song) => {
                        return {
                            label: song.name.length > 80 ? song.name.slice(0, 77) + "..." : song.name,
                            value: song.id,
                        };
                    })
                );

            const row = new Discord.ActionRowBuilder().addComponents(menu);

            const reply = await message.reply({ embeds: [searchEmbed], components: [row] });
            const collector = reply.createMessageComponentCollector({ time: 60000 });

            collector.on("collect", async (int) => {
                if (int.member.id !== message.author.id)
                    await int.reply({
                        content: `You can't use this, it's only works for ${message.author.globalName || message.author.username}`,
                        ephemeral: true,
                    });

                await collector.stop("played");
                await int.deferUpdate();

                for (const value of int.values) {
                    const thisSong = songsArray.find((song) => song.id === value);

                    await client.distube.play(memberVC, thisSong.url, {
                        member: message.member,
                        textChannel: message.channel,
                        reply,
                    });
                }
            });

            collector.on("end", async (collected, reason) => {
                if (["messageDelete", "messageDeleteBulk"].includes(reason)) return;
                menu.setDisabled();
                const disabledRow = new Discord.ActionRowBuilder().addComponents(menu);
                await reply.edit({ components: [disabledRow] });
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
