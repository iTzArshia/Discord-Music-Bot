const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Help",
    aliases: ["H", "CMD", "CMDs", "Command", "Commands"],
    description: "Shows This!",
    usage: "Help [CMD]",
    category: "Utilities Commands",
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const playCommands = [...client.MessageCommands.values()].filter((command) => command.category === "Play Commands");
        const songCommands = [...client.MessageCommands.values()].filter((command) => command.category === "Song Commands");
        const queueCommands = [...client.MessageCommands.values()].filter((command) => command.category === "Queue Commands");
        const utilitiesCommands = [...client.MessageCommands.values()].filter((command) => command.category === "Utilities Commands");

        const helpEmbed = new Discord.EmbedBuilder()
            .setColor(config.MainColor)
            .setTitle("❓ Help")
            .setFooter({ text: "Developed by iTz Arshia#7650 https://github.com/iTzArshia/Discord-Music-Bot" });

        if (
            args[0] &&
            (client.MessageCommands.find((command) => command.name.toLowerCase() === args[0].toLowerCase()) ||
                client.MessageCommands.find((c) => c.aliases?.map((aliase) => aliase.toLowerCase()).includes(args[0].toLowerCase())))
        ) {
            const command =
                client.MessageCommands.find((command) => command.name.toLowerCase() === args[0].toLowerCase()) ||
                client.MessageCommands.find((c) => c.aliases?.map((aliase) => aliase.toLowerCase()).includes(args[0].toLowerCase()));

            helpEmbed.setDescription(`Detailed Information about **${command.name}**:`).addFields(
                {
                    name: "Command Name:",
                    value: `\`${config.Prefix}${command.name}\``,
                    inline: false,
                },
                {
                    name: "Aliases:",
                    value: command.aliases
                        ? command.aliases.map((aliase) => `\`${config.Prefix}${aliase}\``).join(" | ")
                        : "There is no Aliases for this Command",
                    inline: false,
                },
                {
                    name: "Usage:",
                    value: command.usage ? config.Prefix + command.usage : "`There is no Usage for this Command`",
                    inline: false,
                },
                {
                    name: "Description:",
                    value: command.description || "`There is no Description for this Command`",
                    inline: false,
                }
            );
        } else {
            helpEmbed
                .setDescription(
                    `You can also use the command \`${config.Prefix}Help CMD\` to access detailed information about available commands and their functionalities.`
                )
                .addFields(
                    {
                        name: "Play Commands:",
                        value: playCommands.map((command) => "`" + config.Prefix + command.name + "`").join(", "),
                        inline: false,
                    },
                    {
                        name: "Song Commands:",
                        value: songCommands.map((command) => "`" + config.Prefix + command.name + "`").join(", "),
                        inline: false,
                    },
                    {
                        name: "Queue Commands:",
                        value: queueCommands.map((command) => "`" + config.Prefix + command.name + "`").join(", "),
                        inline: false,
                    },
                    {
                        name: "Utilities Commands:",
                        value: utilitiesCommands.map((command) => "`" + config.Prefix + command.name + "`").join(", "),
                        inline: false,
                    }
                );
        }

        await message.reply({ embeds: [helpEmbed] });
    },
};
