# The Invest Collective

A comprehensive Next.js web application for a trading group collective, featuring member management, research article system, market tracking tools, and admin dashboard with advanced analytics.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Deployment:** Cloudflare Workers (via @opennextjs/cloudflare)
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2 (for PDF research uploads)
- **Authentication:** Cloudflare Access (Zero Trust)
- **Analytics:** Custom analytics system + Cloudflare Web Analytics
- **UI Components:** shadcn/ui (68 components) with Radix UI primitives
- **Icons:** Lucide React
- **Language:** TypeScript
- **Email:** Web3Forms integration for signup notifications

## Features

### Public Website

#### Homepage
- Hero section with group introduction
- About section with mission statement
- Featured tools showcase (Thesis Tracker, Cycle Navigator, Regime Tracker)
- Research library preview
- Member testimonials
- Contact section

#### Research Library (`/research`)
- Browse curated market research articles
- Topic-based filtering (Market Analysis, Technical Analysis, Macro Economics, etc.)
- PDF downloads with analytics tracking
- Article metadata (author, date, topics)
- Read time estimates

#### Market Tracking Tools
- **Thesis Tracker** (`/thesis-tracker`) - Track investment theses
- **Cycle Navigator** (`/cycle-navigator`) - Navigate market cycles
- **Regime Tracker** (`/regime-tracker`) - Monitor market regimes

#### Member Signup (`/signup`)
- Comprehensive application form
- Web3Forms email notifications to admins
- Auto-scroll to success/error messages
- Form validation
- Disabled state after successful submission

#### Contact Page (`/contact`)
- Contact information and meeting details

### Admin Dashboard (`/admin`)

**Protected by Cloudflare Access** - Zero Trust authentication required

#### Dashboard Overview (`/admin`)
- Quick stats (total members, pending applications, articles, views)
- Recent signups list
- Quick action links
- Member status breakdown visualization

#### Member Management (`/admin/settings/members`)
- View all members with status (Pending, Approved, Declined, Inactive)
- Search and filter capabilities
- Individual member detail pages (`/admin/settings/members/[id]`)
- Approve/decline applications
- Update member status
- Edit member information
- Export members to CSV (`/api/members/export`)
- Member API endpoints (`/api/members/[id]`)

#### Research Management
- **Upload Articles** (`/admin/research/upload`)
  - PDF upload to Cloudflare R2
  - Rich metadata (title, author, date, description, topics)
  - Topic multi-select (Market Analysis, Technical Analysis, Fundamental Analysis, Macro Economics, Trading Psychology, Risk Management, Portfolio Management, Emerging Markets)
  - URL slug auto-generation
  - File validation

- **Manage Articles** (`/admin/research/manage`)
  - List all published articles
  - Edit article metadata (`/admin/research/edit/[slug]`)
  - Delete articles
  - Publish/unpublish toggle
  - View counts

- **Article APIs**
  - Get article data: `/api/research/article/[slug]`
  - Serve PDFs: `/api/research/pdf/[filename]`

#### Market Tracking Tool Management
- **Thesis Management** (`/admin/thesis`) - Create and manage investment theses
- **Cycle Management** (`/admin/cycle`) - Update market cycle data
- **Regime Management** (`/admin/regime`) - Track market regime changes

#### Advanced Analytics Dashboard (`/admin/analytics`)
- **Overview Metrics**
  - Total page views
  - Total PDF downloads
  - Unique articles viewed
  - Average views per article

- **Geographic Analytics**
  - Views by country (with flags)
  - Regional distribution (state/province)
  - City-level breakdown
  - Interactive geographic tables

- **Traffic Analytics**
  - Traffic sources (direct, referral, search, social)
  - Top referrers with URLs
  - Device type breakdown (desktop, mobile, tablet)
  - Browser statistics
  - Operating system distribution

- **Content Analytics**
  - Most popular articles
  - Most popular topics
  - Article view trends
  - Topic engagement metrics
  - Views over time charts

- **Time-Based Analytics**
  - Views by day of week
  - Views by hour of day
  - Trend visualizations
  - Activity patterns

