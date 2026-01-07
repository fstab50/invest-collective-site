# Cloudflare Web Analytics Setup

## Enable Cloudflare Web Analytics

1. Go to your Cloudflare dashboard
2. Navigate to **Analytics & Logs** → **Web Analytics**
3. Click **Add a site**
4. Enter your site name (e.g., "The Invest Collective")
5. Copy the JavaScript snippet provided

## Add to Your Site

The analytics snippet will look like this:

```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
```

## Environment Variable

Add the token to your `.env.local` file:

```
NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_token_here
```

The script is already integrated in `src/app/layout.tsx` and will automatically load when the environment variable is set.

## Features

Cloudflare Web Analytics provides:
- Page views and unique visitors
- Top pages and referrers
- Visitor countries and devices
- Browser and OS statistics
- **Privacy-friendly** - No cookies, GDPR compliant
- **Fast** - No impact on page load times

## Custom Analytics Dashboard

In addition to Cloudflare Web Analytics, you have a custom analytics dashboard at `/admin/analytics` that tracks:
- Article views
- PDF downloads
- Topic filter usage
- Most popular articles
- Most popular topics
- Activity over time

Both analytics systems work together to give you complete insights into your site's performance.
