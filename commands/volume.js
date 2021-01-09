const { Dispatcher } = require('./play');
module.exports = {
	name:'volume',
	description:'to set volume of currently playing song',
	args:true,
	guildOnly:true,
	voiceOnly:true,
	execute(message, args) {
		const dispatcher = Dispatcher();
		args = parseInt(args);
		if(args > 0 && args < 100) {
			args = args / 100;
			dispatcher.setVolume(args);
			message.channel.send(`The Volume if set to ${args * 100}`);
		}
		else{
			message.channel.send('volume can only be set between 0 to 100');

		}
	},

};