#### Settings (`/admin/settings`)
- System configuration
- Member management access
- Admin preferences

### Authentication & Authorization

- **Cloudflare Access Integration** - Zero Trust authentication for `/admin*` routes
- **Cookie-based Persistence** - Auth status persists across all pages (24-hour expiration)
- **Navigation Badge** - Displays user email when authenticated
- **Dev Mode Support** - Authentication disabled in local development
- **Secure Headers** - HTTP-only, secure, SameSite cookies

### Analytics System

- **Client-Side Tracking** (`PageViewTracker.tsx`)
  - Automatic page view tracking
  - Enhanced geographic data (country, region, city, timezone)
  - Device detection (type, browser, OS)
  - Traffic source attribution
  - Referrer tracking
  - Custom user agent parsing

- **PDF Download Tracking** (`PDFDownloadButton.tsx`)
  - Track each PDF download with full context
  - Associate downloads with articles
  - Same geographic and device data as page views

- **Analytics API** (`/api/analytics/track`)
  - Server-side event recording
  - D1 database storage
  - Supports both page views and downloads

- **Cloudflare Web Analytics**
  - Privacy-friendly analytics (no cookies, GDPR compliant)
  - Page views and unique visitors
  - No impact on performance

## Project Structure

```
invest-collective-site/
├── src/
│   ├── app/
│   │   ├── admin/                        # Admin dashboard (protected)
│   │   │   ├── analytics/                # Analytics dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── cycle/                    # Cycle management
│   │   │   │   └── page.tsx
│   │   │   ├── regime/                   # Regime management
│   │   │   │   └── page.tsx
│   │   │   ├── research/                 # Research article management
│   │   │   │   ├── upload/               # Upload new articles
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── actions.ts
│   │   │   │   ├── manage/               # Manage existing articles
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── edit/[slug]/          # Edit article
│   │   │   │   │   └── page.tsx
│   │   │   │   └── actions.ts
│   │   │   ├── settings/                 # Settings & member management
│   │   │   │   ├── members/              # Member management
│   │   │   │   │   ├── [id]/             # Individual member page
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── actions.ts
│   │   │   │   └── page.tsx
│   │   │   ├── thesis/                   # Thesis management
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx                  # Admin dashboard home
│   │   ├── api/                          # API routes
│   │   │   ├── analytics/
│   │   │   │   └── track/
│   │   │   │       └── route.ts          # Analytics tracking endpoint
│   │   │   ├── members/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts          # Individual member API
│   │   │   │   └── export/
│   │   │   │       └── route.ts          # CSV export
│   │   │   └── research/
│   │   │       ├── article/[slug]/
│   │   │       │   └── route.ts          # Article data API
│   │   │       └── pdf/[filename]/
│   │   │           └── route.ts          # PDF serving
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navigation.tsx        # Main navigation with auth badge
│   │   │   │   └── Footer.tsx
│   │   │   ├── ui/                       # shadcn/ui components (68 total)
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   └── ... (58 more components)
│   │   │   └── figma/
│   │   │       └── ImageWithFallback.tsx # Image component with fallback
│   │   ├── contact/                      # Contact page
│   │   │   └── page.tsx
│   │   ├── cycle-navigator/              # Market cycle tool
│   │   │   └── page.tsx
│   │   ├── regime-tracker/               # Market regime tool
│   │   │   └── page.tsx
│   │   ├── research/                     # Public research library
│   │   │   ├── [slug]/                   # Individual article page
│   │   │   │   └── page.tsx
│   │   │   ├── components/
│   │   │   │   └── TopicFilter.tsx
│   │   │   └── page.tsx                  # Research library listing
│   │   ├── signup/                       # Member signup
│   │   │   ├── page.tsx
│   │   │   └── actions.ts                # Form submission
│   │   ├── thesis-tracker/               # Investment thesis tool
│   │   │   └── page.tsx
│   │   ├── unauthorized/                 # Unauthorized access page
│   │   │   └── page.tsx
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Homepage
│   │   ├── globals.css                   # Global styles
│   │   ├── tailwind.css                  # Tailwind v4 config
│   │   ├── theme.css                     # Custom theme variables
│   │   └── fonts.css                     # Font definitions
│   ├── components/                       # Shared components
│   │   ├── NavigationWrapper.tsx         # Server component for auth
│   │   ├── PageViewTracker.tsx           # Client-side page tracking
│   │   ├── AnalyticsTracker.tsx          # Analytics utility component
│   │   └── PDFDownloadButton.tsx         # PDF download with tracking
│   ├── lib/                              # Utility libraries
│   │   ├── auth.ts                       # Cloudflare Access integration
│   │   ├── analytics.ts                  # Analytics utilities
│   │   ├── email.ts                      # Web3Forms integration
│   │   └── userAgentParser.ts            # Device/browser detection
│   └── middleware.ts                     # Next.js middleware (if any)
├── public/
│   ├── images/                           # Static images
│   └── _headers                          # Cloudflare cache headers
├── schema.sql                            # D1 database schema
├── wrangler.jsonc                        # Cloudflare Workers config
├── wrangler.jsonc.template               # Config template
├── open-next.config.ts                   # OpenNext adapter config
├── next.config.ts                        # Next.js configuration
├── postcss.config.mjs                    # PostCSS configuration
├── tailwind.config.ts                    # Tailwind configuration (if exists)
├── tsconfig.json                         # TypeScript configuration
└── package.json                          # Dependencies and scripts
```

