const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, interaction) => {

    if (!interaction.isChatInputCommand()) return;

    ////////////////Execute Commands////////////////

    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(["ViewChannel", "SendMessages", "EmbedLinks", "ReadMessageHistory"])) return;

    const command = client.SlashCommands.get(interaction.commandName);
    if (command) {

        const memberVC = interaction.member.voice.channel || null;
        const botVC = interaction.guild.members.me.voice.channel || null;
        const queue = client.distube.getQueue(interaction.guild) || null;

        if (command.memberVoice) {

            if (!memberVC) return await interaction.reply({ content: 'You aren\'t connected to any Voice Channel.', ephemeral: true });

        };

        if (command.botVoice) {

            if (!botVC) return await interaction.reply({ content: 'I\'m not connected to any Voice Chnanel.', ephemeral: true });

        };

        if (command.sameVoice) {

            if ((memberVC && botVC) && memberVC.id !== botVC.id) return await interaction.reply({ content: 'You aren\'t connected to my Voice Channel.', ephemeral: true });

        };

        if (command.queueNeeded) {

            if (!queue) return await interaction.reply({ content: 'I\'m not playing anything right now.', ephemeral: true });

        };

        try {
            command.execute(client, interaction, memberVC, botVC, queue);
        } catch (error) {
            return await interaction.reply({ content: error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message, ephemeral: true }).catch(() => null);
        };

    };

};