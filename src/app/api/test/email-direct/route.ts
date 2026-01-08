import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('[DIRECT-EMAIL-TEST] Testing direct Web3Forms API call');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: '646715cb-7883-4f01-b624-002d1cee543f',
        subject: 'Direct API Test',
        from_name: 'Test',
        email: 'test@example.com',
        message: 'This is a direct test of the Web3Forms API',
      }),
    });

    console.log('[DIRECT-EMAIL-TEST] Response status:', response.status);

    const data = await response.json();
    console.log('[DIRECT-EMAIL-TEST] Response data:', data);

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[DIRECT-EMAIL-TEST] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
