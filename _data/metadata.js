import config from "./config.json" with { type: "json" };

export default {
	title: config.metadata.title,
	description: config.metadata.description,
	url: config.metadata.url,
	author: config.metadata.author,
	topNav: config.topNav,
	bottomNav: config.bottomNav,
	fonts: config.fonts
}
