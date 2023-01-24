module.exports = {
  name: "Play",
  usage: "Play",
  aliases: ["p"],
  cooldown: 3,
  description: "Plays music for you",

  async execute(client, message, args, cmd) {

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply({ content: `You must be in a voice channel!` });

    const string = args.join(' ');
    if (!string) return message.reply({ content: `Please enter a song url or query to search.` });

    await client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    });

  },

};