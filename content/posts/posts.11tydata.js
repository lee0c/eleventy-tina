export default {
	permalink: function ({ title }) {
		return `/blog/${this.slugify(title)}/index.html`;
	},
	tags: [
		"posts"
	],
	layout: "post.njk"
};
