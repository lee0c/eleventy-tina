export default {
	permalink: function ({ title }) {
		return `/${this.slugify(title)}/index.html`;
	},
	layout: "page.njk"
};
