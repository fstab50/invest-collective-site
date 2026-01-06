# Development Workflow

This document outlines the development practices and workflow for The Invest Collective website.

## Issue-Driven Development

All features, enhancements, and bug fixes should follow this workflow:

### 1. Create GitHub Issue First

Before implementing any feature or fix:

```bash
# Create an issue via GitHub CLI
gh issue create --repo fstab50/invest-collective-site \
  --title "Feature: Add dark mode support" \
  --body "## Description
Implement dark mode toggle for better user experience in low-light conditions.

## Tasks
- [ ] Add theme provider
- [ ] Create theme toggle component
- [ ] Update all components for dark mode
- [ ] Test across pages

## Priority
Medium"
```

**Issue should include:**
- Clear title (prefix with `Feature:`, `Bug:`, `Enhancement:`)
- Description of the problem or feature
- Task checklist if multi-step
- Priority level (Low/Medium/High)
- Any relevant context or screenshots

### 2. Implement the Solution

Work on the feature in the repository:

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

Reference the issue number in commit messages:

```bash
git add .
git commit -m "Add dark mode support

- Implemented theme provider with next-themes
- Created ThemeToggle component in navigation
- Updated all pages to support dark mode
- Tested across mobile and desktop

Fixes #6"
```

**Commit message format:**
- First line: Brief description (50 chars or less)
- Blank line
- Bullet points of changes made
- Blank line
- `Fixes #N` or `Closes #N` to auto-close the issue

### 4. Push and Deploy

```bash
git push origin develop
```

Cloudflare will automatically build and deploy when pushed to `develop` branch.

### 5. Verify Issue Closure

The issue will automatically close when the commit with `Fixes #N` is pushed. Verify:

```bash
gh issue view 6 --repo fstab50/invest-collective-site
```

---

## Development Commands

```bash
# Local development
npm run dev                 # Start dev server on localhost:3000

# Building
npm run build              # Build Next.js app
npm run start              # Start production server locally

# Cloudflare deployment
npm run cf-typegen         # Generate Cloudflare types
npm run preview            # Preview Cloudflare build locally
npm run deploy             # Deploy to Cloudflare Pages

# Code quality
npm run lint               # Run ESLint
```

---

## Project Structure

```
invest-collective-site/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── components/
│   │   │   ├── layout/          # Navigation, Footer
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   └── [tool-pages]/        # Tool pages (thesis-tracker, etc.)
│   └── lib/                      # Utility functions
├── public/                       # Static assets
├── content/                      # Future: Research articles (markdown)
├── wrangler.jsonc.template      # Cloudflare config template
└── package.json
```

---

## Cloudflare Workers Configuration

The site deploys to Cloudflare Workers via `@opennextjs/cloudflare`.

**Important files:**
- `wrangler.jsonc.template` - Template config (checked into git)
- `wrangler.jsonc` - Generated config (gitignored, created on deploy)
- `open-next.config.ts` - OpenNext adapter configuration

**Deployment:**
- Automatic on push to `develop` branch
- Manual via `npm run deploy`

---

## GitHub CLI Workflows

### Create Issue
```bash
gh issue create --repo fstab50/invest-collective-site \
  --title "Bug: Mobile menu not closing on link click" \
  --body "Description of the issue..."
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

### Add Comment
```bash
gh issue comment 6 --repo fstab50/invest-collective-site \
  --body "Working on this now"
```

---

## Best Practices

### Code Quality
- Use TypeScript for type safety
- Follow existing code style and patterns
- Use shadcn/ui components when possible
- Keep components small and focused
- Test on both desktop and mobile

### Git Workflow
- Always work on `develop` branch
- Write clear, descriptive commit messages
- Reference issue numbers in commits
- Keep commits focused (one logical change per commit)

### Performance
- Optimize images before adding to public/
- Use Next.js Image component for images
- Minimize client-side JavaScript
- Test Lighthouse scores regularly

### Accessibility
- Use semantic HTML
- Include ARIA labels where needed
- Test keyboard navigation
- Ensure color contrast meets WCAG standards

---

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

---

## Getting Help

- **GitHub Issues**: https://github.com/fstab50/invest-collective-site/issues
- **Documentation**: Check README.md for setup instructions
- **Next.js Docs**: https://nextjs.org/docs
- **Cloudflare Workers**: https://developers.cloudflare.com/workers/

---

## Example Full Workflow

```bash
# 1. Create issue
gh issue create --repo fstab50/invest-collective-site \
  --title "Feature: Add newsletter signup form" \
  --body "Add newsletter signup to footer"

# Output: Created issue #7

# 2. Implement feature
# ... make changes ...

# 3. Test locally
npm run dev

# 4. Commit with issue reference
git add .
git commit -m "Add newsletter signup form to footer

- Created NewsletterForm component
- Integrated with ConvertKit API
- Added form validation
- Styled to match footer design

Fixes #7"

# 5. Push to deploy
git push origin develop

# 6. Verify issue closed
gh issue view 7 --repo fstab50/invest-collective-site
# Status: CLOSED ✓
```

---

**Last Updated:** January 2026
