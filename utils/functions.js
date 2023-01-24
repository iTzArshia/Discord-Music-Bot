module.exports = {

	numberWithCommas: function (number) { // 1000 to 1,000
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
    
	queueStatus: function (queue) {// Queue status template
		return `**Volume:** \`${queue.volume}%\` | **Filters:** \`${queue.filters.names.join(', ') || 'OFF'}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'OFF'}\` | **Autoplay:** \`${queue.autoplay ? 'ON' : 'OFF'}\``;
	},

};