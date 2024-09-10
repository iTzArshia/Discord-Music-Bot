module.exports = async (client, queue) => {
    const previousMessage = await queue.textChannel?.messages.fetch(client.PlayingMessageID).catch(() => null);

    if (previousMessage) {
        if (client.distubeSettings.deleteAfterFinish) {
            await previousMessage.delete();
        } else {
            await previousMessage.edit({ components: [] });
        }
    }
};
