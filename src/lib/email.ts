/**
 * Email notification utilities using Web3Forms API
 */

interface MemberApplication {
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
  referral_source?: string;
}

/**
 * Send email notification to admin when a new member applies
 */
export async function sendNewApplicationNotification(
  application: MemberApplication,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: '646715cb-7883-4f01-b624-002d1cee543f', // Web3Forms public key
        subject: `New Member Application: ${application.name}`,
        from_name: 'Invest Collective',
        // Main content
        name: application.name,
        email: application.email,
        phone: application.phone,
        years_investing: application.years_investing,
        trading_style: application.trading_style,
        areas_of_expertise: application.areas_of_expertise,
        macro_knowledge: application.macro_knowledge,
        portfolio_size: application.portfolio_size,
        investment_journey: application.investment_journey,
        expectations: application.expectations,
        referral_source: application.referral_source || 'Not specified',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error: errorData?.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { success: data.success === true };
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