## Database Schema

The application uses Cloudflare D1 with the following tables:

- **members** - Member applications and profiles
  - Personal info (name, email, phone)
  - Trading experience (years_investing, trading_style, areas_of_expertise)
  - Application status (Pending, Approved, Declined, Inactive)
  - Timestamps

- **research_articles** - Research articles and metadata
  - Article info (title, author, description, file_url)
  - Topics (comma-separated)
  - Publication date
  - View counts
  - URL slug

- **page_views** - Analytics for page views
  - Page path
  - Geographic data (country, region, city, latitude, longitude, timezone)
  - Device data (device_type, browser, os)
  - Traffic data (referrer, traffic_source)
  - Timestamps

- **pdf_downloads** - Analytics for PDF downloads
  - Article slug
  - PDF filename
  - Same geographic/device/traffic data as page_views
  - Timestamps

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Cloudflare account (for deployment)
- Cloudflare D1 database
- Cloudflare R2 bucket (for PDF storage)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# Web3Forms API key for signup email notifications
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key

# Cloudflare Web Analytics token (optional)
NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_analytics_token
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Development Mode Features:**
- Cloudflare Access authentication is disabled
- Direct access to `/admin` routes without login
- Auth status shows "dev@localhost" in navigation
- D1 database runs in local mode
- R2 storage simulated locally

### Database Setup

#### 1. Create D1 Database

```bash
npx wrangler d1 create invest-collective-db
```

Copy the `database_id` and add it to `wrangler.jsonc`:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "invest-collective-db",
      "database_id": "your-database-id-here"
    }
  ]
}
```

#### 2. Initialize Schema

```bash
# Local development
npx wrangler d1 execute invest-collective-db --file=./schema.sql --local

# Production
npx wrangler d1 execute invest-collective-db --file=./schema.sql --remote
```

#### 3. Verify Tables

```bash
# Local
npx wrangler d1 execute invest-collective-db --command="SELECT name FROM sqlite_master WHERE type='table'" --local

# Production
npx wrangler d1 execute invest-collective-db --command="SELECT name FROM sqlite_master WHERE type='table'" --remote
```

### R2 Storage Setup

#### 1. Create R2 Bucket

```bash
npx wrangler r2 bucket create invest-collective-research
```

#### 2. Configure in wrangler.jsonc

The bucket is already configured:

```jsonc
{
  "r2_buckets": [
    {
      "binding": "RESEARCH_PDFS",
      "bucket_name": "invest-collective-research"
    }
  ]
}
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

