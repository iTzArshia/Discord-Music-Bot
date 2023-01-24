const Discord = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp')
const fs = require('node:fs')
const config = require('./config.json');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});

/////////////////////// Handler ///////////////////////

client.MessageCommands = new Discord.Collection();
client.SlashCommands = new Discord.Collection();

console.log(`Loading Events`);
const events = fs.readdirSync(`./events/`).filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};

///////////////////////// Commands /////////////////////////

console.log(`Loading Message Commands`);
const commands = fs.readdirSync(`./commands/messages/`).filter(files => files.endsWith('.js'));
for (const file of commands) {
    const command = require(`./commands/messages/${file}`);
    client.MessageCommands.set(command.name.toLowerCase(), command);
    delete require.cache[require.resolve(`./commands/messages/${file}`)];
};
///////////////////////// Interactions /////////////////////////

console.log(`Loading Slash Commands`);
const commandFiles = fs.readdirSync(`./commands/interactions/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/interactions/${file}`);
    client.interactionCommands.set(command.data.name, command);
    delete require.cache[require.resolve(`./commands/interactions/${file}`)];
};

/////////////////////// DisTube Handler ///////////////////////

client.distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 30,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
});

// Queue status template
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'
    }\` | Loop: \`${queue.repeatMode
        ? queue.repeatMode === 2
            ? 'All Queue'
            : 'This Song'
        : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

// DisTube event listeners, more in the documentation page
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel?.send(
            `Playing \`${song.name}\` - \`${song.formattedDuration
            }\`\nRequested by: ${song.user}\n${status(queue)}`,
        ),
    )
    .on('addSong', (queue, song) =>
        queue.textChannel?.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        ),
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel?.send(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length
            } songs) to queue\n${status(queue)}`,
        ),
    )
    .on('error', (textChannel, e) => {
        console.error(e);
        textChannel.send(
            `An error encountered: ${e.message.slice(0, 2000)}`,
        );
    })
    .on('finish', queue => queue.textChannel?.send('Finish queue!'))
    .on('finishSong', queue =>
        queue.textChannel?.send('Finish song!'),
    )
    .on('disconnect', queue =>
        queue.textChannel?.send('Disconnected!'),
    )
    .on('empty', queue =>
        queue.textChannel?.send(
            'The voice channel is empty! Leaving the voice channel...',
        ),
    )
    // DisTubeOptions.searchSongs > 1
    .on('searchResult', (message, result) => {
        let i = 0;
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    song =>
                        `**${++i}**. ${song.name} - \`${song.formattedDuration
                        }\``,
                )
                .join(
                    '\n',
                )}\n*Enter anything else or wait 30 seconds to cancel*`,
        );
    })
    .on('searchCancel', message =>
        message.channel.send('Searching canceled'),
    )
    .on('searchInvalidAnswer', message =>
        message.channel.send('Invalid number of result.'),
    )
    .on('searchNoResult', message =>
        message.channel.send('No result found!'),
    )
    .on('searchDone', () => { });

/////////////////////// MongoDB ///////////////////////

// async function connectDB() {
//   await mongoose.connect(config.mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).catch((error) => {
//     console.error('Error in MongoDB connection: ' + error);
//   });
// };

// const db = mongoose.connection;

// db.on('connecting', () => {
//   console.log('Connecting to MongoDB...');
// });

// db.on('connected', () => {
//   console.log('MongoDB connected!');
// });

// db.on('open', () => {
//   console.log('MongoDB connection opened!');
// });

// db.on('reconnected', () => {
//   console.log('MongoDB Reconnected!');
// });

// db.on('disconnected', () => {
//   console.log('MongoDB Disconnected!');
//   connectDB();
// });

// db.on('error', (error) => {
//   console.error('Error in MongoDB connection: ' + error);
//   mongoose.disconnect();
// });

// connectDB();

/////////////////////// Anti Crash ///////////////////////

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

///////////////////////// Login /////////////////////////

client.login(config.botToken);