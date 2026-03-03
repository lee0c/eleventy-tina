import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { chunk } from "lodash-es";

import pluginFilters from "./_config/filters.js";

export default async function(eleventyConfig) {
	/* Bundles */
	/* CSS */
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
		bundleHtmlContentFromSelector: "style",
	});

	/* Collections */
	/* Tag pagination */
	eleventyConfig.addCollection("tagPagination", function(collection) {
		let tagSet = new Set(collection.getAllSorted().flatMap((post) => post.data.tags || []));
		tagSet = tagSet.difference(new Set(["posts"]));

		let paginationSize = 20;
		let tagMap = [];
		let tagArray = [...tagSet];

		for( let tagName of tagArray) {
			let tagItems = collection.getFilteredByTag(tagName);
			let pagedItems = chunk(tagItems.reverse(), paginationSize);			// console.log( tagName, tagItems.length, pagedItems.length );

			for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
				tagMap.push({
					tagName: tagName,
					pageNumber: pageNumber,
					pageSize: pagedItems.length,
					pageData: pagedItems[pageNumber]
				});
			}
		}

		return tagMap;
	});

	/* Passthrough */
	eleventyConfig
		.addPassthroughCopy("css")
		.addPassthroughCopy("robots.txt");

	/* Navigation */
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	/* Plugins */
	/* All filters from _config/filters.js */
	eleventyConfig.addPlugin(pluginFilters);

	/* Watch when serving */
	eleventyConfig.addWatchTarget("css");
	eleventyConfig.addWatchTarget("_data");
};

export const config = {
  dir: {
    input: "content",
		includes: "../_includes",
		layouts: "../_includes/layouts",
		data: "../_data"
  },
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
	templateFormats: ["html", "md", "njk"],
};
