# SJBEF organizational accounts

The website, its source code, DNS, email routing, and scholarship forms are
owned by SJBEF accounts rather than any volunteer's personal account. The move
off Andrew's personal GitHub/Netlify accounts was completed 2026-09-28/29; this
file records how things are set up now and what's left.

Never commit passwords, 2FA recovery codes, or API tokens. Store them wherever
SJBEF keeps credentials (e.g. a shared Bitwarden/1Password vault owned by the
foundation).

## Current setup

| Piece | Where | Owner / access |
|---|---|---|
| Source code | <https://github.com/sjbef/sjbef> (public), branch `main` | GitHub org `sjbef`, owned by the business "St. John the Baptist Educational Foundation"; org owners: `sjbefadmin` (`sjbefadmin@gmail.com`) and `acferen` |
| Hosting | Netlify project `sjbef` → <https://sjbef.netlify.app> (project ID `535e7202-…`) | Netlify account `sjbefadmin@gmail.com` (email login, not GitHub login) |
| Build | `netlify.toml`: `npm run build` → `dist/`, Node 22; no env vars | Deploys automatically on every push to `main` |
| Domain | `sjbef.org` (primary), `www.sjbef.org` 301 → apex | HTTPS: Let's Encrypt via Netlify, auto-renewing |
| DNS | Cloudflare zone `sjbef.org` (`grant`/`mia.ns.cloudflare.com`) | Cloudflare account `sjbefadmin@gmail.com` |
| Email | Cloudflare Email Routing (MX `route1-3.mx.cloudflare.net`, SPF, DKIM, DMARC) | Catch-all → `sjbefadmin@gmail.com`; `info@` has its own rule |
| Scholarship forms | Google Forms: Scholarship Application, Seminarian Scholarship Application, Summary of Volunteer Service (plus the Scholarship Application "(File responses)" upload folder) | Owned by `sjbefadmin@gmail.com` |

### DNS records for the website

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `@` | `sjbef.netlify.app` | DNS only (grey) |
| CNAME | `www` | `sjbef.netlify.app` | DNS only (grey) |

Keep these **DNS only**. Cloudflare's "proxying is required for most security
and performance features" banner can be ignored: Netlify provides the CDN,
DDoS protection, and certificates, and proxying in front of Netlify breaks
certificate renewal. Don't touch the MX/TXT records; they carry email.

The pre-migration zone export (old cPanel host `70.38.95.141`) is kept outside
this repository.

## Everyday operations

- **Publish a change:** push to `main`. Netlify builds and deploys in about a
  minute. Watch it under the Netlify project's **Deploys** tab.
- **Check the live site:**

  ```sh
  curl -sIL https://sjbef.org     | grep -iE '^(HTTP|location|server)'
  curl -sIL https://www.sjbef.org | grep -iE '^(HTTP|location|server)'
  ```

  Expect `HTTP/2 200` from `server: Netlify`; `www` gives one 301 to
  `https://sjbef.org/` first.
- **Check email:** Cloudflare → **Email → Email Routing → Activity log** shows
  every message and whether it was *Forwarded*. Gmail hides a message sent to a
  forward of your own address, so test from a different account.
- **Give a new volunteer access:** invite their own GitHub user to the `sjbef`
  org; share forms from `sjbefadmin`'s Google Drive. Don't hand out the
  `sjbefadmin` password as a substitute for individual access.

## Things we learned the hard way

- **Netlify's free plan won't build private repos owned by an organization.**
  That's why the repo is public. It contains nothing secret; the site's content
  is already public. Keeping it private would need Netlify Pro or a GitHub
  Actions deploy using a Netlify token.
- **Netlify uses whichever GitHub account the browser is signed into** when it
  connects to GitHub. Do Netlify ↔ GitHub setup in a browser where only
  `sjbefadmin` is signed in, or the foundation's Netlify ends up linked to a
  personal GitHub account.
- **New Netlify projects default to private** (visitors get a Netlify login
  page, HTTP 401). Production visibility is set under **Project configuration →
  Visitor access**: Private, applies to *Previews only*.
- **The Scholarship Application requires applicants to sign in to Google**
  because it has a file-upload question. An anonymous visitor gets a Google
  sign-in page; that's expected.
- **The old redirect loop** (`sjbef.org` ↔ `www`) came from the proxied records
  pointing at the dead cPanel/WordPress host after the domain transfer. The
  old cPanel records (`cpanel`, `cp`, `whm`, `webmail`, `webdisk`, `pop`,
  `smtp`, `ftp`, `mail`, `cpcalendars`, `cpcontacts`,
  `_cpanel-dcv-test-record`) were deleted.

## Done

- [x] GitHub user `sjbefadmin` created; org `sjbef` created, business-owned.
- [x] `acferen` added as a second org owner.
- [x] Repo transferred `acferen/sjbef` → `sjbef/sjbef` (`scripts/transfer-repo-to-org.sh`) and made public.
- [x] Netlify account `sjbefadmin@gmail.com`; project `sjbef` deploying from `sjbef/sjbef` `main`.
- [x] `sjbef.org` + `www` pointed at Netlify, HTTPS issued, redirect loop gone.
- [x] Old cPanel DNS records removed; email records untouched and forwarding tested.
- [x] Old personal Netlify project (`lively-kelpie-49d487`, team `sjbef-poc`) deleted.
- [x] Scholarship, Seminarian, and Volunteer Service forms and the file-upload folder transferred to `sjbefadmin@gmail.com`; `acferen` removed from them.
- [x] Public "Edit Form" buttons removed from the site.

## Still to do

- [ ] Save `sjbefadmin`'s GitHub 2FA recovery codes (and Netlify/Cloudflare 2FA, if enabled) in the SJBEF vault.
- [ ] As `sjbefadmin`, on each form: **Responses → ⋮ → Get email notifications for new responses**; optionally **Link to Sheets → Create a new spreadsheet**.
- [ ] Open the Scholarship Application signed in as an unrelated Google account to confirm it loads.
- [ ] Delete the unused duplicate "Seminarian Scholarship Application" form and, optionally, the Apps Script projects that generated the forms.
- [ ] Delete the empty `sjbef-poc` Netlify team.
- [ ] Optional: in GitHub as `acferen` → **Settings → Applications → Authorized OAuth Apps**, revoke Netlify if the personal Netlify account is no longer used.
- [ ] Optional: apply for GitHub for Nonprofits (free Team plan) using the Google nonprofit verification.
- [ ] Record the org name, Netlify project, owners, and recovery process in SJBEF's records.
- [ ] The site's own contact, donation, volunteer, and gallery forms are still client-side simulations: they show a success message but deliver nothing. Connect each to a real service (monitored inbox, the foundation's payment account) before announcing them as working.
