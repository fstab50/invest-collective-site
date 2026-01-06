import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const { slug } = params;

    const { results } = await DB.prepare(
      `SELECT id, slug, title, date, topics, summary, html_content, pdf_url, pdf_filename, status, created_at, updated_at
       FROM articles
       WHERE slug = ?`,
    )
      .bind(slug)
      .all();

    if (!results || results.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error('Article fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
