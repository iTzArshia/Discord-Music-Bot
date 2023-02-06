const Discord = require('discord.js');
const config = require('../../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mysql.db');


module.exports = {
    name: "DeletePlaylist",
    aliases: ["deletepl", "dpl", "deleteplaylist"],
    description: "Deletes an existing music playlist",
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

        return db.all(`SELECT NAME FROM playlists WHERE userid=${userid} AND name='${string}'`, function (err, row) {
            if (row.length > 0) {
                const stringEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription("Deleted `" + string + "` playlist!")
                    .setFooter({
                        text: `Commanded by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 })
                    });
                message.reply({ embeds: [stringEmbed] });
                db.exec(`DELETE FROM playlists WHERE userid=${userid} AND name='${string}'`);
                return;
            } else {
                const stringEmbed = new Discord.EmbedBuilder()
                    .setColor(config.ErrorColor)
                    .setDescription("Playlist does not exists or is not yours!")
                    .setFooter({
                        text: `Commanded by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 })
                    });
                message.reply({ embeds: [stringEmbed] });
                return;
            }
        });
    }
}