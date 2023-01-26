const fetch = require('node-fetch')
const Discord = require('discord.js');
const config = require('../../config.json');
const { json } = require('@distube/yt-dlp');

module.exports = {
    name: "lyrics",
    aliases: ["lyric", "lyr", "l"],
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

        fetch('https://some-random-api.ml/lyrics?title="' + string + '"')
            .then(res => res.json())
            .then(json => {
                try {
                    const Lyrics = new Discord.EmbedBuilder()
                        .setColor(config.MainColor)
                        .setTitle("**" + json.author + " - " + json.title + "**")
                        .setDescription(json.lyrics)
                        .setThumbnail(json.thumbnail.genius)
                        .setFooter({
                            text: `Commanded by ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({ size: 1024 })
                        });
                    return message.reply({ embeds: [Lyrics], allowedMentions: { users: [] } })
                } catch (error) {
                    const stringEmbed = new Discord.EmbedBuilder()
                        .setColor(config.ErrorColor)
                        .setDescription(json.error)
                        .setFooter({
                            text: `Commanded by ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({ size: 1024 })
                        })
                    return message.reply({ embeds: [stringEmbed] });
                }

            });
    }
}
