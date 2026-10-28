# Archived migration material

These files are retained for historical reference and are not part of the
website or its build:

- `gallery-duplicates/duplicates_backup/` contains image copies preserved
  during earlier gallery cleanup. It is outside `public/`, so Vite does not
  publish it with the site.
- `image-audits/` contains reports from the one-time image migration and
  duplicate cleanup.
- `wordpress-migration/` contains one-time WordPress download and processing
  scripts. Their old paths and assumptions are not maintained; do not run
  them as current project tooling.
- `repository-migration/` contains the one-time repository transfer script.

The active site uses `public/page-assets/page_assets_manifest.json` and the
images referenced by that manifest.
