<p align="left">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset=".github/assets/readme-banner_dark.jpg"
    />
    <img
      src=".github/assets/readme-banner_light.jpg"
      alt="Metrics repository banner"
    />
  </picture>
</p>

<p align="right">Metrics a project by REVREBEL</p>

# METRICS

<div align="left">
  <a href="https://github.com/REVREBEL/Metrics/issues">
    <img src="https://img.shields.io/github/issues/REVREBEL/Metrics?color=163666&style=for-the-badge&logo=github" alt="Issues"/>
  </a>
  <a href="https://github.com/REVREBEL/Metrics/pulls">
    <img src="https://img.shields.io/github/issues-pr/REVREBEL/Metrics?color=71c9c5&style=for-the-badge&logo=github" alt="PRs"/>
  </a>
</div>

<br>
<br>

## **THE PROJECT**

* <!-- ... [WHY DID YOU CREATE THIS PROJECT?, MOTIVATION, PURPOSE, DESCRIPTION, OBJECTIVES, etc] -->

<br>
<br>

## **INSTALLATION**

This is a Next.js project bootstrapped with create-next-app.

Getting Started
First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.



## **USAGE**

* <!-- ... [SHOW HOW YOUR PROJECT IS USED] -->

<br>
<br>

## **PROJECT TREE**

<!-- ... [SHOW YOUR PROJECT TREE HERE IF USEFUL] -->

<br>
<br>

## **NOTES**

* <!-- ... [ADD ADDITIONAL NOTES] -->

<br>
<br>

## **SCREENSHOTS**

<!-- ... [SOME DESCRIPTIVE IMAGES] -->



<br>
<br>

<table>
  <tbody>
    <tr>
      <td valign="middle" width="1200" height="200" >
          <div>
            <img src="https://raw.githubusercontent.com/REVREBEL/.github/main/assets/get-in-touch_dark.png" alt="Get in Touch" width="150" valign="top" />
            &emsp;
            <a href="https://github.com/REVREBEL" target="_blank"><img src="https://raw.githubusercontent.com/REVREBEL/.github/main/assets/icons/github-outline_dark.png" alt="GitHub" width="36" /></a>
            <a href="mailto:hello@revrebel.io" target="_blank" target="_blank"><img src="https://raw.githubusercontent.com/REVREBEL/.github/main/assets/icons/email-outline_dark.png" alt="Email" width="36" /></a>
            <a href="https://www.linkedin.com/company/revrebel/" target="_blank"><img src="https://raw.githubusercontent.com/REVREBEL/.github/main/assets/icons/linkedin-outline.png" alt="LinkedIn" width="36" /></a>
            <a href="https://www.revrebel.io/blog" target="_blank"><img src="https://raw.githubusercontent.com/REVREBEL/.github/main/assets/icons/blog-outline.png" alt="Blog" width="36" /></a>
            <a href="https://revrebel.io" target="_blank" style="display: inline-block;"><img src="https://img.shields.io/badge/website-163666?style=for-the-badge" alt="Website" height="40" align="right" /></a>
          </div>
      </td>
    </tr>
  </tbody>
</table>

## **POSTGRES APP-STATE FOUNDATION**

Metrics includes a Postgres app-state layer backed by Drizzle ORM. The first-pass scope is backend-only: no UI screens, BigQuery writeback, DuckDB serving marts, or production deployment configuration live in this layer yet.

### Ownership boundary

- BigQuery/Dataform remains the source of truth for analytical `metrics_core` lookup, mapping, dimension, fact, and reporting tables.
- Postgres stores app-owned workflow state: users/roles/access metadata, hotel profile extensions, contacts, systems, preferences, notes, events, tasks, campaigns, strategy workflow, Data Library UI metadata, draft edits, approvals, and audit history.
- DuckDB remains reserved for later fast app-serving analytical outputs and local parquet-backed dashboard performance work.

### Tooling choice

REV-15 uses Postgres + Drizzle ORM because the repo did not have an existing Postgres ORM/migration convention, and Drizzle keeps the schema typed, lightweight, and close to the TypeScript app code.
Metrics now includes a Postgres app-state layer backed by Drizzle ORM.

### Ownership boundary

- BigQuery/Dataform remains the source of truth for analytical `metrics_core` tables.
- Postgres stores app-owned workflow state (profiles, notes, events, tasks, campaigns, strategy, draft edits, approvals, audit).

### Environment variables

```bash
DATABASE_URL=postgres://user:password@localhost:5432/metrics
POSTGRES_POOL_MAX=10
```

### Database commands

```bash
pnpm db:generate   # generate SQL migrations from src/db/schema
pnpm db:migrate    # apply migrations with drizzle-kit
pnpm db:studio     # open Drizzle Studio
pnpm db:seed       # seed baseline demo records/statuses
```

The server-only client entrypoint is `src/db/index.ts`, typed schema lives in `src/db/schema/index.ts`, and migrations live in `src/db/migrations`.
pnpm db:generate   # generate SQL migrations from schema
pnpm db:migrate    # apply migrations
pnpm db:studio     # open Drizzle Studio
pnpm db:seed       # seed baseline demo records
```

Schema files live under `src/db/schema`, client entrypoint is `src/db/index.ts`, and migrations are emitted to `src/db/migrations`.
