# PROJECT_STATUS

## Project
- Name: mvp-template
- Template Type: Static website baseline
- Current Branch: main
- Last Updated: 2026-04-14

## Current Phase
- Public marketing site with Turnstile-protected Postmark contact workflow verified in Docker

## Completed
- Reviewed repository guidance, architecture notes, and current code structure.
- Confirmed the copied template still includes Prisma, PostgreSQL, Auth.js, protected routes, server-side repository and service examples, and database-oriented onboarding docs.
- Identified the static-site conversion scope across app routes, auth files, Prisma files, Docker and environment setup, CI, tests, and repository guidance.
- Reframed the next implementation milestone around removing auth and database concerns rather than extending the MVP starter.
- Removed protected routes, auth handlers, Prisma files, server-side starter domain code, and tracked generated build metadata from the repo.
- Rewrote the homepage and about page for a public-only static website baseline and moved shared copy into `src/features/site/siteContent.ts`.
- Simplified package scripts, Next.js config, Docker setup, environment templates, setup scripts, CI, and repo docs around static export and app-only local development.
- Replaced the old auth and database test coverage with a lightweight static-site regression test for shared public content.
- Verified the repo in an isolated Docker Compose project using `-p mvp-static-site` so its image, container, network, and volumes do not interfere with the copied template's Docker assets.
- Ran `pnpm check` successfully in Docker and confirmed `pnpm build` generates static output for `/` and `/about`.
- Fixed the `pnpm` ignored build-script warning by allowing `sharp` and `unrs-resolver` via `pnpm.onlyBuiltDependencies`.
- Updated the Docker image to preactivate `pnpm@10.33.0`, removing the repeated Corepack download and update-notice startup noise.
- Aligned Docker Compose so `APP_PORT` now controls both the published host port and the internal Next.js dev server port, keeping local browser URLs and container logs consistent.
- Ported the DevilDog homepage look from the Blazor app into Tailwind-native React components, copied the required static assets into this repo, updated site metadata and the About page, and enabled unoptimized local images for static export.
- Ported the remaining DevilDog service, compliance, story, and team pages into a reusable catch-all static route system, rewired the site navigation and homepage cards to those new routes, expanded the local asset set, and tightened light/dark contrast handling so text stays readable against non-white surfaces.
- Added a step-by-step GitHub hardening guide in `docs/github-hardening-checklist.md`, organized with free protections first and paid private-repo options clearly separated.
- Repaired the GitHub Actions CI workflow by removing the hard-coded pnpm action version so the workflow now follows the repo's `packageManager` version.
- Polished the shared DevilDog UI so dark surfaces use light text, light surfaces use dark text, menu disclosure controls no longer fall back to native dark markers, and the home/about side-by-side panels sit with better centered spacing.
- Re-ran `pnpm check` and `pnpm build` in Docker after the polish pass and confirmed the static export still succeeds for 29 pages.
- Fixed the remaining unreadable Contact DevilDog CTA treatment, rewired sitewide contact links to a dedicated `/contact` page, and added a styled Tailwind contact form with client-side validation for name, email, company name, and message.
- Added a server-side `/api/contact` route that validates submissions and sends email through a server-only transactional email provider, plus new tests for the shared contact validation logic.
- Updated `.env.example`, Docker Compose, and the Next.js build configuration so the app can accept secure contact-email settings in development and production and compile a secure contact endpoint.
- Re-ran `pnpm check` and `pnpm build` in Docker after the contact workflow milestone and confirmed the build now includes `/contact` plus a dynamic `/api/contact` route.
- Added Cloudflare Turnstile protection to the contact form with a client-rendered verification widget, token-aware validation, and server-side Turnstile `siteverify` checks that must pass before outbound contact email is sent.
- Expanded the contact validation tests for Turnstile token requirements and updated `.env.example` plus Docker Compose with safe Turnstile placeholders instead of tracked secrets.
- Re-ran `pnpm check` and `pnpm build` in Docker after the Turnstile milestone and confirmed the contact page still builds cleanly with the protected `/api/contact` route.
- Removed the extra "What Happens Next" panel from the contact page, simplified the top navigation by dropping the duplicate Home link, and fixed the shared Contact DevilDog CTA styling so button text stays readable on the footer and page-level Next Step panels.
- Re-ran `pnpm check` and `pnpm build` in Docker after the contact-page and CTA cleanup and confirmed the site still builds cleanly with the protected `/api/contact` route.
- Removed the "Send a Message" button from the footer to reduce redundant CTAs.
- Restyled "Contact DevilDog" buttons site-wide from solid white background to outlined ghost style (transparent background, white border, white text) for better visual consistency on dark surfaces.
- Converted navbar dropdown menus from CSS hover-only to React state-based control so they now open on hover/click, close when a link is clicked, and close when the mouse leaves.
- Changed dropdown background from cream to match navbar styling (dark red with white text) and added a frosted glass blur effect with reduced opacity for a lighter feel.
- Enabled Next.js standalone build output in `next.config.ts` so deploy artifacts are lightweight and App Service-friendly.
- Added GitHub Actions CD workflow in `.github/workflows/deploy-azure-gov.yml` that builds, tests, packages standalone output, signs in with OIDC to Azure Government (`AzureUSGovernment`), configures startup command, and deploys to Azure App Service.
- Diagnosed the Azure App Service startup failure as a standalone packaging problem, confirmed in Azure logs that the Oryx-extracted runtime still could not resolve `@swc/helpers` from the standalone pnpm symlink tree.
- Added `@swc/helpers` as an explicit production dependency, refreshed `pnpm-lock.yaml`.
- Fixed Dockerfile from development shell to proper multi-stage production build (deps → builder → runner) for local Docker use.
- Fixed `.dockerignore` to include `pnpm-lock.yaml` which is required for `pnpm install --frozen-lockfile`.
- Fixed Azure deployment workflow: simplified startup.sh to just run `node server.js`, disabled Oryx build with `SCM_DO_BUILD_DURING_DEPLOYMENT=false`, and set `HOSTNAME=0.0.0.0` and `PORT=8080` environment variables for Next.js server.
- Fixed the Turnstile production configuration path by moving the public site key lookup off the client build-time bundle and onto a runtime `/api/turnstile/config` endpoint that reads App Service environment settings on demand.
- Added focused Turnstile configuration tests and re-ran `pnpm check` plus `pnpm build` in Docker, confirming the app now builds with dynamic `/api/contact` and `/api/turnstile/config` routes.
- Replaced SendGrid contact delivery with Postmark, renamed the secure email settings to `POSTMARK_SERVER_TOKEN` and `POSTMARK_FROM_EMAIL`, updated the local env template plus Docker Compose wiring, added focused Postmark config tests, and re-ran `pnpm check` plus `pnpm build` successfully in Docker.
- Standardized contact-form delivery failure messaging so Postmark configuration or send errors now show a neutral business-safe message in the UI while detailed error information remains server-side in logs.
- Removed visitor-facing references to the old Blazor site and other legacy-source wording from the About page and shared public-page content, then re-ran `pnpm check` plus `pnpm build` successfully in Docker.
- Added richer SEO foundations across the site with stronger metadata, canonical URLs, Open Graph and Twitter cards, organization and website structured data, plus generated `robots.txt` and `sitemap.xml`, then re-ran `pnpm check` plus `pnpm build` successfully in Docker.
- Added a Next.js proxy redirect so `www.devildogcyber.com` now permanently redirects to `devildogcyber.com`, keeping SEO signals concentrated on the canonical apex domain, then re-ran `pnpm check` plus `pnpm build` successfully in Docker.

