module.exports = async (client, queue) => {
    if (client.distubeSettings.leaveOnFinish) {
        setTimeout(async () => {
            await queue.voice.leave();
        }, client.distubeSettings.emptyCooldown * 1000);
    }
};
