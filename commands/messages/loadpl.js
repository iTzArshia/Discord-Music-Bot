const Discord = require('discord.js');
const config = require('../../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mysql.db');


module.exports = {
    name: "LoadPlaylist",
    aliases: ["loadpl", "load", "lpl"],
    description: "Adds current queue to your playlist (Does not clear the old songs)",
    memberVoice: true,
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
                message.reply({ embeds: [stringEmbed] });
                return;
            }
            var list = row[0].list;
            const playlist = await client.distube.createCustomPlaylist(list.split(','), {
                member: message.member,
                properties: { name: string },
                parallel: true
            })
            
            try {

                await client.distube.play(memberVC, playlist, {
                  member: message.member,
                  textChannel: message.channel,
                  message
                });
          
              } catch (error) {
                
                const errorEmbed = new Discord.EmbedBuilder()
                  .setColor(config.ErrorColor)
                  .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
                  .setFooter({
                    text: `Commanded by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 })
                  });
          
                return await message.reply({ embeds: [errorEmbed] });
          
              };

        });
    }
}