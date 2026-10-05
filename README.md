# Saint-Jean-Baptiste Educational Foundation website

Source for **<https://sjbef.org>**, the bilingual (English/French) website of
the Saint-Jean-Baptiste Educational Foundation (SJBEF): scholarships, Catholic
school grants, newsletters, photo gallery, and how to donate.

It's a static React + Vite + Tailwind site. There is no server or database:
`npm run build` produces plain files in `dist/`, which Netlify serves.

Accounts, ownership, DNS, and email are documented in
[`docs/org-migration.md`](docs/org-migration.md).

## Run it locally

Requires Node.js 22 (the version Netlify builds with).

```sh
npm install
npm run dev       # http://localhost:3000
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run lint      # TypeScript type check
```

No environment variables or API keys are needed. (`.env.example` and some
dependencies are left over from the Google AI Studio template the site started
from; the site doesn't use Gemini.)

## Publishing

Push to `main` on <https://github.com/sjbef/sjbef>. Netlify (project `sjbef`,
owned by `sjbefadmin@gmail.com`) builds it with the settings in
[`netlify.toml`](netlify.toml) and it's live at sjbef.org in about a minute.

Each push to `main` is a production deploy and costs 15 of the Free plan's 300
monthly Netlify credits. If the credits run out, Netlify takes the site offline
until the next billing period. So batch changes into as few pushes as possible.
Pushes that only change Markdown files, `docs/` or `scripts/` skip the build
(see `ignore` in `netlify.toml`). To force a rebuild of the live site anyway,
use Netlify → Deploys → Trigger deploy (15 credits).

### Testing changes before publishing

Deploy previews are free and unlimited:

1. Push your changes to a branch and open a pull request against `main`.
2. Netlify builds a preview at `https://deploy-preview-<PR number>--sjbef.netlify.app`.
   Previews are private, so open the link in a browser signed in to Netlify as
   `sjbefadmin`. Each new push to the branch rebuilds the preview.
3. When it looks right, merge the pull request. That merge is the one
   production deploy.

Forms work on previews too. Test submissions are stored and emailed like real
ones, so delete them afterward from Netlify → Forms. Full steps, including how
to test forms and add a new one: [docs/testing-changes.md](docs/testing-changes.md).

## Where things are

| Path | What's there |
|---|---|
| `src/App.tsx` | Site shell, navigation, shared state, and page sections not yet extracted |
| `src/pages/LegacyPage.tsx` | Our Legacy page: SJBEF history and its scholarship and Catholic school grant mission |
| `src/pages/GalleryPage.tsx` | Photo gallery, filters, and lightbox |
| `src/pages/AboutPage.tsx` | About page: foundation history, mission, and board of trustees |
| `src/pages/ScholarshipsPage.tsx` | Scholarship details, downloadable applications, and online Google Forms |
| `src/pages/NewslettersPage.tsx` | Newsletter archive, search and year filters, digital articles, and PDF viewer |
| `src/pages/DonatePage.tsx` | Donation tiers, custom amount form, and simulated checkout |
| `src/content.json` | Most page text, in two languages. **French is under the key `es`**, not `fr` (a quirk of the template; the app's `lang` state uses `'en' \| 'es'` too) |
| `src/index.css` | Tailwind setup and brand colors |
| `public/images/gallery/` | Gallery photos by type and year (`grants/2025/…`, `scholarships/2014/…`) |
| `public/images/logo/`, `public/images/about/` | Logo and About-page images |
| `public/documents/` | Printable PDF applications (scholarship, seminarian, volunteer service) |
| `public/page-assets/page_assets_manifest.json` | The gallery's photo list (caption, year, `localUrl` into `public/images/gallery/`), originally scraped from the old WordPress site and loaded at runtime |
| `public/images/duplicates_backup/` | Backup copies made by the image de-duplication cleanup; not used by the site |
| `scripts/*.gs` | Google Apps Script that generated the three scholarship Google Forms (already created; kept for reference) |
| `scripts/download-*.js`, `scripts/process-page-assets.js` | One-off tools used to pull images from the old WordPress site |
| `scripts/compress-images.js` | Compresses gallery images in place with `sharp` (`--dry-run` to preview) |
| `scripts/transfer-repo-to-org.sh` | Used once to move the repo into the `sjbef` GitHub org |
| `*_report.json` (repo root) | Output from the image cleanup scripts |

## Changing content

- **Text:** edit `src/content.json` (both `en` and `es`), or the strings in
  `src/App.tsx` for text that isn't in `content.json` yet. Many strings in
  `App.tsx` are written inline as `lang === 'en' ? '…' : '…'`.
- **Gallery photos:** add the image under `public/images/gallery/<grants|scholarships>/<year>/`
  and add an entry (`localUrl`, `caption`, `year`, …) to
  `public/page-assets/page_assets_manifest.json`, copying an existing entry's shape.
- **Newsletters:** add an entry to the `defaultNewsletters` list in
  `src/App.tsx`; put its PDF in `public/newsletters/`.
- **Scholarship forms:** the three forms are Google Forms owned by
  `sjbefadmin@gmail.com`; edit them in that account's Google Drive. The site
  only links to and embeds their public `…/viewform` URLs.
- **Contact form:** submissions go to [Netlify Forms](https://docs.netlify.com/manage/forms/setup/)
  (Netlify → the sjbef project → Forms → `contact`), which can email a
  notification for each one. Netlify only processes forms on a deployed site,
  not under `npm run dev`. Because the page is rendered by React, Netlify finds
  the form through a hidden copy in `index.html`; if you add or rename a field,
  change it in both places. The notification email's subject comes from a
  hidden `subject` field (`[SJBEF Contact] <visitor's topic>`). That field
  overrides any subject line set in the Netlify UI.

## Known limitations

- **Donation form**: a simulation; no payment is processed.

The scholarship application, seminarian, and volunteer service forms *do* work.
They're real Google Forms. The scholarship application requires applicants to
sign in to Google because it has a file-upload question.
