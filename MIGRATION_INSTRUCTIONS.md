# Database Migration Instructions

## Add Status Column to Articles Table

After pulling the latest code, you need to run a database migration to add the `status` column to the existing `articles` table.

### Run Migration

```bash
npx wrangler d1 execute invest-collective-db --remote --file=migrations/001_add_status_column.sql
```

This will:
1. Add a `status` column to the `articles` table with default value `'published'`
2. Create an index on the `status` column for faster queries
3. Set all existing articles to `'published'` status

### Verify Migration

After running the migration, verify it worked:

```bash
npx wrangler d1 execute invest-collective-db --remote --command="SELECT id, title, status FROM articles LIMIT 5"
```

You should see a `status` column with value `'published'` for all existing articles.

### New Workflow

After this migration:

1. **Upload New Articles** - They will be saved as `'draft'` status
2. **Preview & Edit** - Review AI-generated content in the edit page
3. **Publish** - Click the "Publish" button to make the article visible to the public
4. **Edit Published Articles** - You can still edit and unpublish articles later

### Important Notes

- Only `'published'` articles will appear on the public research pages
- Draft articles are only visible in the admin interface
- You can toggle between draft and published status at any time
