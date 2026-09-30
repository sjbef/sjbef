# Testing a change before publishing

Every merge or push to `main` publishes to sjbef.org and costs 15 of the
Netlify Free plan's 300 monthly credits. If the credits run out, the site goes
offline until the next billing period. Deploy previews cost nothing, so test on
one first and publish once.

A deploy preview is a full copy of the site built from a pull request. Forms
work on previews: submissions are stored in Netlify and emailed just like real
ones.

## What you can't test locally

`npm run dev` shows the site but can't submit forms. Netlify only receives
submissions on a site it has built. Pressing Send locally shows the form's
error message. That's expected.

## Steps

### 1. Put the change on a branch

On the command line:

```sh
git switch -c my-change        # any name; not main
# edit, then:
npm run build                  # catches errors before Netlify does
git commit -am "Describe the change"
git push -u origin my-change
```

Or on github.com: open the file, click the pencil icon, edit, and choose
**Create a new branch for this commit and start a pull request**.

### 2. Open a pull request

On <https://github.com/sjbef/sjbef>, click **Compare & pull request** for your
branch, with the base set to `main`. Choose **Create draft pull request**: a
draft can't be merged by accident. (Command line:
`gh pr create --draft --base main`.)

### 3. Wait for the preview

After a minute or so, the pull request's checks show
**netlify/sjbef/deploy-preview — Deploy Preview ready!**, and Netlify comments
with the link:

`https://deploy-preview-<PR number>--sjbef.netlify.app`

Previews are private. Open the link in a browser signed in to Netlify as
`sjbefadmin`. Anyone else gets a Netlify login page.

### 4. Test

- Click through what you changed, in both English and French.
- **Forms:** submit a test message, then check:
  - Netlify → project **sjbef** → **Forms**: the submission is listed under
    the form's name (e.g. `contact`).
  - `sjbefadmin@gmail.com`: the notification email arrived with the form's tag
    in the subject (e.g. `[SJBEF Contact] …`), and **Reply** goes to the address
    you typed in the form.
- **Delete your test submissions** afterward: Forms → the form → the submission →
  **Delete**.

### 5. Fix and re-test

Push more commits to the same branch. The same preview link rebuilds each time,
for free.

Pushes that only change Markdown files, `docs/` or `scripts/` don't rebuild
(see `ignore` in `netlify.toml`). That's fine: they don't change the site, so
the preview is still current. If you need a rebuild without a site change
(for example, after turning form detection on), open the preview's deploy in
Netlify (the link in the pull request's checks) and click **Retry**. Netlify's
docs don't say whether the ignore rule also skips a retry. If Netlify cancels
it, commit a small change to a site file on the branch, such as a comment in
`index.html`.

Don't use **Deploys → Trigger deploy** for this. That rebuilds the live site
and costs 15 credits.

### 6. Publish

When the preview is right, click **Ready for review**, then **Merge pull
request**. That merge is the one 15-credit deploy. It's live on sjbef.org
about a minute later. Check it, then delete the branch (GitHub offers a button).

## Adding a new form

Netlify has to see a form in the built HTML to accept its submissions. The page
is rendered by React, so:

1. Give the React form `name="<form-name>"`, `data-netlify="true"`, a hidden
   `form-name` input, and fields with `name` attributes. The contact form in
   `src/App.tsx` is the model.
2. Add a hidden static copy with the same form name and field names to
   `index.html`.
3. Name the sender's address field `email` so **Reply** goes to them.
4. Add a hidden field named `subject` with a tag such as
   `[SJBEF Volunteer] …`. Netlify uses it as the email subject, and it overrides
   any subject set in the Netlify UI. Don't give a visible field the name
   `subject`.
5. Test on a preview as above. The new form appears under **Forms** once a
   preview containing it has built.

Form detection must be on (Netlify → **Forms**; it is). If it's ever turned
off and back on, it only finds forms in deploys built afterward, so rebuild the
preview (see step 5).
