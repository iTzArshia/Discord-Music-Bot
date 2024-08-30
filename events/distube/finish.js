module.exports = async (client, queue) => {
    if (client.distubeSettings.leaveOnFinish) await queue.voice.leave();
};
