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
        subject: 'New Invest Collective Application',
        from_name: application.name,
        // Include all application fields in the email body
        name: application.name,
        email: application.email,
        phone: application.phone,
        yearsInvesting: application.years_investing,
        tradingStyle: application.trading_style,
        areasOfExpertise: application.areas_of_expertise,
        macroeconomicsKnowledge: application.macro_knowledge,
        portfolioSize: application.portfolio_size,
        investingExperience: application.investment_journey,
        expectations: application.expectations,
        referralSource: application.referral_source || 'Not specified',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Web3Forms error response:', errorData);
      return {
        success: false,
        error: errorData?.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();

    if (!data.success) {
      console.error('Web3Forms returned success=false:', data);
      return {
        success: false,
        error: data.message || 'Email service returned failure',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
