const { Dispatcher } = require('./play');
module.exports = {
	name:'pause',
	description:'to puase the song',
	guildOnly:true,
	voiceOnly:true,
	execute(message) {
		const dispatcher = Dispatcher();
		dispatcher.pause();
		message.channel.send('Paused');
	},

};