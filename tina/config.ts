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
    publicFolder: "_live",
  },
  media: {
    tina: {
      mediaRoot: "public",
      publicFolder: "_live",
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
								required: true,
								type: "string"
							}
						]
					}
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
						name: "author",
						label: "Author",
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
