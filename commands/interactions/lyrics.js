const axios = require('axios');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Shows the current playing song's lyrics."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {

        await interaction.deferReply();

        const response = await axios.get(`https://some-random-api.ml/lyrics?title="${queue.songs[0].name}"`);
        const data = response?.data;

        if (data) {

            const lyricsEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle(`${queue.songs[0].name}'s Lyrics`)
                .setDescription(data.lyrics)
                .setThumbnail(queue.songs[0]?.thumbnail)
                .setFooter({
                    text: `Commanded by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 })
                });

            return await interaction.editReply({ embeds: [lyricsEmbed] });

        } else {

            const lyricsEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle(`${queue.songs[0].name}'s Lyrics`)
                .setDescription(`I can't find ${queue.songs[0].name}'s lyrics`)
                .setThumbnail(queue.songs[0]?.thumbnail)
                .setFooter({
                    text: `Commanded by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 })
                });

            return await interaction.editReply({ embeds: [lyricsEmbed] });

        };

    }

};