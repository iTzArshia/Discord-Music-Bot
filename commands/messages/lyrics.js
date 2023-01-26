const axios = require('axios');
const Discord = require('discord.js');
const config = require('../../config.json');
const { json } = require('@distube/yt-dlp');

module.exports = {
    name: "lyrics",
    aliases: ["lyric", "lyr"],
    description: "Search you the lyrics!",
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, message, args, cmd) {
        const string = args.join(' ');

        if (!string) {

            const stringEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setDescription("Please enter a song name to search the lyrics.")
                .setFooter({
                    text: `Commanded by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 })
                });

            return await message.reply({ embeds: [stringEmbed] });

        };

        axios.get('https://some-random-api.ml/lyrics?title="' + string + '"')
            .then(json => {
                try {
                    const Lyrics = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setTitle("**" + json.data.author + " - " + json.data.title + "**")
                        .setDescription(json.data.lyrics)
                        .setThumbnail(json.data.thumbnail.genius)
                        .setFooter({
                            text: `Commanded by ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({ size: 1024 })
                        });
                    return message.reply({ embeds: [Lyrics] });
                } catch (error) {
                    const stringEmbed = new Discord.EmbedBuilder()
                        .setColor(config.ErrorColor)
                        .setDescription(json.data.error)
                        .setFooter({
                            text: `Commanded by ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({ size: 1024 })
                        })
                    return message.reply({ embeds: [stringEmbed] });
                }

            });
    }
}
