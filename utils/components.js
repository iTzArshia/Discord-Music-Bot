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

const loopSongToggle = new Discord.ButtonBuilder()
    .setCustomId('loop-song')
    .setEmoji('🔂')
    .setStyle(Discord.ButtonStyle.Secondary);

const previousSong = new Discord.ButtonBuilder()
    .setCustomId('previous')
    .setEmoji('⏮️')
    .setStyle(Discord.ButtonStyle.Secondary);

const paunseUnpause = new Discord.ButtonBuilder()
    .setCustomId('pauseUnpause')
    .setEmoji('⏯️')
    .setStyle(Discord.ButtonStyle.Secondary);

const nextSong = new Discord.ButtonBuilder()
    .setCustomId('next')
    .setEmoji('⏭️')
    .setStyle(Discord.ButtonStyle.Secondary);

const loopQueueToggle = new Discord.ButtonBuilder()
    .setCustomId('loop-queue')
    .setEmoji('🔁')
    .setStyle(Discord.ButtonStyle.Secondary);

const volumeDown = new Discord.ButtonBuilder()
    .setCustomId('vol-down')
    .setEmoji('🔉')
    .setStyle(Discord.ButtonStyle.Secondary);

const backward = new Discord.ButtonBuilder()
    .setCustomId('backward')
    .setEmoji('⏪')
    .setStyle(Discord.ButtonStyle.Secondary);

const stop = new Discord.ButtonBuilder()
    .setCustomId('stop')
    .setEmoji('⏹️')
    .setStyle(Discord.ButtonStyle.Secondary);

const forward = new Discord.ButtonBuilder()
    .setCustomId('forward')
    .setEmoji('⏩')
    .setStyle(Discord.ButtonStyle.Secondary);

const volumeUp = new Discord.ButtonBuilder()
    .setCustomId('vol-up')
    .setEmoji('🔊')
    .setStyle(Discord.ButtonStyle.Secondary);


const row2 = new Discord.ActionRowBuilder()
    .addComponents([
        loopSongToggle,
        previousSong,
        paunseUnpause,
        nextSong,
        loopQueueToggle
    ]);
const row3 = new Discord.ActionRowBuilder()
    .addComponents([
        volumeDown,
        backward,
        stop,
        forward,
        volumeUp
    ]);
    
module.exports.row2 = row2;
module.exports.row3 = row3;