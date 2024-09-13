const { client } = require("./index");
const { DisTube } = require("distube");
const { YouTubePlugin } = require("@distube/youtube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { AppleMusicPlugin } = require("distube-apple-music");

client.distubeSettings = {
    leaveOnEmpty: true, // Whether or not leaving voice channel if the voice channel is empty after DisTubeOptions.emptyCooldown seconds.
    leaveOnFinish: false, // Whether or not leaving voice channel when the queue ends.
    leaveOnStop: true, // Whether or not leaving voice channel after using DisTube#stop function.
    searchSongs: 10, // DONT SET IT MORE THAN 25!!! | Limit of search results emits in DisTube#event:searchResult event when DisTube#play method executed. If searchSongs <= 1, play the first result.
    emptyCooldown: 60, // Built-in leave on empty cooldown in seconds. (When leaveOnEmpty is true)
    directLink: true, // Whether or not play direct link of the song.
    deleteAfterFinish: false, // Deletes Now Playing Message after song finished.
};

const distubePlugins = [
    new YouTubePlugin(), // YouTube plugin.
    new SoundCloudPlugin(), // SoundCloud plugin.
    new SpotifyPlugin(), // Spotify plugin.
    new DeezerPlugin(), // Deezer plugin.
    new AppleMusicPlugin(), // Apple Music plugin.
    new YtDlpPlugin(), // yt-dlp plugin for supporting 700+ sites.
];

if (client.distubeSettings.directLink) {
    const { DirectLinkPlugin } = require("@distube/direct-link");
    distubePlugins.push(new DirectLinkPlugin());
}

// DisTube client constructor
client.distube = new DisTube(client, {
    // Change these on your risk! more info https://distube.js.org/#/docs/DisTube/stable/typedef/DisTubeOptions
    emitNewSongOnly: false, // Whether or not emitting DisTube#event:playSong event when looping a song or next song is the same as the previous one.
    savePreviousSongs: true, // Whether or not saving the previous songs of the queue and enable DisTube#previous method.
    nsfw: false, // Whether or not playing age-restricted content and disabling safe search in non-NSFW channel.
    emitAddListWhenCreatingQueue: true, // Whether or not emitting addList event when creating a new Queue.
    emitAddSongWhenCreatingQueue: true, // Whether or not emitting addSong event when creating a new Queue.
    joinNewVoiceChannel: false, // Whether or not joining the new voice channel when using DisTube#play method.
    plugins: distubePlugins,
    ffmpeg: {
        path: require("ffmpeg-static"), // If you don't want to use ffmpeg-static you have to remove this!
    },
});
