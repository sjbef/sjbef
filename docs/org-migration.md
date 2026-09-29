# Moving SJBEF off personal GitHub/Netlify accounts

Goal: the repo lives in an SJBEF GitHub organization, the site is hosted by an
SJBEF Netlify team, and `sjbefadmin@gmail.com` (already the owner of Cloudflare
and the Google nonprofit account) can recover all of it without Andrew's
personal accounts.

Never commit passwords, 2FA recovery codes, or API tokens. Store them wherever
SJBEF keeps credentials (e.g. a shared Bitwarden/1Password vault owned by the
foundation).

## Fastest way back online (do this first, ~20 min)

The domain transferred on 2026-09-28 and the old WordPress host went with it,
so the site is down until Netlify serves it. Nothing below requires GitHub to
be set up first:

1. Build and zip the site: `npm run build && (cd dist && zip -qr ../sjbef-site.zip .)`
2. Sign up at Netlify as `sjbefadmin@gmail.com` (section 2, step 1).
3. **Add new project → Deploy manually** → drop `sjbef-site.zip`. Rename the
   project to `sjbef`.
4. Do section 3 (domain + Cloudflare). The site is back once HTTPS provisions.
5. Later, do section 1 (GitHub org + transfer), then in Netlify **Project
   configuration → Build & deploy → Link repository** → `sjbef/sjbef`. From then
   on, pushes to `main` deploy automatically.

## State as of 2026-09-28

| Item | Finding |
|---|---|
| Repo | `acferen/sjbef`, private, default branch `main` |
| Repo integrations | No webhooks, deploy keys, Actions secrets, or workflows — nothing breaks on transfer |
| Build | `npm run build` → `dist/`, no env vars needed (now pinned in `netlify.toml`) |
| DNS | Cloudflare is authoritative (`grant`/`mia.ns.cloudflare.com`); records are proxied (orange cloud) |
| Mail | MX → Cloudflare Email Routing (`route1-3.mx.cloudflare.net`) — do not touch |
| Domain | Transferred 2026-09-28; the old WordPress hosting did not come with it |
| Live site | **Down: redirect loop.** `sjbef.org` 301 → `www.sjbef.org` 301 → `sjbef.org` … Both hops are served by Cloudflare, not Netlify |
| Netlify | Netlify does not currently have `sjbef.org` attached to any site |

Because the domain isn't pointed at Netlify yet, there is no live deployment to
protect: recreating the Netlify site under the new team is simpler than
transferring the old one.

## 1. GitHub organization (~10 min)

GitHub organizations don't have their own login; they're owned by user
accounts. So `sjbefadmin@gmail.com` needs its own GitHub *user* to act as the
foundation's break-glass owner.

1. Sign out of GitHub (or use a private window). Create a GitHub user with
   `sjbefadmin@gmail.com` (e.g. username `sjbefadmin`). Turn on 2FA and save
   the recovery codes in the SJBEF vault.
2. As that user: **+ → New organization → Free**. Name: `sjbef` (available as
   of 2026-09-28). Contact email: `sjbefadmin@gmail.com`. "Belongs to: a
   business or institution" → St. John the Baptist Educational Foundation.
3. Org **People → Invite member** → `acferen` with role **Owner**. Accept the
   invite as `acferen`.
4. Optional: apply for GitHub for Nonprofits (free Team plan) at
   <https://github.com/solutions/industry/nonprofits> using the Google
   nonprofit verification.
5. Move the repo from this checkout (as `acferen`):

   ```sh
   gh auth refresh -s admin:org      # one-time, lets gh see org role
   scripts/transfer-repo-to-org.sh sjbef
   ```

   This calls GitHub's transfer API, waits for `sjbef/sjbef` to exist, and
   repoints `origin`. GitHub redirects the old `acferen/sjbef` URL. The repo
   stays private.

## 2. Netlify team (~15 min)

1. In a private window, sign up at <https://app.netlify.com/signup> **with
   email** using `sjbefadmin@gmail.com` (not "Sign up with GitHub" — that would
   tie the Netlify login to a GitHub account). Enable 2FA. Name the team
   `SJBEF`.
2. **Add new project → Import an existing project → GitHub.** When GitHub asks,
   sign in as the `sjbefadmin` GitHub user and install the Netlify app on the
   **`sjbef` organization**, limited to the `sjbef` repository.
3. Choose `sjbef/sjbef`, branch `main`. Build settings come from `netlify.toml`
   (`npm run build`, publish `dist`, Node 22). Deploy.
4. **Project configuration → Change project name** → `sjbef` so the URL is
   `https://sjbef.netlify.app`. Check that the site loads there.
5. Optional: ask Netlify about their nonprofit discount if you ever need a paid
   plan. The free plan is enough for this static site.

Andrew doesn't need to be a member of the Netlify team: pushing to `main` on
GitHub triggers deploys. If you want to see the dashboard too, invite
`acferen@gmail.com` under **Team → Members** (if the plan allows it).

## 3. Point sjbef.org at Netlify and fix the redirect loop (Cloudflare, ~15 min)

1. In Netlify: **Domain management → Add a domain** → `sjbef.org`. Accept
   adding `www.sjbef.org`. Choose the primary domain. These steps assume
   `sjbef.org` is primary and `www` redirects to it. Netlify then shows
   "Awaiting External DNS"; use the targets it shows. For a site named `sjbef`
   the target is `sjbef.netlify.app`.
2. In Cloudflare (`sjbefadmin@gmail.com`) → `sjbef.org` zone:
   - **Export the DNS records first** (DNS → Records → Export) and save the
     file.
   - **Rules → Redirect Rules** and **Rules → Page Rules**: delete or disable
     any rule that redirects between `sjbef.org` and `www.sjbef.org`. This is
     the loop. Let Netlify handle the apex/www redirect.
   - DNS: replace the existing apex and `www` A/AAAA/CNAME records with:

     | Type | Name | Target | Proxy |
     |---|---|---|---|
     | CNAME | `@` | `sjbef.netlify.app` | DNS only (grey) |
     | CNAME | `www` | `sjbef.netlify.app` | DNS only (grey) |

     Cloudflare flattens the apex CNAME automatically. Grey-cloud (DNS only)
     lets Netlify issue its HTTPS certificate and avoids double proxying.
   - Leave the MX, TXT (SPF/DKIM/DMARC/Google verification), and any other
     records alone.
3. Back in Netlify, wait for DNS verification. Under **HTTPS**, click
   **Verify DNS / Provision certificate** if it doesn't happen automatically.
4. Verify from a terminal:

   ```sh
   curl -sIL https://sjbef.org     | grep -iE '^(HTTP|location|x-nf-request-id)'
   curl -sIL https://www.sjbef.org | grep -iE '^(HTTP|location|x-nf-request-id)'
   ```

   Expect at most one 301 (`www` → apex), then `HTTP/2 200` with an
   `x-nf-request-id` header. Send a test email to `info@sjbef.org`.

## 4. Clean up personal accounts (after the site has run a week or so)

- Delete any old SJBEF site under Andrew's personal Netlify team.
- In GitHub → `acferen` → **Settings → Applications**, remove the Netlify
  installation's access to the transferred repo if it's still listed.
- Keep `acferen` as an org owner (or downgrade to member). The `sjbefadmin`
  user stays as the second owner, so either one can recover the other.
- Move ownership of the Google Forms (scholarship, seminarian, volunteer
  service) to `sjbefadmin@gmail.com` if a personal account still owns them.
- Record the org name, Netlify team, and who the owners are in SJBEF's records.
