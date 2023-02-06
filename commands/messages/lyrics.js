const lyricsFinder = require('lyrics-finder');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "lyrics",
    aliases: ["ly", "lyr", "lyric", "text"],
    description: "Shows the current playing song's lyrics",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {

        const response = await lyricsFinder(queue.songs[0].name, "");
      
        if (response) {
            const lyricsEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle(`${queue.songs[0].name}'s Lyrics`)
                .setDescription(response)
                .setThumbnail(queue.songs[0]?.thumbnail)
                .setFooter({
                    text: `Commanded by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 })
                });

            return await message.reply({ embeds: [lyricsEmbed] });

        } else {
            const lyricsEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle(`${queue.songs[0].name}'s Lyrics`)
                .setDescription(`I can't find ${queue.songs[0].name}'s lyrics`)
                .setThumbnail(queue.songs[0]?.thumbnail)
                .setFooter({
                    text: `Commanded by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 })
                });

            return await message.reply({ embeds: [lyricsEmbed] });

        };

    }

};