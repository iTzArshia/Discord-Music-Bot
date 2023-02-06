const Discord = require('discord.js');
const config = require('../../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mysql.db');


module.exports = {
    name: "AddQueueToPlayList",
    aliases: ["addqueuepl", "addqueue", "aq"],
    description: "Adds current queue to your playlist (Does not clear the old songs)",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

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

        var userid = message.author.id; //just for simplification
        var url = [];
        for (i in queue.songs) {
            url.push(queue.songs[i].url);
        }
        var songs = String(url); //it needs optimizations! I know!


        return db.all(`SELECT list FROM playlists WHERE userid=${userid} AND name='${string}'`, (err, row) => {

            if (row.length < 1) {
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
            list = row[0].list;
            if (list == "NONE") {
                db.exec(`UPDATE playlists SET list='${songs}' WHERE userid=${userid} AND name='${string}'`);
            } else {
                var newsongs = `${list},${songs}`;
                db.exec(`UPDATE playlists SET list='${newsongs}' WHERE userid=${userid} AND name='${string}'`);
            }
            const stringEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setDescription("Added the queue songs to `" + string + "` playlist!")
                .setFooter({
                    text: `Commanded by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 })
                });
            message.reply({ embeds: [stringEmbed] });
        });
    }
}