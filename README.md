# README

## Gryphon to-do

- alt text! Basically every image is missing alt text. Unfortunately this can't be done from the "media management" tab in the admin panel; you need to go into specific posts with images and either edit the "hero image" object or click on the image embedded in the post body.
  - 1 hero image on home page (I gave this one an alt but you should add your own!)
  - 4 images in post "2024 Dream Foundry Art Contest"
  - 1 hero image in post "Birth of the Prophet"
  - 1 hero image in post "Black Paper Art"
  - 1 hero image in post "Feathers and Flowers"
  - 1 hero image in post "My First Publication: Not What I Expected"
- dates! Several posts are missing dates and will show up as the date I ported them in.
  - "Birth of the Prophet"
  - "Black Paper Art"
  - "Feathers and Flowers"
  - "Untitled Polyam Short Story"
  - "Untitled Shapeshifter Found Family"
- tags! I took the liberty of adding two tags in a couple places ("art" and "wip", both added quite sparingly). The "related posts" feature functions via tags, so sparse tagging will cause that feature to rarely appear and thus rarely be useful.
  - I recommend using all lowercase for tags, for consistency. If there are multiple conflicting cases of the same tag (e.g. both Highlight and highlight), the build will complain, so please do be careful on this front (and unfortunately, that's not a thing I can fix afaik).
  - use the tag "highlight" to put posts on the home page!

## Things that can be configured

- Site config: metadata, fonts, colors, and contact info
- Home page hero image, body text, and subtitle
- Pages
- Posts

In all rich text fields, you can use the following syntax to add special classes or other HTML attributes:

```
Here's a random paragraph. {class="small"}
```

This (and a matching CSS rule, of course) is how I achieved the small text in the post "Story Prompts".

If you want specific classes added for effects such as this, just ask.

### Resources

- To browse fonts, use [Google Fonts](https://fonts.google.com/).
- Accessibility testing your color scheme can be done with the [WAVE extension](https://wave.webaim.org/).

## Things that can't be configured

- Because of the need for mobile optimization and the fiddliness of formatting two rows of tabs, the nav bar cannot be configured through the admin panel. If you want nav bar changes, talk to me.
- Pagination count is currently set to 5. If you want that changed, it's an easy fix.
- There's no way at current to add your custom color scheme as a new listed colors scheme, but if you send it to me I can add it to the list.
- Image placement within a page. While I can change image formatting for *all* images - or all post hero images, or all post body images, or other categories - I can't format per-image. Because of the wide variety of image placements possible (before or after a paragraph vs with no surrounding text, for example), I don't want to attempt to inset images.
