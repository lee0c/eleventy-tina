import { defineConfig } from "tinacms";
import { DateTime } from "luxon";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
const currentTime = DateTime.now();

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },
  media: {
    tina: {
      mediaRoot: "public",
      publicFolder: "_site",
    },
  },
	search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
			{
				name: "config",
				label: "Site config",
				path: "_data",
				format: "json",
				ui: {
					global: true,
					filename: {
						readonly: true,
						slugify: () => {
							return "config";
						}
					}
				},
				fields: [
					{
						name: "metadata",
						label: "Site metadata",
						type: "object",
						fields: [
							{
								name: "title",
								label: "Site title",
								type: "string",
								isTitle: true,
								required: true
							},
							{
								name: "description",
								label: "Site description",
								type: "string",
								required: true,
							},
							{
								name: "url",
								label: "Site URL",
								type: "string",
								required: true,
							},
							{
								name: "author",
								label: "Site author",
								type: "string",
								required: true,
							}
						]
					},
					{
						name: "fonts",
						label: "Site fonts",
						type: "object",
						required: true,
						fields: [
							{
								name: "header",
								label: "Header font",
								type: "string",
							},
							{
								name: "headerFallback",
								label: "Header fallback font",
								type: "string",
								required: true,
								options: [
									{ label: "serif", value: "serif" },
									{ label: "sans serif", value: "sans-serif" }
								],
								ui: {
									component: "radio-group"
								}
							},
							{
								name: "body",
								label: "Body font",
								type: "string",
							},
							{
								name: "bodyFallback",
								label: "Body fallback font",
								type: "string",
								required: true,
								options: [
									{ label: "serif", value: "serif" },
									{ label: "sans serif", value: "sans-serif" }
								],
								ui: {
									component: "radio-group"
								},
							},
							{
								name: "nav",
								label: "Nav font",
								type: "string",
							},
							{
								name: "navFallback",
								label: "Nav fallback font",
								type: "string",
								required: true,
								options: [
									{ label: "serif", value: "serif" },
									{ label: "sans serif", value: "sans-serif" }
								],
								ui: {
									component: "radio-group"
								},
							},
							{
								name: "navPadding",
								label: "Nav item top padding",
								description: "You may need to tweak this value depending on your font. Value in rem. Recommended range 0-0.5",
								type: "number",
							}
						]
					},
					{
						name: "colors",
						label: "Site color scheme",
						type: "object",
						required: true,
						fields: [
							{
								name: "dark2",
								label: "Dark mode background",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#1d2c2a", "#190b23"],
									widget: "sketch",
								}
							},
							{
								name: "dark1",
								label: "Dark mode folder",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#17201f", "#090b1e"],
									widget: "sketch",
								}
							},
							{
								name: "dark3",
								label: "Dark mode text blocks",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#233d3a", "#2e0d2b"],
									widget: "sketch",
								}
							},
							{
								name: "darkTextBody",
								label: "Dark mode text (body)",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#eadfc6", "#becfff"],
									widget: "sketch",
								}
							},
							{
								name: "darkTextHeader",
								label: "Dark mode text (headers)",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#eadfc6", "#a8beff"],
									widget: "sketch",
								}
							},
							{
								name: "light2",
								label: "Light mode background",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#93b896", "#fee1bd"],
									widget: "sketch",
								}
							},
							{
								name: "light1",
								label: "Light mode folder",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#69966e", "#b7d0ea"],
									widget: "sketch",
								}
							},
							{
								name: "light3",
								label: "Light mode text blocks",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#a6c9a8", "#fff1c2"],
									widget: "sketch",
								}
							},
							{
								name: "lightTextBody",
								label: "Light mode text (body)",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#212226", "#152333"],
									widget: "sketch",
								}
							},
							{
								name: "lightTextHeader",
								label: "Light mode text (headers)",
								type: "string",
								required: true,
								ui: {
									component: "color",
									colors: ["#212226", "#183350"],
									widget: "sketch",
								}
							},
						]
					},
					{
						name: "contacts",
						label: "Contact information",
						type: "object",
						list: true,
						ui: {
							itemProps: (item) => {
								return { label: item?.title };
							},
						},
						fields: [
							{
								name: "title",
								label: "Contact text",
								type: "string",
								required: true
							},
							{
								name: "type",
								label: "Contact type",
								type: "string",
								required: true,
								options: [
									{ label: "email", value: "email" },
									{ label: "telephone", value: "telephone" },
									{ label: "link", value: "link" },
									{ label: "plain text", value: "text" },
								],
								ui: {
									component: "radio-group"
								}
							},
							{
								name: "value",
								label: "Contact value (email, link, etc)",
								type: "string"
							}
						]
					},
				]
			},
			{
				name: "home",
				label: "Home page",
				path: "content/home",
				ui: {
					filename: {
						readonly: true,
						slugify: () => {
							return "home";
						}
					},
					allowedActions: {
						delete: false,
						createNestedFolder: false,
					}
				},
				defaultItem: () => {
					return {
						title: "Home",
					}
				},
				fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
					{
						type: "string",
						name: "subtitle",
						label: "Subtitle",
					},
					{
						type: "object",
						name: "hero",
						label: "Hero image",
						fields: [
							{
								type: "image",
								name: "image",
								label: "Image",
							},
							{
								type: "string",
								name: "alt",
								label: "Alt text",
							},
						]
					},
					{
						type: "rich-text",
						name: "body",
						label: "body",
						isBody: true,
						required: true,
					},
				]
			},
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
					{
						type: "object",
						name: "hero",
						label: "Hero image",
						fields: [
							{
								type: "image",
								name: "image",
								label: "Image",
							},
							{
								type: "string",
								name: "alt",
								label: "Alt text",
							},
						]
					},
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ]
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
				defaultItem: () => {
					return {
						date: currentTime, // defined at top of file
					}
				},
				fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
					{
						type: "datetime",
						name: "date",
						label: "Date",
						ui: {
							dateFormat: 'YYYY-MM-DD',
						},
					},
					{
						type: "string",
						name: "description",
						label: "Description",
					},
					{
						type: "object",
						name: "hero",
						label: "Hero image",
						fields: [
							{
								type: "image",
								name: "image",
								label: "Image",
							},
							{
								type: "string",
								name: "alt",
								label: "Alt text",
							},
						]
					},
					{
						type: "string",
						name: "tags",
						label: "Tags",
						list: true
					},
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
						required: true
					}
				],
			}
    ],
  },
});
