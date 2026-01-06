import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } },
) {
  try {
    const ctx = getRequestContext();
    const { RESEARCH_PDFS } = ctx.env;

    const { filename } = params;

    // Get PDF from R2
    const object = await RESEARCH_PDFS.get(filename);

    if (!object) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
    }

    // Stream the PDF
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `inline; filename="${filename}"`);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(object.body, {
      headers,
    });
  } catch (error) {
    console.error('PDF fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });
  }
}
