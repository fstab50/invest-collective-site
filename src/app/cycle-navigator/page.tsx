'use client';

import { Calendar } from 'lucide-react';

export default function CycleNavigatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Cycle Navigator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate economic and market cycles with confidence. Understand where we are in the cycle and position accordingly.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're creating a comprehensive cycle analysis tool to help you identify your position in economic and market cycles and make informed decisions.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Economic Cycles</h3>
                <p className="text-sm text-gray-600">
                  Track expansion, peak, contraction, and trough phases of business cycles with leading indicators.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Credit Cycles</h3>
                <p className="text-sm text-gray-600">
                  Monitor credit expansion and contraction, debt levels, and their impact on market dynamics.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Sector Rotation</h3>
                <p className="text-sm text-gray-600">
                  Identify which sectors typically outperform during different phases of economic cycles.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Timing Signals</h3>
                <p className="text-sm text-gray-600">
                  Get early warning signals of cycle transitions to help you adjust positioning ahead of major shifts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
