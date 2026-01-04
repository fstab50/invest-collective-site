# Invest Collective - Trading Group

Single-page Next.js application for the Invest Collective trading group, deployed on Cloudflare Workers.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Deployment:** Cloudflare Workers (via OpenNext)
- **UI Components:** shadcn/ui (48 components)
- **UI Primitives:** Radix UI
- **Icons:** Lucide React
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Cloudflare account (for deployment)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Preview Cloudflare Build Locally

```bash
npm run preview
```

## Deployment to Cloudflare Pages (Recommended)

### CI/CD Setup with GitHub

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
   Add these in Cloudflare Pages settings:
   ```
   NODE_VERSION=20
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
   ```

4. **Deploy:**
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy on every push to `develop` branch
   - Your site will be available at `*.pages.dev`

### Manual Deployment (Alternative)

For manual deployments using Wrangler:

1. **Login to Cloudflare:**
   ```bash
   npx wrangler login
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

The site will be deployed to `invest-collective-site.workers.dev` (or your custom domain).

### Generate Cloudflare TypeScript Types

```bash
npm run cf-typegen
```

## Project Structure

```
invest-collective-site/
├── src/
│   └── app/
│       ├── components/
│       │   ├── ui/              # 48 shadcn/ui components
│       │   └── figma/           # ImageWithFallback component
│       ├── layout.tsx           # Root layout
│       ├── page.tsx             # Home page (single-page app)
│       ├── globals.css          # CSS imports
│       ├── tailwind.css         # Tailwind v4 config
│       ├── theme.css            # Custom theme
│       └── fonts.css            # Font definitions
├── public/
│   └── _headers                 # Cloudflare cache headers
├── wrangler.jsonc              # Cloudflare Workers config
├── open-next.config.ts         # OpenNext adapter config
├── next.config.ts              # Next.js config
└── postcss.config.mjs          # PostCSS config
```

## Features

- ✅ Single-page landing site with smooth anchor navigation
- ✅ Responsive design with Tailwind CSS v4
- ✅ Image optimization with Next.js Image component
- ✅ External image support (Unsplash)
- ✅ 48 shadcn/ui components (Radix UI primitives)
- ✅ Custom light/dark theme support
- ✅ Cloudflare Workers deployment
- ✅ Fast global CDN delivery

## Environment Variables

For local development, create a `.env.local` file:

```env
# Add environment variables here
# Client-side variables must be prefixed with NEXT_PUBLIC_
```

For production, set environment variables in `wrangler.jsonc`:

```jsonc
{
  "vars": {
    "NEXT_PUBLIC_API_URL": "https://api.example.com"
  }
}
```

## Custom Domain

To use a custom domain:

1. Go to Cloudflare Dashboard > Workers & Pages
2. Select your worker
3. Navigate to Settings > Domains & Routes
4. Add your custom domain

DNS will be configured automatically.

## Monitoring

- **Logs:** `npx wrangler tail` or Cloudflare Dashboard
- **Analytics:** Cloudflare Dashboard > Workers & Pages > Analytics
- **Errors:** Cloudflare Dashboard > Workers & Pages > Logs

## License

See [LICENSE](./LICENSE) file.

## Authors

- Blake Huber
- Russell Moore
