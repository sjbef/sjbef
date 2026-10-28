# Adding photos to the grants and scholarship galleries

The Catholic School Grants and Scholarship Recipients views are categories in
the Photo Gallery. Both use the same photo list:
`public/page-assets/page_assets_manifest.json`.

## Add a photo

1. **Choose and prepare the image.** Confirm it is appropriate to publish.
   Use a clear, descriptive filename with lowercase letters, numbers, and
   hyphens, such as `2026-school-grant-presentation.jpg` or
   `2026-jane-doe-scholarship.jpg`. Keep the original framing; the gallery
   thumbnail crops the image for display.
2. **Put the file in the correct folder.**
   - School grant: `public/images/gallery/grants/<year>/`
   - Scholarship recipient: `public/images/gallery/scholarships/<year>/`

   For example, a 2026 grant image might be
   `public/images/gallery/grants/2026/2026-school-grant-presentation.jpg`.
3. **Add an entry** to `public/page-assets/page_assets_manifest.json`. Copy a
   nearby entry in the same category and update these fields:
   - `category`: `"grants"` for a school grant or `"scholarships"` for a
     scholarship recipient.
   - `filename`: the image's filename.
   - `localUrl`: its public path, beginning with `/images/gallery/`, for
     example `/images/gallery/grants/2026/2026-school-grant-presentation.jpg`.
   - `year`: the four-digit year to show and filter by.
   - `caption`: a short, useful caption. It becomes both the card title and
     description and supplies the image's HTML alt text, so identify the people
     or school when known, what is happening, and where or when if useful. Do
     not guess names or details.
   - `altText`: concise identification for the card's “who” label. This field
     is not currently used for the image's HTML alt text.

   The gallery only needs `category`, `filename`, `localUrl`, `year`,
   `caption`, and `altText`. Do not add old source-site URLs or metadata.
4. **Save and check the JSON.** There must be a comma between entries, but not
   after the final entry. Use valid JSON double quotes and escape any quote
   marks inside captions.
5. **Preview the gallery.** Run `npm run dev`, open Photo Gallery, select the
   corresponding category and year, and check the card and full-size lightbox.
   Then run `npm run lint` and `npm run build`.

## Improve an existing caption

Find the entry by its `filename` or `localUrl` in
`public/page-assets/page_assets_manifest.json`. Edit `caption` and `altText`
separately:

- Keep `caption` accurate and informative but concise. It appears in the
  gallery card title and description, in the lightbox details, and as the
  image's HTML alt text.
- Use `altText` for the short “who” label on the gallery card. It does not
  currently control the image's HTML alt text.

## Fix an awkward thumbnail crop

Gallery cards use a fixed 4:3 thumbnail with `object-fit: cover`, so the
browser trims some edges to fill the card. The lightbox shows the full image
without cropping.

1. Preview the image in the gallery and note which part should remain visible.
2. In `src/pages/GalleryPage.tsx`, find the thumbnail `<img>` and its
   `object-position` selection. Add the image's distinctive filename to the
   existing top-alignment rule if the subject needs to move toward the top.
   Otherwise adjust the position for that image so its subject remains in
   frame. Keep the default centered crop for other photos.
3. Check the same image at mobile and desktop widths and open it in the
   lightbox. If the photo itself is rotated or framed incorrectly, correct the
   source image instead of trying to compensate with thumbnail positioning.

## Before publishing

Review the change in a branch deploy preview before merging to `main`. A
manifest-only or image-only change still changes site content and requires a
deploy to appear on the live site. Follow the [testing and publishing
instructions](../README.md#testing-changes-before-publishing).
