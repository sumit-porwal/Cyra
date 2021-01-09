const config = require('../config.json');
const { YTSearcher } = require('ytsearcher');


const searcher = new YTSearcher(config.apikey);
const getUrl = async (query)=>{
	const result = await searcher.search(query, {
		'type': 'video',
	});
	return result;

};
module.exports = {
	name:'ytsearch',
	args:true,
	description:'get the youtube url of querry',
	getUrl:getUrl,
	async execute(message, args) {
		const URL = await getUrl(args);
		message.channel.send(URL.first.url);

	},


};
