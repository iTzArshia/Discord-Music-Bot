module.exports = {

	suffix: function (number) { // 1 => 1st, 2 => 2nd, 3 => 3rd, 4 => 4th...
		let j = number % 10, k = number % 100;
		if (j === 1 && k !== 11) return number + "st";
		if (j === 2 && k !== 12) return number + "nd";
		if (j === 3 && k !== 13) return number + "rd";
		return number + "th";
	},

	numberWithCommas: function (number) { // 1000 to 1,000
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
    timestamp: function (ms) {
        return `<t:${Math.trunc(ms / 1000)}:D> | <t:${Math.trunc(ms / 1000)}:R>`;
    },
    
	queueStatus: function (queue) {// Queue status template
		return `**Volume:** \`${queue.volume}%\` | **Filters:** \`${queue.filters.names.join(', ') || 'OFF'}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'OFF'}\` | **Autoplay:** \`${queue.autoplay ? 'ON' : 'OFF'}\``;
	},

};