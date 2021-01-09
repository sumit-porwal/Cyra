module.exports = {
	name: 'del',
	aliase:['clear', 'delete'],
	description:'to delet messages from guild',
	execute(message, args) {
		args = parseInt(args);
		if(!args) {
			args = 1;
		}
		const Channel = message.channel;
		Channel.messages.fetch({ limit: args }).then(messages => {
			messages.forEach(msg=>{
				msg.delete();
			});
		}).catch(console.error);
	},
};