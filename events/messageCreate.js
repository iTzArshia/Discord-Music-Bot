const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, message) => {

    if (message.channel.type === Discord.ChannelType.DM || message.system || message.author.bot) return;

    ////////////////Execute Commands////////////////

    if (message.content.toLowerCase().startsWith(config.prefix)) {

        if (!message.channel.permissionsFor(message.guild.members.me).has(["ViewChannel", "SendMessages", "EmbedLinks", "ReadMessageHistory"])) return;

        const args = message.content.slice(config.prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        const command = client.MessageCommands.get(cmd) || client.MessageCommands.find(c => c.aliases && c.aliases.includes(cmd));
        if (command) {

            const memberVC = message.member.voice.channel || null;
            const botVC = message.guild.members.me.voice.channel || null;
            const queue = client.distube.getQueue(message.guild) || null;

            if (command.memberVoice) {

                if (!memberVC) {

                    const inVoiceEmbed = new Discord.EmbedBuilder()
                        .setColor(config.errorColor)
                        .setDescription('You aren\'t connected to any Voice Channel.');

                    return await message.reply({ embeds: [inVoiceEmbed] });

                };

            };

            if (command.botVoice) {

                if (!botVC) {

                    const inVoiceEmbed = new Discord.EmbedBuilder()
                        .setColor(config.errorColor)
                        .setDescription('I\'m not connected to any Voice Chnanel.');

                    return await message.reply({ embeds: [inVoiceEmbed] });

                };

            };

            if (command.sameVoice) {

                if ((memberVC && botVC) && memberVC.id !== botVC.id) {

                    const inVoiceEmbed = new Discord.EmbedBuilder()
                        .setColor(config.errorColor)
                        .setDescription('You aren\'t connected to my Voice Channel.');

                    return await message.reply({ embeds: [inVoiceEmbed] });

                };

            };

            if (command.queueNeeded) {

                if (!queue) {

                    const noQueueEmbed = new Discord.EmbedBuilder()
                        .setColor(config.errorColor)
                        .setDescription('I\'m not playing anything right now.');

                    return await message.reply({ embeds: [noQueueEmbed] });

                };

            };

            try {
                command.execute(client, message, args, cmd, memberVC, botVC, queue);
            } catch (error) {
                console.log(message.guild.id, error);
            };

        };

    };

};