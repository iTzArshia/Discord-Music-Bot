/*
    Author: iTz Arshia
    Github: https://github.com/iTzArshia
    Current Version: 1.0.0
    DiscordJs Version: 14.7.1
    DisTube Version: 4.0.4
    @discordjs/voice Version: 
*/

const Discord = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { DeezerPlugin } = require("@distube/deezer");
const fs = require('node:fs');
const config = require('./config.json');

// Discord Client Constructor
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});

// Event Handler
console.log(`Loading Events`);
const events = fs.readdirSync(`./events/`).filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};

// Message Command Handler
console.log(`Loading Message Commands`);
client.MessageCommands = new Discord.Collection();
const commands = fs.readdirSync(`./commands/messages/`).filter(files => files.endsWith('.js'));
for (const file of commands) {
    const command = require(`./commands/messages/${file}`);
    client.MessageCommands.set(command.name.toLowerCase(), command);
    delete require.cache[require.resolve(`./commands/messages/${file}`)];
};

// Slash Command Handler
console.log(`Loading Slash Commands`);
client.SlashCommands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands/interactions/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/interactions/${file}`);
    client.interactionCommands.set(command.data.name, command);
    delete require.cache[require.resolve(`./commands/interactions/${file}`)];
};

client.distube = new DisTube(client, {  // DisTube client constructor
    // Change these on your risk! more info https://distube.js.org/#/docs/DisTube/stable/typedef/DisTubeOptions

    emitNewSongOnly: false,                 // Whether or not emitting DisTube#event:playSong event when looping a song or next song is the same as the previous one
    leaveOnEmpty: true,                     // Whether or not leaving voice channel if the voice channel is empty after DisTubeOptions.emptyCooldown seconds.
    leaveOnFinish: false,                   // Whether or not leaving voice channel when the queue ends.
    leaveOnStop: true,                      // Whether or not leaving voice channel after using DisTube#stop function.
    savePreviousSongs: true,                // Whether or not saving the previous songs of the queue and enable DisTube#previous method
    searchSongs: 5,                         // Limit of search results emits in DisTube#event:searchResult event when DisTube#play method executed. If searchSongs <= 1, play the first result
    searchCooldown: 30,                     // Built-in search cooldown in seconds (When searchSongs is bigger than 0)
    // youtubeCookie: '',                   // YouTube cookies. Read how to get it in YTDL's Example
    // youtubeIdentityToken: '',            // If not given; ytdl-core will try to find it. You can find this by going to a video's watch page; viewing the source; and searching for "ID_TOKEN".
    // customFilters: { },                  // Override defaultFilters or add more ffmpeg filters. Example={ "Filter name"="Filter value"; "8d"="apulsator=hz=0.075" }
    // ytdlOptions: { },                    // ytdl-core get info options
    emptyCooldown: 60,                      // Built-in leave on empty cooldown in seconds (When leaveOnEmpty is true)
    nsfw: false,                            // Whether or not playing age-restricted content and disabling safe search in non-NSFW channel.
    emitAddListWhenCreatingQueue: true,     // Whether or not emitting addList event when creating a new Queue
    emitAddSongWhenCreatingQueue: true,     // Whether or not emitting addSong event when creating a new Queue
    joinNewVoiceChannel: false,             // Whether or not joining the new voice channel when using DisTube#play method
    // streamType: DisTubeStream#type,      // Decide the DisTubeStream#type will be used (Not the same as DisTubeStream#type)
    directLink: true,                       // Whether or not play direct link of the song
    plugins: [                              // DisTube plugins.
        new DeezerPlugin(),                 // Deezer plugin.
        new SpotifyPlugin(),                // Spotify plugin.
        new SoundCloudPlugin(),             // SoundCloud plugin.
        new YtDlpPlugin()                   // yt-dlp plugin for supporting 700+ sites.
    ]

});

// Queue status template
const status = queue => `**Volume:** \`${queue.volume}%\` | **Filters:** \`${queue.filters.names.join(', ') || 'OFF'}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'OFF'}\` | **Autoplay:** \`${queue.autoplay ? 'ON' : 'OFF'}\``;

