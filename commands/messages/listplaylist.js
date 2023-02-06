const Discord = require('discord.js');
const config = require('../../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mysql.db');


module.exports = {
    name: "ListPlaylist",
    aliases: ["list", "listpl", "listplaylist"],
    description: "Lists your playlists",
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        var userid = message.author.id;
        return db.all(`SELECT name FROM playlists WHERE userid=${userid}`, (err, list) => {
            if (list.length < 1) {
                const stringEmbed = new Discord.EmbedBuilder()
                    .setColor(config.ErrorColor)
                    .setDescription("You don't have any playlists!")
                    .setFooter({
                        text: `Commanded by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 })
                    });
                message.reply({ embeds: [stringEmbed] })
                return;
            } else {
                var lists = "";
                for (i in list) {
                    lists += "\n - `" + list[i].name + "`";
                }
                const stringEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setDescription("Your Playlists: " + lists)
                    .setFooter({
                        text: `Commanded by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 })
                    });
                message.reply({ embeds: [stringEmbed] })
            }
        });
    }
}