const Discord = require('discord.js');

const paginationStartButton = new Discord.ButtonBuilder()
    .setCustomId('start')
    .setLabel('First')
    .setStyle(Discord.ButtonStyle.Secondary);

const paginationBackButton = new Discord.ButtonBuilder()
    .setCustomId('back')
    .setLabel('Previous')
    .setStyle(Discord.ButtonStyle.Secondary);

const paginationForwardButton = new Discord.ButtonBuilder()
    .setCustomId('forward')
    .setLabel('Next')
    .setStyle(Discord.ButtonStyle.Secondary);

const paginationEndButton = new Discord.ButtonBuilder()
    .setCustomId('end')
    .setLabel('Last')
    .setStyle(Discord.ButtonStyle.Secondary);

module.exports.paginationStartButton = paginationStartButton;
module.exports.paginationBackButton = paginationBackButton;
module.exports.paginationForwardButton = paginationForwardButton;
module.exports.paginationEndButton = paginationEndButton;