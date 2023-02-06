const Discord = require('discord.js');
const config = require('../../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mysql.db');


module.exports = {
	name: "CreatePlaylist",
	aliases: ["createpl", "cpl", "createplaylist"],
	description: "Creates a music playlist",
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

		var userid = message.author.id; //User Discord Id in numbers

		if (string.length > 16 || string.includes(" ")) { //limit the name they enter for fun!
			const stringEmbed = new Discord.EmbedBuilder()
				.setColor(config.ErrorColor)
				.setDescription("Faild to name it!")
				.setFooter({
					text: `Commanded by ${message.author.tag}`,
					iconURL: message.author.displayAvatarURL({ size: 1024 })
				});
			return await message.reply({ embeds: [stringEmbed] });
		}

		return db.all("SELECT name FROM playlists WHERE userid = " + userid, function (err, list) { //get the playlists
			if (list.length > 0) { //if they had more than 1 playlist
				const stringEmbed = new Discord.EmbedBuilder()
					.setColor(config.ErrorColor)
					.setDescription("You already have a playlist!")
					.setFooter({
						text: `Commanded by ${message.author.tag}`,
						iconURL: message.author.displayAvatarURL({ size: 1024 })
					});
				message.reply({ embeds: [stringEmbed] });
			} else { 
				const stringEmbed = new Discord.EmbedBuilder()
					.setColor(config.MainColor)
					.setDescription("Created a playlist with the name of `" + string + "`!")
					.setFooter({
						text: `Commanded by ${message.author.tag}`,
						iconURL: message.author.displayAvatarURL({ size: 1024 })
					});
				message.reply({ embeds: [stringEmbed] });
				db.exec(`INSERT into playlists(userid,name,list) VALUES(${userid},"${string}","NONE")`);
			}
		});
	}
}