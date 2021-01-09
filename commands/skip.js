const play = require('./play');
module.exports = {
	name:'skip',
	description:'to skip currenly palying song and play new song',
	guildOnly:true,
	voiceOnly:true,
	execute(message) {
		const connection = play.connection();
		// console.log(connection);
		if (play.Queue.isEmpty()) {
			message.channel.send('nothing to play');
		}
		else {
			play.Queue.dequeue();
			play.play(play.Queue.front(), message, connection);
			message.channel.send('skipped song');
		}
	},
};