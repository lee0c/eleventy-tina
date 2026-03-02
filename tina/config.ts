import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

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
						slugify: (values) => {
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
								}
							},
						]
					},
					{
						name: "topNav",
						label: "Header navigation",
						type: "object",
						list: true,
						ui: {
							itemProps: (item) => {
								return {
									label: item.title
								};
							},
						},
						fields: [
							{
								name: "title",
								label: "Title for nav item",
								required: true,
								type: "string",
							},
							{
								name: "link",
								label: "Link for nav item",
								description: "Please include a trailing slash (e.g. '/about/' rather than '/about')",
								required: true,
								type: "string"
							}
						]
					},
					{
						name: "bottomNav",
						label: "Footer navigation",
						type: "object",
						list: true,
						ui: {
							itemProps: (item) => {
								return {
									label: item.title
								};
							},
						},
						fields: [
							{
								name: "title",
								label: "Title for nav item",
								required: true,
								type: "string",
							},
							{
								name: "link",
								label: "Link for nav item",
								description: "Please include a trailing slash (e.g. '/about/' rather than '/about')",
								required: true,
								type: "string"
							}
						]
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
						description: "this is used for SEO/link preview purposes only."
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