4. **Bind Resources:**
   - D1 Database: `invest-collective-db`
   - R2 Bucket: `invest-collective-research`

5. **Deploy:**
   - Cloudflare automatically builds and deploys on every push to `develop` branch
   - Your site will be available at `*.pages.dev`

### Option 2: Manual Deployment with Wrangler

```bash
# Login to Cloudflare
npx wrangler login

# Deploy
npm run deploy
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
  - Subdomain: Your domain (e.g., `theinvestcollective.com`)
  - Path: `/admin*` (without trailing slash - protects `/admin` and `/admin/*`)

**Critical:** The path must be `/admin*` (not `/admin/*`) to protect both the base path and all subpaths.

### 3. Choose Identity Provider

#### Option A: Google OAuth (Recommended)
1. Add Google as identity provider in Cloudflare Access
2. Configure OAuth credentials
3. Specify allowed email addresses or domains

#### Option B: GitHub OAuth
1. Connect GitHub account
2. Specify allowed organizations or individual users

#### Option C: One-Time PIN (Email-based)
1. Users receive authentication code via email
2. Specify allowed email addresses

### 4. Create Access Policy

- **Policy name**: `Admin Users Only`
- **Action**: `Allow`
- **Include**: Add specific email addresses (e.g., `admin@example.com`)

### 5. Test Authentication

1. Open incognito browser window
2. Navigate to `https://your-domain.com/admin`
3. Should redirect to Cloudflare Access login
4. After successful authentication, access admin dashboard

### Managing Admin Users

1. Go to **Zero Trust** → **Access** → **Applications**
2. Find **Invest Collective Admin** application
3. Click **Edit** → **Policies** → **Admin Users Only**
4. Add or remove email addresses in the **Include** section
5. Changes take effect immediately

**Costs:** Cloudflare Access is free for up to 50 users.

## Cloudflare Web Analytics

### Setup

1. Go to Cloudflare Dashboard > **Analytics & Logs** > **Web Analytics**
2. Click **Add a site** and enter site name
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
- **Privacy-friendly** - No cookies, GDPR compliant
- **Fast** - No impact on page load times

## Development Workflow

### Issue-Driven Development

All features, enhancements, and bug fixes follow this workflow:

### 1. Create GitHub Issue

```bash
gh issue create --repo fstab50/invest-collective-site \
  --title "Feature: Add export analytics data" \
  --body "Add CSV export functionality to analytics dashboard"
```

**Issue should include:**
- Clear title (prefix: `Feature:`, `Bug:`, `Enhancement:`)
- Description of problem or feature
- Task checklist if multi-step
- Priority level (Low/Medium/High)

### 2. Implement Solution

```bash
# Ensure on develop branch
git checkout develop
git pull origin develop

# Make changes
# ... edit files ...

# Test locally
npm run dev
```

### 3. Commit with Issue Reference

```bash
git add .
git commit -m "Add CSV export to analytics dashboard

- Created export button in analytics page
- Implemented CSV generation from analytics data
- Added download functionality
- Tested with large datasets

Fixes #15"
```

**Commit format:**
- First line: Brief description (≤50 chars)
- Blank line
- Bullet points of changes
- Blank line
- `Fixes #N` to auto-close issue

### 4. Push and Deploy

```bash
git push origin develop
```

Cloudflare automatically builds and deploys from `develop` branch.

## Custom Domain

1. Go to Cloudflare Dashboard > Workers & Pages
2. Select your worker/page
3. Navigate to Settings > Domains & Routes
4. Add custom domain

DNS configured automatically.

## Monitoring & Analytics

- **Application Logs:** `npx wrangler tail` or Cloudflare Dashboard > Workers & Pages > Logs
- **Cloudflare Analytics:** Dashboard > Workers & Pages > Analytics
- **Custom Analytics Dashboard:** `/admin/analytics` (requires authentication)
- **Error Tracking:** Cloudflare Dashboard > Workers & Pages > Logs
- **Database Queries:** `npx wrangler d1 execute invest-collective-db --command="<SQL>"`

## GitHub CLI Commands

```bash
# Create issue
gh issue create --repo fstab50/invest-collective-site \
  --title "Bug: PDF downloads not tracking" \
  --body "Description..."

# List issues
gh issue list --repo fstab50/invest-collective-site

# View issue
gh issue view 15 --repo fstab50/invest-collective-site

# Close issue
gh issue close 15 --repo fstab50/invest-collective-site \
  --comment "Fixed in commit abc123"

# Add comment
gh issue comment 15 --repo fstab50/invest-collective-site \
  --body "Working on this now"
```

## Best Practices

### Code Quality
- Use TypeScript for all new code
- Follow existing code patterns and conventions
- Use shadcn/ui components when available
- Keep components small, focused, and reusable
- Test on desktop, tablet, and mobile viewports

### Git Workflow
- Always work on `develop` branch
- Write clear, descriptive commit messages
- Reference issue numbers in commits (`Fixes #N`)
- Keep commits focused (one logical change per commit)
- Push frequently to avoid conflicts

### Performance
- Optimize images before adding to `public/`
- Use Next.js `<Image>` component for all images
- Minimize client-side JavaScript
- Lazy load components where appropriate
- Test Lighthouse scores regularly

### Security
- **Always use Cloudflare Access** for authentication (no custom auth)
- Validate all user input in server actions
- Use parameterized queries for database operations
- Keep dependencies updated (`npm audit`)
- Review Cloudflare Access logs for suspicious activity
- Use HTTP-only, secure cookies

### Database
- Use prepared statements via D1's query builder
- Create indexes for frequently queried columns
- Clean up old analytics data periodically
- Back up production database regularly

## Troubleshooting

### Build Failures

**Cloudflare build fails:**
```bash
# Test local build
npm run build

# Preview Cloudflare build
npm run preview

# Check build logs in Cloudflare Dashboard
```

**wrangler.jsonc not found:**
- Ensure `wrangler.jsonc.template` exists
- Check `predeploy` script runs: `cp wrangler.jsonc.template wrangler.jsonc`

### Type Errors

```bash
# Regenerate Cloudflare types
npm run cf-typegen

# Check TypeScript errors
npx tsc --noEmit
```

### Authentication Issues

**"Access Denied" after authentication:**
- Verify email is in Cloudflare Access allowed list
- Check policy includes your identity provider
- Review Cloudflare Access logs for details

**Infinite redirect loop:**
- Clear all cookies for your domain
- Verify application path is `/admin*` (not `/admin/*`)
- Check Cloudflare Access application configuration

**Can't access admin in development:**
- Ensure `NODE_ENV=development`
- Auth is automatically bypassed in dev mode

### Database Issues

**Connection errors:**
```bash
# Check D1 binding in wrangler.jsonc
# Verify database_id is correct
npx wrangler d1 list
```

**Schema changes:**
```bash
# Apply schema updates
npx wrangler d1 execute invest-collective-db --file=./schema.sql --local
npx wrangler d1 execute invest-collective-db --file=./schema.sql --remote
```

**Query database:**
```bash
# Local
npx wrangler d1 execute invest-collective-db --command="SELECT * FROM members LIMIT 5" --local

# Production
npx wrangler d1 execute invest-collective-db --command="SELECT * FROM members LIMIT 5" --remote
```

### R2 Storage Issues

**PDF uploads failing:**
```bash
# List R2 buckets
npx wrangler r2 bucket list

# Check bucket exists
npx wrangler r2 bucket list | grep invest-collective-research
```

**List uploaded files:**
```bash
npx wrangler r2 object list invest-collective-research
```

### Analytics Not Recording

**Check API endpoint:**
```bash
# Test analytics tracking
curl -X POST https://your-domain.com/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{"event_type":"page_view","page_path":"/test"}'
```

**Verify database:**
```bash
npx wrangler d1 execute invest-collective-db \
  --command="SELECT COUNT(*) FROM page_views" --remote
```

## License

See [LICENSE](./LICENSE) file.

## Authors

- Blake Huber
- Russell Moore

---

**Last Updated:** January 2026
