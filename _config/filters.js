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

	/* Create a font fetch string out of font names */
	/* Not perfect! Won't handle fonts that don't support 300..700 weights */
	eleventyConfig.addFilter("fontString", (fonts) => {
		let out = "https://fonts.googleapis.com/css2?";
		if (fonts.header)
			out += `family=${fonts.header.replace(" ", "+")}&`;
		if (fonts.body)
			out += `family=${fonts.body.replace(" ", "+")}:ital,wght@0,300..700;1,300..700&`;
		out += "display=swap";
		return out;
	});
}
