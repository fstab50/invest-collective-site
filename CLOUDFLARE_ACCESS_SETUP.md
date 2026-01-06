# Cloudflare Access Setup Instructions

This guide will help you set up Cloudflare Access to protect the `/admin/*` routes of your site.

## What is Cloudflare Access?

Cloudflare Access is a zero-trust authentication service that lets you secure your applications without VPNs. It supports multiple identity providers including Google, GitHub, and email-based authentication.

## Setup Steps

### 1. Enable Cloudflare Access

1. Go to your Cloudflare dashboard: https://dash.cloudflare.com
2. Select your account
3. Navigate to **Zero Trust** in the left sidebar
4. Click **Access** → **Applications**

### 2. Create an Application

1. Click **Add an application**
2. Choose **Self-hosted**
3. Fill in the application details:
   - **Application name**: `Invest Collective Admin`
   - **Session Duration**: `24 hours` (or your preference)
   - **Application domain**:
     - Subdomain: `invest-collective-site` (or your custom domain)
     - Path: `/admin/*`

### 3. Configure Identity Provider

Choose one of these options:

#### Option A: Google OAuth (Recommended for small teams)
1. Click **Add identity provider**
2. Select **Google**
3. Follow the setup wizard to connect your Google Workspace or Gmail accounts
4. Specify allowed email addresses or domains

#### Option B: GitHub OAuth
1. Click **Add identity provider**
2. Select **GitHub**
3. Connect your GitHub account
4. Specify allowed organizations or individual users

#### Option C: One-Time PIN (Email-based)
1. Click **Add identity provider**
2. Select **One-time PIN**
3. Users will receive a code via email to authenticate
4. Specify allowed email addresses

### 4. Create Access Policy

1. In the **Add a policy** section:
   - **Policy name**: `Admin Users Only`
   - **Action**: `Allow`

2. Configure rules:
   - **Include**:
     - **Emails**: Add individual email addresses (e.g., `you@example.com`)
     - OR **Email domain**: Add your domain (e.g., `@yourcompany.com`)

3. Click **Next** and then **Add application**

### 5. Test the Configuration

1. Open an incognito/private browser window
2. Navigate to: `https://your-domain.com/admin/research/upload`
3. You should be redirected to Cloudflare Access login
4. Authenticate with your chosen provider (Google/GitHub/Email)
5. After successful authentication, you'll be redirected to the admin page

## Development vs Production

### Development (Local)
- Cloudflare Access is **disabled** in local development
- You can access `/admin` routes directly at `http://localhost:3000/admin/research/upload`
- This is configured in `src/middleware.ts`

### Production (Cloudflare Workers)
- Cloudflare Access is **enabled** automatically
- All `/admin/*` routes require authentication
- Unauthenticated users are redirected to `/unauthorized`

## Adding/Removing Users

To manage who has admin access:

1. Go to **Zero Trust** → **Access** → **Applications**
2. Find your **Invest Collective Admin** application
3. Click **Edit**
4. Under **Policies**, edit the **Admin Users Only** policy
5. Add or remove email addresses in the **Include** section
6. Click **Save**

Changes take effect immediately.

## Costs

Cloudflare Access pricing:
- **Free tier**: Up to 50 users
- **Paid tier**: $3/user/month for additional users

For 2-3 admin users, you'll stay within the free tier.

## Troubleshooting

### "Access Denied" after authentication
- Check that your email is in the allowed list
- Verify the policy includes your identity provider
- Check the Cloudflare Access logs for details

### Infinite redirect loop
- Clear cookies for your domain
- Check that the application domain path is `/admin/*`
- Ensure the middleware is correctly configured

### Can't access in development
- Make sure you're running `npm run dev`
- Middleware should automatically allow access when `NODE_ENV=development`

## Security Best Practices

1. **Use specific email addresses** rather than broad domain rules
2. **Enable MFA** for your identity provider (Google/GitHub)
3. **Set session duration** to a reasonable time (24 hours recommended)
4. **Review access logs** regularly in Cloudflare dashboard
5. **Revoke access immediately** when someone leaves the team

## Alternative: Simple Password (Fallback)

If Cloudflare Access setup is complex for your needs, we can implement a simpler password-based authentication instead. Let me know if you'd prefer that approach.

---

**Next Steps:**
1. Complete Cloudflare Access setup following steps above
2. Test authentication with an incognito browser
3. Share access with 1-2 other authorized users
4. Proceed with using the admin upload form
