const Discord = require('discord.js');
const config = require('../../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mysql.db');


module.exports = {
    name: "PlaylistInfo",
    aliases: ["info", "plinfo", "infopl"],
    description: "Adds current queue to your playlist (Does not clear the old songs)",
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {

        const string = args.join(' ').toLowerCase();
        if (!string) {
            const stringEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setDescription("Please enter playlist name.")
                .setFooter({
                    text: `Commanded by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 })
                });
            return await message.reply({ embeds: [stringEmbed] });
        };

        var userid = message.author.id;

        db.all(`SELECT list FROM playlists WHERE userid=${userid} AND name='${string}'`, async (err, row) => {
            if (row.length < 1) {
                const stringEmbed = new Discord.EmbedBuilder()
                    .setColor(config.ErrorColor)
                    .setDescription("Playlist does not exists or is not yours!")
                    .setFooter({
                        text: `Commanded by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 })
                    });
                await message.reply({ embeds: [stringEmbed] });
                return;
            }
            var list = row[0].list;
            const playlist = await client.distube.createCustomPlaylist(list.split(','), {
                member: message.member,
                properties: { name: string },
                parallel: true
            })
            var msg = "";
            for (i in playlist.songs) {
                let n = parseInt(i) + 1;
                msg += `**${n}.** [${playlist.songs[i].name}](${playlist.songs[i].url}) (${playlist.songs[i].formattedDuration})\n`;
            }
            const stringEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle(`\`${string}\` Playlist Info:`)
                .setDescription(msg)
                .setFooter({
                    text: `Commanded by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 })
                });
            return await message.reply({ embeds: [stringEmbed] })
        });
    }
}