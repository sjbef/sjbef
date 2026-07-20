SJBEF Website Deployment & Digital Infrastructure Plan

Phase 1: Establish Organizational Identity (The Foundation)
To prevent lock-in to any single person's personal accounts, we must establish a central "identity" for the foundation.

1. Register for Google for Nonprofits
This is the single most important step. It provides free, professional digital tools that would otherwise cost hundreds of dollars annually.

What it provides: Free custom Google Workspace emails (e.g., info@sjb-educationalfoundation.org), shared Google Drive storage for committee files, and a central secure home for your scholarship's Google Form submissions.

How to apply:

Visit Google for Nonprofits.

Sign in with a temporary generic Google account (or your personal one to start, as ownership can be transferred).

Verify your 501(c)(3) status through Google’s validation partner (Percent). You will need your tax ID (EIN) and organizational documentation.

Board Action Required: Provide the legal incorporation documents and EIN.

2. Domain Consolidation & DNS Preparation
You need to ensure the foundation officially owns and has access to its domain name (e.g., sjb-educationalfoundation.org or similar).

Action: Locate where the domain is currently registered (e.g., GoDaddy, Namecheap, Network Solutions).

Recommendation: If the current registrar is difficult to use, transfer it to a modern, low-cost registrar like Cloudflare or Namecheap.

DNS Strategy: We will keep the domain pointing to the existing site until the new site is completely ready. When ready, we will update the DNS records (specifically the A and CNAME records) to point to Netlify. This ensures zero downtime.

Phase 2: Create Independent Technical Accounts
Once Google Workspace is approved and you have an email like admin@sjb-educationalfoundation.org, we create the technical footprints.

3. Establish a Dedicated GitHub Organization
GitHub is where the website's code lives. We want to decouple this from your personal account.

Strategy: Create a free GitHub Organization (e.g., sjb-educational-foundation).

Why? You can invite other technical volunteers as members in the future. It acts as a shared repository space.

Volunteer Friction: Volunteers will never have to see or touch GitHub. It exists purely in the background. You can manage the code, and if you ever transition the role, you simply invite the new developer to the GitHub Organization and transfer administrative rights.

4. Create the Netlify Nonprofit Account
Netlify hosts the static frontend of the website.

Nonprofit Sponsorship: Netlify offers free or highly discounted "Pro" team plans for registered 501(c)(3) organizations. Once you have your nonprofit verification from Phase 1, you can apply for their Open Source / Nonprofit program.

Access Management (Crucial):

How to log in: Use "Log in with Email" using your new admin@sjb-educationalfoundation.org address rather than linking it directly to your personal GitHub or personal Google account.

Why? This allows you to share the login credentials securely in an organization password manager (like Bitwarden or 1Password) so the board always has access, regardless of who is active.

Phase 3: Deployment & Go-Live (Zero Downtime)
With the accounts established, we link the pieces together.

5. Link GitHub to Netlify
Log into the Netlify SJBEF account.

Select "Import an existing project" and connect it to the repository inside the SJBEF GitHub Organization.

Netlify will automatically build and publish the site. It will provide a temporary URL (e.g., sjb-foundation.netlify.app).

6. Connect Custom Domain & Enable SSL
Add your custom domain to Netlify's settings.

Netlify will provide the exact DNS configuration details (IP addresses/CNAME targets).

Log into your domain registrar and update the records.

Netlify will automatically provision a free, auto-renewing Let's Encrypt SSL certificate (ensuring the secure https:// padlock appears in browsers).

Phase 4: Volunteer-Friendly Updates & Maintenance
How do we ensure non-technical volunteers can make basic updates in the future?

7. Immediate Strategy (Developer-Led)
Initially, you will handle all updates. When a board member wants to change text, add a news update, or swap an image, they email you, and you push the change via Git. Because Netlify has Continuous Integration, the moment you edit a file in GitHub, the live website updates automatically in about 30 seconds.

8. Long-Term Strategy (No-Code Content Management)
If the volume of updates increases and other volunteers want to edit the site directly, we can layer on a Headless CMS (Content Management System) later without rebuilding the site:

Option A (Netlify CMS / Decap CMS): A free, open-source editor that integrates directly into the site. Volunteers log into a /admin panel on your website, write text in a simple Microsoft Word-style editor, click "Publish", and Netlify handles the code update in the background.

Option B (Google Sheets Data Source): We can configure the website to read certain announcements or tables directly from a Google Sheet stored on your new Google Drive. A volunteer simply edits a spreadsheet row, and the website updates.

Summary of Next Actions for the Board Presentation
To move this forward with the board, you can present this sequence as a clear, risk-free plan:

Authorize Google for Nonprofits Application: Needs EIN and legal docs. (Cost: $0)

Locate Domain Credentials: Find the current registrar login to prepare for the eventual pointer change. (Cost: Existing domain renewal fee)

Approve Infrastructure Setup: Allow you to configure the free GitHub, Netlify, and Google Forms integrations under the new organizational emails. (Cost: $0)

This setup ensures a professional, fast, and completely free web hosting pipeline that is owned 100% by the foundation and easily transferable to future volunteers.
lightbulb_tips