## In Progress
- Azure production verification — confirm the Turnstile widget renders from App Service runtime settings and that Postmark delivers contact-form email after the next deploy.

## Next Up
- Configure Azure App Service settings for `POSTMARK_SERVER_TOKEN` and `POSTMARK_FROM_EMAIL`, and remove the old `SENDGRID_*` settings if they still exist.
- Verify deployment: confirm the Turnstile widget renders on Azure when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is present only in App Service settings.
- Test the contact form end-to-end in production (Turnstile + Postmark delivery).
- Remove any leftover SendGrid secrets from GitHub or Azure and rotate the retired SendGrid key if it was ever used outside local development.
- Add production environment approval gate in GitHub Actions for manual deployment control.

## TODO
- [ ] Add production-ready contact email failure alerting with a documented notification path.
- [ ] Configure the production webhook or Azure workflow that receives contact email failure alerts.
- [ ] Verify the alert path by forcing a safe non-production delivery failure and confirming the team receives the alert.
- [ ] Review contact-form production health after each deployment until the alerting path is stable.
- [ ] Revisit the TODO list during release prep and weekly production checks.

## Blockers
- None.

## Key Decisions
- Decision: Convert the repo to a true static export baseline instead of keeping a server-oriented starter.
  - Reason: The goal is a public-only static website with no database, auth, or protected runtime paths.
  - Date: 2026-04-11
- Decision: Keep Docker only for the web app development workflow.
  - Reason: Local container support is still useful, but PostgreSQL and auth-specific setup are unnecessary after the conversion.
  - Date: 2026-04-11
- Decision: Introduce a minimal server-side Next.js endpoint for the contact form instead of keeping strict static export.
  - Reason: The email provider credentials must stay on the server, so secure email delivery needs a server-capable runtime even though the rest of the site remains static-first.
  - Date: 2026-04-12
- Decision: Protect the contact form with Cloudflare Turnstile and verify tokens on the server before attempting email delivery.
  - Reason: Bot resistance needs to happen before the outbound email send step, and server-side verification prevents forged or replayed client submissions from bypassing the widget.
  - Date: 2026-04-12
- Decision: Replace SendGrid with Postmark for outbound contact email delivery.
  - Reason: Postmark is the chosen transactional email provider for the contact workflow and only requires a lightweight server-side API integration.
  - Date: 2026-04-14

## Commands
- Install: pnpm install
- Dev: pnpm dev
- Docker Dev: docker compose up --build
- Docker Stop: docker compose down
- Local Setup (Windows): pwsh -File ./scripts/setup-local.ps1
- Local Setup (macOS/Linux): bash ./scripts/setup-local.sh
- Test: pnpm test
- Check: pnpm check
- Lint: pnpm lint
- Typecheck: pnpm typecheck
- Build: pnpm build

## Notes for Next Session
- What was just finished: Added a Next.js proxy redirect so `www.devildogcyber.com` permanently redirects to the canonical apex domain, complementing the richer SEO metadata, structured data, `robots.txt`, and `sitemap.xml`, then verified `pnpm check` plus `pnpm build` in Docker.
- What should happen next: Confirm both custom domains in Azure point at the same app, make sure the `www` hostname is bound so the redirect can execute, continue reviewing public-page copy as the site evolves, add new TODO items to the running checklist in `PROJECT_STATUS.md` as needed, and proceed with the pending Azure production verification for Turnstile and Postmark.
- Risks / caution areas: Deployment pipeline runs on every push to main; once confirmed working, consider adding production environment approval gate. Production email will fail until the Postmark sender is verified and the App Service settings are updated. If the `www` hostname is not attached to the same app service, the in-app redirect cannot fire for that host. If legacy SendGrid credentials were used anywhere outside local development, remove and rotate them.
