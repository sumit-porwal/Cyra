const ytdl = require('ytdl-core');
const queue = require('./modules/queue.js');
const ytsearch = require('./ytsearch.js');
const Queue = new queue.Queue();
let dispatcher;
let voiceConnection;
let audioStream;
const play = async (query, message, connection) => {
	const result = await ytsearch.getUrl(query);
	audioStream = await ytdl(JSON.stringify(result.first.url), {
		'type': 'audioonly', 'quality': 'lowestaudio', 'highWaterMark': 1 << 25,
	});
	voiceConnection = connection;
	dispatcher = connection.play(audioStream);
	dispatcher.on('start', () => {
		return dispatcher;
	});


	dispatcher.on('finish', () => {
		Queue.dequeue();
		if (Queue.isEmpty()) {
			//	leaving VC with message
			message.channel.send('nothing to play leaving VC');
			message.member.voice.channel.leave();
		}
		else {
			//	playing song on top of the queue
			play(Queue.front(), message, connection);
			//	sending message about song
			message.channel.send('playing ' + Queue.front());
		}
	});
};

const execute = async (message, args) => {
	args = args.join(' ');
	if (message.member.voice.channel) {
		//	connecting ot VC
		const Connection = await message.member.voice.channel.join();
		//  cheking if queue is empty or not
		if (Queue.isEmpty()) {
			Queue.enqueue(args);
			await play(args, message, Connection);
		}
		else {
			Queue.enqueue(args);
			message.channel.send(args + ' queued.');
		}
	}
	else {
		message.reply('You need to join a voice channel first!');
	}
};
const getDispatcher = ()=> {
	return dispatcher;
};
const getConnection = ()=>{
	return voiceConnection;
};
const getStream = ()=>{
	return audioStream;
};

module.exports = {
	name: 'play',
	description :  'to play the song using query',
	usage : '[query]',
	guildOnly:true,
	args:true,
	Queue:Queue,
	execute:execute,
	audioStream:getStream,
	play:play,
	connection:getConnection,
	Dispatcher:getDispatcher,

};