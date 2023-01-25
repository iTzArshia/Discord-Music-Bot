# iTz DJ

[![GitHub stars](https://img.shields.io/github/stars/iTzArshia/iTz-DJ.svg)](https://github.com/iTzArshia/iTz-DJ/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/iTzArshia/iTz-DJ/MusicBot.svg)](https://github.com/iTzArshia/iTz-DJ/network)
[![Downloads](https://img.shields.io/github/downloads/iTzArshia/iTz-DJ/total.svg)](https://github.com/iTzArshia/iTz-DJ/releases/latest)<br>
[![iTz Club Discord](https://badgen.net/discord/members/8hr9CRqmfc)](https://discord.gg/8hr9CRqmfc)
[![iTz Development Discord](https://badgen.net/discord/members/nKrBshQvcK)](https://discord.gg/nKrBshQvcK)

MusicBot is the original Discord music bot written for [Python](https://www.python.org "Python homepage") 3.8+, using the [pycord](https://github.com/Pycord-Development/pycord) library. It plays requested songs from YouTube and other services into a Discord server (or multiple servers). Besides, if the queue becomes empty MusicBot will play through a list of existing songs with configuration. The bot features a permission system allowing owners to restrict commands to certain people. As well as playing songs, MusicBot is capable of streaming live media into a voice channel (experimental).

![Main](https://i.imgur.com/FWcHtcS.png)

## Setup
Setting up the MusicBot is relatively painless - just follow one of the [guides](https://just-some-bots.github.io/MusicBot/). After that, configure the bot to ensure its connection to Discord.

The main configuration file is `config/options.ini`, but it is not included by default. Simply make a copy of `example_options.ini` and rename it to `options.ini`. See `example_options.ini` for more information about configurations.

### Commands

There are many commands that can be used with the bot. Most notably, the `play <url>` command (preceded by your command prefix) will download, process, and play a song from YouTube or a similar site. A full list of commands is available [here](https://just-some-bots.github.io/MusicBot/using/commands/ "Commands").

### Further reading

* [Support Discord server](https://discord.gg/bots)
* [Project license](LICENSE)

<img align="right" src="https://i.imgur.com/zrE80HY.png" height="200" width="200">

# JMusicBot


[![Release](https://img.shields.io/github/release/jagrosh/MusicBot.svg)](https://github.com/jagrosh/MusicBot/releases/latest)
[![License](https://img.shields.io/github/license/jagrosh/MusicBot.svg)](https://github.com/jagrosh/MusicBot/blob/master/LICENSE)
[![Discord](https://discordapp.com/api/guilds/147698382092238848/widget.png)](https://discord.gg/0p9LSGoRLu6Pet0k)<br>
[![CircleCI](https://img.shields.io/circleci/project/github/jagrosh/MusicBot/master.svg)](https://circleci.com/gh/jagrosh/MusicBot)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/gdu6nyte5psj6xfk/branch/master?svg=true)](https://ci.appveyor.com/project/jagrosh/musicbot/branch/master)
[![CodeFactor](https://www.codefactor.io/repository/github/jagrosh/musicbot/badge)](https://www.codefactor.io/repository/github/jagrosh/musicbot)

A cross-platform Discord music bot with a clean interface, and that is easy to set up and run yourself!

[![Setup](http://i.imgur.com/VvXYp5j.png)](https://jmusicbot.com/setup)

## Features
  * Easy to run (just make sure Java is installed, and run!)
  * Fast loading of songs
  * No external keys needed (besides a Discord Bot token)
  * Smooth playback
  * Server-specific setup for the "DJ" role that can moderate the music
  * Clean and beautiful menus
  * Supports many sites, including Youtube, Soundcloud, and more
  * Supports many online radio/streams
  * Supports local files
  * Playlist support (both web/youtube, and local)

## Supported sources and formats
JMusicBot supports all sources and formats supported by [lavaplayer](https://github.com/sedmelluq/lavaplayer#supported-formats):
### Sources
  * YouTube
  * SoundCloud
  * Bandcamp
  * Vimeo
  * Twitch streams
  * Local files
  * HTTP URLs
### Formats
  * MP3
  * FLAC
  * WAV
  * Matroska/WebM (AAC, Opus or Vorbis codecs)
  * MP4/M4A (AAC codec)
  * OGG streams (Opus, Vorbis and FLAC codecs)
  * AAC streams
  * Stream playlists (M3U and PLS)

## Example
![Loading Example...](https://i.imgur.com/kVtTKvS.gif)

## Setup
Please see the [Setup Page](https://jmusicbot.com/setup) to run this bot yourself!

## Questions/Suggestions/Bug Reports
**Please read the [Issues List](https://github.com/jagrosh/MusicBot/issues) before suggesting a feature**. If you have a question, need troubleshooting help, or want to brainstorm a new feature, please start a [Discussion](https://github.com/jagrosh/MusicBot/discussions). If you'd like to suggest a feature or report a reproducible bug, please open an [Issue](https://github.com/jagrosh/MusicBot/issues) on this repository. If you like this bot, be sure to add a star to the libraries that make this possible: [**JDA**](https://github.com/DV8FromTheWorld/JDA) and [**lavaplayer**](https://github.com/sedmelluq/lavaplayer)!

## Editing
This bot (and the source code here) might not be easy to edit for inexperienced programmers. The main purpose of having the source public is to show the capabilities of the libraries, to allow others to understand how the bot works, and to allow those knowledgeable about java, JDA, and Discord bot development to contribute. There are many requirements and dependencies required to edit and compile it, and there will not be support provided for people looking to make changes on their own. Instead, consider making a feature request (see the above section). If you choose to make edits, please do so in accordance with the Apache 2.0 License.

<h1 align="center"><img src="./assets/logo.gif" width="30px"> Discord Music Bot <img src="./assets/logo.gif" width="30px"></h1>
<p align="center">Thanks for 25k Views with 500 subs!</p>

## ✨Latest Updates

Discord.js v13 will break this bot so do not use this with it. We have been started working on [v5](https://github.com/SudhanPlayz/Discord-MusicBot/tree/v5) which will be out in some days/months with new features and much more are on the way.

## 🚧 Prerequisites

- [Node.js 14+](https://nodejs.org/en/download/)
- [discord.js@12.5.3](https://www.npmjs.com/package/discord.js/v/12.5.3)
- [Lavalink Server](https://darrennathanael.com/post/how-to-lavalink/?utm_source=github-sudhanplayz&utm_medium=readme&utm_campaign=sudhanplayz&utm_content=lavalink-prerequisites)

> NOTE: Lavalink is needed for music functionality. You need to have a working Lavalink server to make the bot work.

## 📝 Tutorial

A Tutorial has been uploaded on YouTube, Watch it by clicking on the image down below

[![Advanced Discord Music Bot with Web Dashboard | Spotify Support](https://img.youtube.com/vi/p4lP96Tiv9s/maxresdefault.jpg)](https://www.youtube.com/watch?v=p4lP96Tiv9s)

Repl.it [Tutorial](https://github.com/SudhanPlayz/Discord-MusicBot/wiki/Installation-on-Repl-it)

VPS / Server [Tutorial](https://github.com/SudhanPlayz/Discord-MusicBot/wiki/Installation-on-a-Linux-server)

## 📝 [Support Server](https://discord.gg/sbySMS7m3v)

If you have major coding issues with this bot, please join and ask for help.

## 📸 Screenshots

<div align="left"><img src="/assets/Screenshot_1.png"></div><div align="center"><img src="/assets/Screenshot_2.png"></div><div align="right"><img src="/assets/Screenshot_3.png"></div>

<div align="center"><img src="/assets/feature.png"></div>

## 💨 Run the projects

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/SudhanPlayz/Discord-MusicBot)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/SudhanPlayz/Discord-MusicBot)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Run on Repl.it](https://repl.it/badge/github/SudhanPlayz/Discord-MusicBot)](https://repl.it/github/SudhanPlayz/Discord-MusicBot)
[![Docker Pulls](https://img.shields.io/docker/pulls/darrenofficial/dmusicbot.svg)](https://hub.docker.com/r/darrenofficial/dmusicbot/)

> Note: If you are hosting your bot in heroku, Please consider upgrading your dyno for running dashboard & bot simultaneously because in free dyno it'll run out of memory(as there are two workers). If you want to run only the bot, turn off the `web` dyno.

## ✨ Contributors

Contributions are always welcomed :D Make sure to follow [Contributing.md](/CONTRIBUTING.md)

<a href="https://github.com/SudhanPlayz/Discord-MusicBot/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=SudhanPlayz/Discord-MusicBot" />
</a>

> **Note:** Contributions are not accepted in the master branch. If you like to contribute check out [v5 branch](https://github.com/SudhanPlayz/Discord-MusicBot/tree/v5)

Made with :heart: and JavaScript!


![Node build](https://github.com/eritislami/evobot/actions/workflows/node.yml/badge.svg)
![Docker build](https://github.com/eritislami/evobot/actions/workflows/docker.yml/badge.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![logo](https://repository-images.githubusercontent.com/186841818/8aa95700-7730-11e9-84be-e80f28520325)

# 🤖 EvoBot (Discord Music Bot)

> EvoBot is a Discord Music Bot built with TypeScript, discord.js & uses Command Handler from [discordjs.guide](https://discordjs.guide)

## Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**  
   1.1. Enable 'Message Content Intent' in Discord Developer Portal
2. Node.js 16.11.0 or newer

## 🚀 Getting Started

```sh
git clone https://github.com/eritislami/evobot.git
cd evobot
npm install
```

After installation finishes follow configuration instructions then run `npm run start` to start the bot.

## ⚙️ Configuration

Copy or Rename `config.json.example` to `config.json` and fill out the values:

⚠️ **Note: Never commit or share your token or api keys publicly** ⚠️

```json
{
  "TOKEN": "",
  "MAX_PLAYLIST_SIZE": 10,
  "PREFIX": "!",
  "PRUNING": false,
  "LOCALE": "en",
  "DEFAULT_VOLUME": 100,
  "STAY_TIME": 30
}
```

## 🐬 Docker Configuration

For those who would prefer to use our [Docker container](https://hub.docker.com/repository/docker/eritislami/evobot), you may provide values from `config.json` as environment variables.

```shell
docker run -e "TOKEN=<discord-token>" eritislami/evobot
```

## 📝 Features & Commands

> Note: The default prefix is '!'

- 🎶 Play music from YouTube via url

`!play https://www.youtube.com/watch?v=GLvohMXgcBo`

- 🔎 Play music from YouTube via search query

`!play under the bridge red hot chili peppers`

- 🔎 Search and select music to play

`!search Pearl Jam`

Reply with song number or numbers seperated by comma that you wish to play

Examples: `1` or `1,2,3`

- 📃 Play youtube playlists via url

`!playlist https://www.youtube.com/watch?v=YlUKcNNmywk&list=PL5RNCwK3GIO13SR_o57bGJCEmqFAwq82c`

- 🔎 Play youtube playlists via search query

`!playlist linkin park meteora`

- Now Playing (!np)
- Queue system (!queue, !q)
- Loop / Repeat (!loop)
- Shuffle (!shuffle)
- Volume control (!volume, !v)
- Lyrics (!lyrics, !ly)
- Pause (!pause)
- Resume (!resume, !r)
- Skip (!skip, !s)
- Skip to song # in queue (!skipto, !st)
- Move a song in the queue (!move, !mv)
- Remove song # from queue (!remove, !rm)
- Show ping to Discord API (!ping)
- Show bot uptime (!uptime)
- Toggle pruning of bot messages (!pruning)
- Help (!help, !h)
- Command Handler from [discordjs.guide](https://discordjs.guide/)
- Media Controls via Reactions

![reactions](https://i.imgur.com/0hdUX1C.png)

## 🌎 Locales

Currently available locales are:

- English (en)
- Arabic (ar)
- Brazilian Portuguese (pt_br)
- Czech (cs)
- Dutch (nl)
- French (fr)
- German (de)
- Greek (el)
- Indonesian (id)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Minionese (mi)
- Persian (fa)
- Polish (pl)
- Russian (ru)
- Simplified Chinese (zh_cn)
- Singaporean Mandarin (zh_sg)
- Spanish (es)
- Swedish (sv)
- Traditional Chinese (zh_tw)
- Thai (th)
- Turkish (tr)
- Ukrainian (uk)
- Vietnamese (vi)
- Check [Contributing](#-contributing) if you wish to help add more languages!
- For languages please use [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) two letter format

## 🤝 Contributing

1. [Fork the repository](https://github.com/eritislami/evobot/fork)
2. Clone your fork: `git clone https://github.com/your-username/evobot.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Stage changes `git add .`
5. Commit your changes: `cz` OR `npm run commit` do not use `git commit`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request