import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid member ID' }, { status: 400 });
    }

    const member = await DB.prepare('SELECT * FROM members WHERE id = ?').bind(id).first();

    if (!member) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch member' }, { status: 500 });
  }
}
