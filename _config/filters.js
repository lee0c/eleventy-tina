import { DateTime } from "luxon";

export default function(eleventyConfig) {
	/* Exclude all posts with given URLs from a collection list */
	eleventyConfig.addFilter("excludeFromCollection", function (collection=[], urls=[this.ctx.page.url]) {
		return collection.filter(post => urls.indexOf(post.url) === -1);
	});

	/* Filter a collection by a set of tags, returning any that share one or more tags */
	eleventyConfig.addFilter("filterByTags", function(collection=[], ...requiredTags) {
		  return collection.filter(post => {
			return requiredTags.flat().some(tag => post.data.tags.includes(tag));
		});
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	/* Return n elements from a list */
	eleventyConfig.addFilter("head", (collection=[], n) => {
		if(!Array.isArray(collection) || collection.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return collection.slice(n);
		}

		return collection.slice(0, n);
	});

	/* For <time> elements */
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	/* What it says on the tin */
	eleventyConfig.addFilter("randomize", function(array) {
		// Create a copy of the array to avoid modifying the original
		let shuffledArray = array.slice();

		// Fisher-Yates shuffle algorithm
		for (let i = shuffledArray.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
		}

		return shuffledArray;
	});

	/* Human-readable dates */
	eleventyConfig.addFilter("readableDate", (dateObj, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" })
			.toLocaleString(DateTime.DATE_FULL);
	});

	/* Filter out structural tags */
	eleventyConfig.addFilter("removeBasicTags", (tags) => {
		return tags.filter(tag => ["all", "posts", "tagPagination"].indexOf(tag) === -1);
	});

	/* Create a font fetch string out of font names */
	/* Not perfect! Won't handle fonts that don't support 300..700 weights */
	eleventyConfig.addFilter("fontString", (fonts) => {
		let out = "https://fonts.googleapis.com/css2?";
		if (fonts.header)
			out += `family=${fonts.header.replace(" ", "+")}&`;
		if (fonts.nav)
			out += `family=${fonts.body.replace(" ", "+")}&`;
		if (fonts.body)
			out += `family=${fonts.body.replace(" ", "+")}:ital,wght@0,300..700;1,300..700&`;
		out += "display=swap";
		return out;
	});

	/* What it says on the tin */
	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);

	/* Remove parentheses, spaces, or dashes from a telephone number */
	eleventyConfig.addFilter("telephoneNormalization", (tel) => {
		return tel.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
	});

	/* Strip page number off a path */
	eleventyConfig.addFilter("stripPageNumber", (path) => {
		return path.replace(/[0-9]\//g, "");
	});
}
