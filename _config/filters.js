import { DateTime } from "luxon";

export default function(eleventyConfig) {
	/* For <time> elements */
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	/* Human-readable dates */
	eleventyConfig.addFilter("readableDate", (dateObj, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" })
			.toLocaleString(DateTime.DATE_FULL);
	});

	/* Filter out structural tags */
	eleventyConfig.addFilter("removeBasicTags", (tags) => {
		return tags.filter(tag => ["posts"].indexOf(tag) === -1);
	});
}
