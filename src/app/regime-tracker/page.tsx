'use client';

import { TrendingUp } from 'lucide-react';

export default function RegimeTrackerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Regime Tracker</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Identify and navigate different market regimes with precision. Understand macro conditions and adjust your strategy accordingly.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're developing an advanced regime detection system to help you identify market conditions and adapt your investment approach in real-time.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Market Classification</h3>
                <p className="text-sm text-gray-600">
                  Automatically classify current market conditions: bull, bear, sideways, high volatility, or transitional regimes.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Macro Indicators</h3>
                <p className="text-sm text-gray-600">
                  Track key macro indicators including inflation, interest rates, GDP growth, and currency movements.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Historical Analysis</h3>
                <p className="text-sm text-gray-600">
                  Compare current regimes to historical periods and learn from past market behaviors and outcomes.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Strategy Alignment</h3>
                <p className="text-sm text-gray-600">
                  Get recommendations on how to adjust your portfolio and strategies based on the current regime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
