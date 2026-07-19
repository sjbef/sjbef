# SJBEF Newsletter Archive Directory

This folder contains the official Saint-Jean-Baptiste Educational Foundation (SJBEF) newsletters and annual bulletins in PDF format.

## Current Newsletters

The website expects the following newsletters to be stored here:
1. **2023 SJBEF Newsletter**: `2023 SJBEF Newsletter.pdf` (linked to SJBEF Annual Bulletin - 2023)
2. **2024 SJBEF Newsletter**: `2024 SJBEF Newsletter.pdf` (linked to SJBEF Annual Bulletin - 2024)
3. **2025 SJBEF Newsletter**: `2025 SJBEF Newsletter.pdf` (linked to SJBEF Annual Bulletin - 2025)

## How to Upload & Update

1. **Upload**: Simply place your new PDF file in this directory.
2. **Naming Convention**: 
   - Keeping spaces is supported, e.g., `2026 SJBEF Newsletter.pdf`
   - For maximum web compatibility, we highly recommend using underscores or hyphens with lowercase letters: `2026_sjbef_newsletter.pdf`
3. **Referencing in Code**:
   - Files stored here are automatically served at the root of the website during build.
   - For example, `/public/newsletters/2025 SJBEF Newsletter.pdf` is accessible on the live site at `/newsletters/2025 SJBEF Newsletter.pdf` (or URL-encoded: `/newsletters/2025%20SJBEF%20Newsletter.pdf`).
4. **Publishing New Issues**:
   - You can add new newsletter issues dynamically using the **Admin Panel** on the website, or by editing the `defaultNewsletters` configuration inside the codebase.
