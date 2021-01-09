const { Dispatcher } = require('./play');
module.exports = {
	name:'resume',
	description:'to play the pasued song',
	guildOnly:true,
	voiceOnly:true,
	execute(message) {
		const dispatcher = Dispatcher();
		message.channel.send('Resuming...');
		dispatcher.resume();
	},

};