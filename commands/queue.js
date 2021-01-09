const play = require('./play.js');
module.exports = {
	name:'queue',
	aliases: ['playlist'],
	guildOnly:true,
	execute(message) {
		message.channel.send(play.Queue.printQueue());
	},
};