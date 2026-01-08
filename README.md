# Invest Collective - Trading Group Website

Next.js application for The Invest Collective trading group, deployed on Cloudflare Workers with admin dashboard, member management, and research article system.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Deployment:** Cloudflare Workers (via @opennextjs/cloudflare)
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2 (for PDF uploads)
- **Authentication:** Cloudflare Access (Zero Trust)
- **Analytics:** Cloudflare Web Analytics + Custom Analytics Dashboard
- **UI Components:** shadcn/ui with Radix UI primitives
- **Icons:** Lucide React
- **Language:** TypeScript

## Features

### Public Site
- ✅ Responsive landing page with smooth anchor navigation
- ✅ Member signup form with Web3Forms email notifications
- ✅ Research articles with topic filtering
- ✅ PDF downloads with analytics tracking
- ✅ Page view tracking with enhanced geographic & device analytics
- ✅ Custom theme with light/dark support

### Admin Dashboard (`/admin`)
- ✅ **Protected by Cloudflare Access** - Zero Trust authentication
- ✅ Member management (view, approve, status updates)
- ✅ Research article uploads (PDF + metadata)
- ✅ Analytics dashboard with:
  - Article views and PDF downloads
  - Geographic distribution (country, region, city)
  - Device types and traffic sources
  - Topic popularity and time-based trends
  - Most popular articles

### Authentication
- ✅ Cloudflare Access integration for `/admin` routes
- ✅ Site-wide auth status display (cookie-based persistence)
- ✅ Automatic auth badge in navigation when authenticated
- ✅ Dev mode support for local development

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Cloudflare account (for deployment)

### Installation

```bash
npm install
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note:** In development mode:
- Cloudflare Access is disabled (no authentication required)
- You can access `/admin` routes directly
- Auth status shows "dev@localhost" by default

### Environment Variables

Create a `.env.local` file for local development:

```env
# Web3Forms (for signup email notifications)
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key

# Cloudflare Web Analytics (optional)
NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_analytics_token
```

### Build

```bash
npm run build
```

### Preview Cloudflare Build Locally

```bash
npm run preview
```

## Deployment

### Option 1: CI/CD with GitHub (Recommended)

1. **Connect Repository to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Workers & Pages** > **Create Application** > **Pages**
   - Click **Connect to Git** and select your GitHub repository
   - Repository: `fstab50/invest-collective-site`

2. **Configure Build Settings:**
   ```
   Production branch:       develop
   Build command:           npx @cloudflare/next-on-pages@1
   Build output directory:  .vercel/output/static
   Framework preset:        Next.js
   ```

3. **Set Environment Variables:**
   Add in Cloudflare Pages settings:
   ```
   NODE_VERSION=20
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
   NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_token
   ```

4. **Deploy:**
   - Cloudflare automatically builds and deploys on every push to `develop` branch
   - Your site will be available at `*.pages.dev`

### Option 2: Manual Deployment with Wrangler

```bash
# Login to Cloudflare
npx wrangler login

# Deploy
npm run deploy
```

## Project Structure

```
invest-collective-site/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/          # Navigation, Footer
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── admin/               # Admin dashboard pages
│   │   │   ├── members/         # Member management
│   │   │   ├── research/        # Article upload
│   │   │   └── analytics/       # Analytics dashboard
│   │   ├── signup/              # Public signup form
│   │   ├── research/            # Public research articles
│   │   ├── actions/             # Server actions (DB operations)
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── lib/
│   │   ├── auth.ts              # Cloudflare Access integration
│   │   ├── analytics.ts         # Analytics utilities
│   │   ├── email.ts             # Web3Forms integration
│   │   └── userAgentParser.ts   # Device/browser detection
│   └── components/
│       ├── NavigationWrapper.tsx # Server component for auth
│       ├── PageViewTracker.tsx   # Client-side page tracking
│       └── PDFDownloadButton.tsx # PDF download with tracking
├── public/
│   └── _headers                  # Cloudflare cache headers
├── wrangler.jsonc                # Cloudflare Workers config
├── schema.sql                    # Database schema
└── package.json
```

## Database Setup

The app uses Cloudflare D1 (SQLite) for data storage.

### Create Database

```bash
npx wrangler d1 create invest-collective-db
```

### Initialize Schema

```bash
npx wrangler d1 execute invest-collective-db --file=./schema.sql --local
npx wrangler d1 execute invest-collective-db --file=./schema.sql --remote
```

### Query Database

```bash
# Local development
npx wrangler d1 execute invest-collective-db --command="SELECT * FROM members" --local

# Production
npx wrangler d1 execute invest-collective-db --command="SELECT * FROM members" --remote
```

## Cloudflare Access Setup

Protect the `/admin` routes with Cloudflare Access (Zero Trust authentication).

### 1. Enable Cloudflare Access

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Zero Trust** > **Access** > **Applications**
3. Click **Add an application** > **Self-hosted**

### 2. Configure Application

- **Application name**: `Invest Collective Admin`
- **Session Duration**: `24 hours`
- **Application domain**:
  - Subdomain: Your domain (e.g., `staging.theinvestcollective.com`)
  - Path: `/admin*` (without trailing slash)

### 3. Choose Identity Provider

#### Option A: Google OAuth (Recommended)
- Add Google as identity provider
- Specify allowed email addresses or domains

#### Option B: GitHub OAuth
- Connect GitHub account
- Specify allowed organizations or users

#### Option C: One-Time PIN (Email-based)
- Users receive a code via email
- Specify allowed email addresses

### 4. Create Access Policy

- **Policy name**: `Admin Users Only`
- **Action**: `Allow`
- **Include**: Add specific email addresses (e.g., `admin@example.com`)

### 5. Test Authentication

1. Open incognito browser
2. Navigate to `https://your-domain.com/admin`
3. You should be redirected to Cloudflare Access login
4. After authentication, you'll access the admin dashboard