// Music Player event listeners, more info https://distube.js.org/#/docs/DisTube/stable/class/DisTube
client.distube
    .on('addList', async (queue, playlist) => {         // Emitted after bot add a new playlist to the playing Queue.

        const embed = new Discord.EmbedBuilder()
            .setColor(config.mainColor)
            .setAuthor({
                name: `${playlist.songs[0].user.tag} Added new playlist to the queue`,
                iconURL: playlist.songs[0].user.displayAvatarURL({ size: 1024 })
            })
            .setDescription(`**Playlist:** ${playlist.name} (${playlist.songs.length} songs)`);

        await queue.textChannel?.send({ embeds: [embed] });

    })
    .on('addSong', async (queue, song) => {             // Emitted after bot add a new song to the playing Queue.

        const embed = new Discord.EmbedBuilder()
            .setColor(config.mainColor)
            .setAuthor({
                name: `${song.user.tag} Added new song to the queue`,
                iconURL: song.user.displayAvatarURL({ size: 1024 })
            })
            .setDescription(`**Song:** ${song.name} (${song.formattedDuration})`);

        await queue.textChannel?.send({ embeds: [embed] });

    })
    // .on('deleteQueue', async (queue) => {            // Emitted when a Queue is deleted with any reasons.

    //     const embed = new Discord.EmbedBuilder()
    //         .setColor(config.errorColor)
    //         .setDescription('Queue deleted!');

    //     await queue.textChannel?.send({ embeds: [embed] });

    // })
    .on('disconnect', async (queue) => {                // Emitted when the bot is disconnected to a voice channel.

        const embed = new Discord.EmbedBuilder()
            .setColor(config.errorColor)
            .setDescription('Disconnected!');

        await queue.textChannel?.send({ embeds: [embed] });

    })
    .on('empty', async (queue) => {                     // Emitted when there is no user in the voice channel and there is a playing queue. If there is no playing queue, it will leave the channel without emitting this event.

        const embed = new Discord.EmbedBuilder()
            .setColor(config.errorColor)
            .setDescription('The voice channel is empty! Leaving the voice channel...');

        await queue.textChannel?.send({ embeds: [embed] });

    })
    .on('error', async (textChannel, error) => {        // Emitted when bot encounters an error while playing songs.

        console.error(error);

        const embed = new Discord.EmbedBuilder()
            .setColor(config.errorColor)
            .setDescription(`An error encountered: ${error.message.length > 4096 ? error.message.slice(0, 4093) + '...' : error.message}`);

        await textChannel?.send({ embeds: [embed] });

    })
    // .on('finish', async (queue) => {                 // Emitted when there is no more song in the queue and autoplay is off. bot will leave voice channel.

    //     const embed = new Discord.EmbedBuilder()
    //         .setColor(config.errorColor)
    //         .setDescription('Queue finished!');

    //     await queue.textChannel?.send({ embeds: [embed] });

    // })
    // .on('finishSong', async (queue) => {             // Emitted when bot finished a song.

    //     console.log(queue);

    //     const embed = new Discord.EmbedBuilder()
    //         .setColor(config.errorColor)
    //         .setDescription('Finish song!');

    //     await queue.textChannel?.send({ embeds: [embed] });

    // })
    .on('initQueue', async (queue) => {                 // Emitted when bot initialize a queue to change queue default properties.


    })
    .on('noRelated', async (queue) => {                 // Emitted when autoplay is on, queue is empty, and bot cannot find related songs to play.


        const embed = new Discord.EmbedBuilder()
            .setColor(config.errorColor)
            .setDescription('I can\'t find any related music to play');

        await queue.textChannel?.send({ embeds: [embed] });

    })
    .on('playSong', async (queue, song) => {            // Emitted when bot plays a song.

        const voiceChannel = queue.distube.client.channels.cache.get(queue.voice.channelId);
        const voiceChannelMembers = voiceChannel.members.filter(member => !member.user.bot);

        const embed = new Discord.EmbedBuilder()
            .setColor(config.mainColor)
            .setTitle('Now Playing')
            .setDescription(`Playing **${song.name} (${song.formattedDuration})** for ${voiceChannelMembers.size} listeners in ${voiceChannel}`)
            .setFooter({
                text: `Requested by ${song.user.tag}`,
                iconURL: song.user.displayAvatarURL({ size: 1024 })
            });

        await queue.textChannel?.send({ embeds: [embed] });

    })
    .on('searchCancel', async (message) => {            // Emitted when the search canceled due to timeout.

        const embed = new Discord.EmbedBuilder()
            .setColor(config.errorColor)
            .setDescription('Searching canceled')

        await message.reply({ embeds: [embed] });

    })
    .on("searchDone", () => { })                        // Emitted after the user chose a search result to play.
    .on('searchInvalidAnswer', async (message) => {     // Emitted when the search canceled due to user's next message is not a number or out of results range.

        const embed = new Discord.EmbedBuilder()
            .setColor(config.errorColor)
            .setDescription('Invalid number of result.')

        await message.reply({ embeds: [embed] });

    })
    .on('searchNoResult', async (message) => {          // Emitted when bot cannot find any results for the query.

        const embed = new Discord.EmbedBuilder()
            .setColor(config.errorColor)
            .setDescription('No result found!')

        await message.reply({ embeds: [embed] });

    })
    .on('searchResult', async (message, result) => {    // Emitted when song param of play is invalid url. bot will wait for user's next message to choose a song manually.

        let i = 0;

        const embed = new Discord.EmbedBuilder()
            .setColor(config.mainColor)
            .setTitle('Choose an option from below')
            .setDescription(result.map(song => `**${++i}**. ${song.name} (${song.formattedDuration})`).join('\n'))
            .setFooter({ text: 'Enter anything else or wait 30 seconds to cancel' });

        await message.reply({ embeds: [embed] });

    });

process.on('unhandledRejection', (reason, p) => {
    console.log('[antiCrash] :: Unhandled Rejection/Catch');
    console.log(reason?.stack, p);
});

process.on("uncaughtException", (err, origin) => {
    console.log('[antiCrash] :: Uncaught Exception/Catch');
    console.log(err?.stack, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('[antiCrash] :: Uncaught Exception/Catch (MONITOR)');
    console.log(err?.stack, origin);
});

client.login(config.botToken);