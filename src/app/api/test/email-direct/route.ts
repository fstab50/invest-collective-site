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
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a direct test of the Web3Forms API from Cloudflare Workers',
      }),
    });

    console.log('[DIRECT-EMAIL-TEST] Response status:', response.status);
    console.log('[DIRECT-EMAIL-TEST] Response headers:', Object.fromEntries(response.headers.entries()));

    // Get response as text first to see what we're actually getting
    const responseText = await response.text();
    console.log('[DIRECT-EMAIL-TEST] Response text:', responseText);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('[DIRECT-EMAIL-TEST] Parsed JSON data:', data);
    } catch (parseError) {
      console.error('[DIRECT-EMAIL-TEST] Failed to parse response as JSON');
      return NextResponse.json({
        success: false,
        status: response.status,
        error: 'Response is not valid JSON',
        responseText: responseText.substring(0, 500), // First 500 chars
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: response.ok && data?.success,
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
