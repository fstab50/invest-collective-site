import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextRequest, NextResponse } from 'next/server';

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  years_investing: string;
  trading_style: string;
  areas_of_expertise: string;
  macro_knowledge: string;
  portfolio_size: string;
  investment_journey: string;
  expectations: string;
  referral_source: string | null;
  status: string;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  approved_at: string | null;
  activated_at: string | null;
  created_at: string;
  updated_at: string;
}

function escapeCSV(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  const stringValue = String(value);
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export async function GET(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    // Optional status filter
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    let query = 'SELECT * FROM members';
    const params: string[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const { results } = params.length > 0 ? await DB.prepare(query).bind(...params).all<Member>() : await DB.prepare(query).all<Member>();

    const members = results || [];

    // CSV headers
    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Years Investing',
      'Trading Style',
      'Areas of Expertise',
      'Macro Knowledge',
      'Portfolio Size',
      'Investment Journey',
      'Expectations',
      'Referral Source',
      'Status',
      'Admin Notes',
      'Reviewed By',
      'Reviewed At',
      'Approved At',
      'Activated At',
      'Created At',
      'Updated At',
    ];

    // Build CSV content
    const csvRows = [headers.join(',')];

    members.forEach((member) => {
      const row = [
        escapeCSV(member.id),
        escapeCSV(member.name),
        escapeCSV(member.email),
        escapeCSV(member.phone),
        escapeCSV(member.years_investing),
        escapeCSV(member.trading_style),
        escapeCSV(member.areas_of_expertise),
        escapeCSV(member.macro_knowledge),
        escapeCSV(member.portfolio_size),
        escapeCSV(member.investment_journey),
        escapeCSV(member.expectations),
        escapeCSV(member.referral_source),
        escapeCSV(member.status),
        escapeCSV(member.admin_notes),
        escapeCSV(member.reviewed_by),
        escapeCSV(member.reviewed_at),
        escapeCSV(member.approved_at),
        escapeCSV(member.activated_at),
        escapeCSV(member.created_at),
        escapeCSV(member.updated_at),
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `members-${timestamp}.csv`;

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting members:', error);
    return NextResponse.json({ success: false, error: 'Failed to export members' }, { status: 500 });
  }
}
