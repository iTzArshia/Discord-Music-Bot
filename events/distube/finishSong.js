module.exports = async (client, queue) => {
    const previousMessage = await queue.textChannel?.messages.fetch(client.PlayingMessageID).catch(() => null);

    if (previousMessage) {
        await previousMessage.edit({ components: [] });
    }
};
