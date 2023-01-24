const Discord = require('discord.js');
const config = require('../config.json');
const commandCooldown = new Map();

module.exports = async (client, message) => {

    if (!global.isReady) return;

    if (message.channel.type === Discord.ChannelType.DM || message.system || message.author.bot) return;

    ////////////////Execute Commands////////////////

    if (message.content.toLowerCase().startsWith(config.prefix)) {

        if (!message.channel.permissionsFor(message.guild.members.me).has(["ViewChannel", "SendMessages", "EmbedLinks", "ReadMessageHistory"])) return;

        const args = message.content.slice(config.prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        const command = client.MessageCommands.get(cmd) || client.MessageCommands.find(c => c.aliases && c.aliases.includes(cmd));
        if (command) {

            // if (!commandCooldown.has(command.name)) {
            //     client.commandCooldown.set(command.name, new Discord.Collection());
            // }

            // const currentTime = Date.now();
            // const timeStamps = commandCooldown.get(command.name);
            // const cooldownAmount = (command.cooldown) * 1000;

            // if (timeStamps.has(message.author.id)) {
            //     const expirationTime = timeStamps.get(message.author.id) + cooldownAmount;

            //     if (currentTime < expirationTime) {
            //         const timeLeft = (expirationTime - currentTime);

            //         const cooldownEmbed = new Discord.EmbedBuilder()
            //             .setColor('Red')
            //             .setDescription(`Please wait ${func.convertTime(timeLeft)} before using \`${prefix}${command.name}\``)

            //         return await message.reply({ embeds: [cooldownEmbed] }).then(async (msg) => {
            //             setTimeout(async () => {
            //                 await message.delete().catch(() => null);
            //                 await msg.delete().catch(() => null);
            //             }, 10000);
            //         });

            //     };

            // };

            // timeStamps.set(message.author.id, currentTime);
            // setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);

            try {
                command.execute(client, message, args, cmd);
            } catch (error) {
                console.log(message.guild.id, error)
            }

        }
    };

};