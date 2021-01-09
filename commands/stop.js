const { Dispatcher } = require('./play');
module.exports = {
	name:'stop',
	aliases:['fuckoff', 'leave', 'goaway'],
	guildOnly:true,
	voiceOnly:true,
	description:'to stop play current song and disconnect the bot',
	execute(message) {
		const dispatcher = Dispatcher();
		if (dispatcher) {
			dispatcher.destroy();
			message.member.voice.channel.leave();
		}
		else {
			message.channel.send('no songs playing bitch');
		}
	},
};