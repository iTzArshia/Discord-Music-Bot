const Discord = require("discord.js");
const Distube = require("distube");
const config = require("../../config.json");

module.exports = async (client, oldState, newState) => {
    if (!oldState?.channel) return;
    if (client.distubeSettings.leaveOnEmpty) {
        const connection = client.distube.voices.get(oldState);
        if (connection && Distube.isVoiceChannelEmpty(oldState)) {
            const queue = client.distube.queues.get(oldState);
            const textChannel = queue?.textChannel;

            await connection.leave();

            if (textChannel) {
                const embed = new Discord.EmbedBuilder()
                    .setColor(config.WarnColor)
                    .setTitle("👋🏻 Leaving")
                    .setDescription("The voice channel is empty! Leaving the voice channel.");

                await textChannel?.send({ embeds: [embed] });
            }
        }
    }
};
