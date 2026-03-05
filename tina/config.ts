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
					},
					allowedActions: {
						create: false,
						delete: false,
						createNestedFolder: false,
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
								name: "darkPalette",
								label: "Dark mode palette",
								type: "string",
								required: true,
								ui: {
									component: "select",
								},
								options: [
									{ label: "Olive drab", value: "drab" },
									{ label: "Sunset", value: "sunset" },
									{ label: "Beach", value: "beach" },
									{ label: "Bisexual", value: "bisexual" },
									{ label: "Mustard", value: "mustard" },
									{ label: "OG (original green)", value: "green" },
									{ label: "Custom", value: "custom" }
								]
							},
							{
								name: "lightPalette",
								label: "Light mode palette",
								type: "string",
								required: true,
								ui: {
									component: "select",
								},
								options: [
									{ label: "Olive drab", value: "drab" },
									{ label: "Sunset", value: "sunset" },
									{ label: "Beach", value: "beach" },
									{ label: "OG (original green)", value: "green" },
									{ label: "Custom", value: "custom" }
								]
							},
							{
								name: "customDark",
								label: "Custom color scheme for dark mode",
								description: "Create this if you chose 'custom' for dark mode palette above",
								type: "object",
								fields: [
									{
										name: "bg",
										label: "Background",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
									{
										name: "bgFolder",
										label: "Folder",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
									{
										name: "bgBlocks",
										label: "Text blocks",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
									{
										name: "textBody",
										label: "Body text",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
									{
										name: "textHeader",
										label: "Header text",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
								]
							},
							{
								name: "customLight",
								label: "Custom color scheme for light mode",
								description: "Create this if you chose 'custom' for light mode palette above",
								type: "object",
								fields: [
									{
										name: "bg",
										label: "Background",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
									{
										name: "bgFolder",
										label: "Folder",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
									{
										name: "bgBlocks",
										label: "Text blocks",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
									{
										name: "textBody",
										label: "Body text",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
									{
										name: "textHeader",
										label: "Header text",
										type: "string",
										ui: {
											component: "color",
											widget: "sketch",
										}
									},
								]
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
						create: false,
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
					}
				],
			}
    ],
  },
});