**Important:** The path rule must be `/admin*` (not `/admin/*`) to protect both `/admin` and all subpaths.

## Cloudflare Web Analytics

### Setup

1. Go to Cloudflare Dashboard > **Analytics & Logs** > **Web Analytics**
2. Click **Add a site** and enter your site name
3. Copy the analytics token
4. Add to environment variables:
   ```env
   NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_token_here
   ```

The analytics script is automatically loaded in `src/app/layout.tsx`.

### Features

- Page views and unique visitors
- Geographic distribution
- Device and browser statistics
- Privacy-friendly (no cookies, GDPR compliant)
- No impact on page load times

## Development Workflow

### Issue-Driven Development

All features, enhancements, and bug fixes should follow this workflow:

### 1. Create GitHub Issue First

```bash
gh issue create --repo fstab50/invest-collective-site \
  --title "Feature: Add dark mode support" \
  --body "Description of feature and implementation plan"
```

**Issue should include:**
- Clear title (prefix with `Feature:`, `Bug:`, or `Enhancement:`)
- Description of the problem or feature
- Task checklist if multi-step
- Priority level (Low/Medium/High)

### 2. Implement the Solution

```bash
# Ensure you're on the develop branch
git checkout develop
git pull origin develop

# Make your changes
# ... edit files ...

# Test locally
npm run dev
```

### 3. Commit with Issue Reference

```bash
git add .
git commit -m "Add dark mode support

- Implemented theme provider
- Created ThemeToggle component
- Updated all pages to support dark mode

Fixes #6"
```

**Commit format:**
- First line: Brief description (50 chars or less)
- Blank line
- Bullet points of changes
- Blank line
- `Fixes #N` to auto-close the issue

### 4. Push and Deploy

```bash
git push origin develop
```

Cloudflare automatically builds and deploys from the `develop` branch.

## Custom Domain

To use a custom domain:

1. Go to Cloudflare Dashboard > Workers & Pages
2. Select your worker
3. Navigate to Settings > Domains & Routes
4. Add your custom domain

DNS will be configured automatically.

## Monitoring & Logs

- **Logs:** `npx wrangler tail` or Cloudflare Dashboard > Workers & Pages > Logs
- **Analytics:** Cloudflare Dashboard > Workers & Pages > Analytics
- **Custom Analytics:** `/admin/analytics` (authenticated)
- **Errors:** Cloudflare Dashboard > Workers & Pages > Logs

## GitHub CLI Workflows

### Create Issue
```bash
gh issue create --repo fstab50/invest-collective-site \
  --title "Bug: Mobile menu not closing" \
  --body "Description..."
```

### List Issues
```bash
gh issue list --repo fstab50/invest-collective-site
```

### View Issue
```bash
gh issue view 6 --repo fstab50/invest-collective-site
```

### Close Issue
```bash
gh issue close 6 --repo fstab50/invest-collective-site \
  --comment "Fixed in commit abc123"
```

## Best Practices

### Code Quality
- Use TypeScript for type safety
- Follow existing code patterns
- Use shadcn/ui components when available
- Keep components small and focused
- Test on both desktop and mobile

### Git Workflow
- Always work on `develop` branch
- Write clear, descriptive commit messages
- Reference issue numbers in commits
- Keep commits focused (one logical change per commit)

### Performance
- Optimize images before adding to `public/`
- Use Next.js Image component for images
- Minimize client-side JavaScript
- Test Lighthouse scores regularly

### Security
- Use Cloudflare Access for authentication (not custom auth)
- Validate all user input in server actions
- Use prepared statements for database queries
- Keep dependencies updated
- Review Cloudflare Access logs regularly

## Troubleshooting

### Build Failures

**Issue:** Cloudflare build fails
```bash
# Check local build first
npm run build

# Preview Cloudflare build locally
npm run preview
```

**Issue:** wrangler.jsonc not found
- Ensure `wrangler.jsonc.template` exists
- Check that `predeploy` script runs: `cp wrangler.jsonc.template wrangler.jsonc`

### Type Errors

```bash
# Regenerate Cloudflare types
npm run cf-typegen

# Check TypeScript errors
npx tsc --noEmit
```

### Authentication Issues

**"Access Denied" after authentication:**
- Check that your email is in the Cloudflare Access allowed list
- Verify the policy includes your identity provider
- Check Cloudflare Access logs for details

**Infinite redirect loop:**
- Clear cookies for your domain
- Check that the application path is `/admin*` (not `/admin/*`)

**Can't access admin in development:**
- Ensure `NODE_ENV=development`
- Auth is automatically disabled in dev mode

### Database Issues

**Connection errors:**
```bash
# Check D1 binding in wrangler.jsonc
# Verify database_id is correct
npx wrangler d1 list
```

**Schema changes:**
```bash
# Apply schema changes
npx wrangler d1 execute invest-collective-db --file=./schema.sql --local
npx wrangler d1 execute invest-collective-db --file=./schema.sql --remote
```

## License

See [LICENSE](./LICENSE) file.

## Authors

- Blake Huber
- Russell Moore

---

**Last Updated:** January 2026
