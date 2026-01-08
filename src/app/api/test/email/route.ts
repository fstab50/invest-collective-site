import { NextRequest, NextResponse } from 'next/server';
import { sendNewApplicationNotification } from '@/lib/email';

export async function GET(request: NextRequest) {
  console.log('[EMAIL-TEST] Testing email functionality');

  const testApplication = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-1234',
    years_investing: '5+ years',
    trading_style: 'Swing Trading',
    areas_of_expertise: 'Technology stocks',
    macro_knowledge: 'Intermediate',
    portfolio_size: '$100k-$500k',
    investment_journey: 'This is a test application to verify email functionality.',
    expectations: 'Testing email notifications',
    referral_source: 'Direct test',
  };

  const result = await sendNewApplicationNotification(testApplication);

  return NextResponse.json({
    message: 'Email test completed',
    result,
    timestamp: new Date().toISOString(),
  });
}
