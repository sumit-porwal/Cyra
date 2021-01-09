module.exports = {
	name: 'ping',
	cooldown: 5,
	guildOnly:true,
	description: 'Ping!',
	execute(message) {
		message.channel.send('Pinging...').then(sent => {
			sent.edit(`Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
		});
	},
};