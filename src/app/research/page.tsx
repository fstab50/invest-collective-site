'use client';

import { Lightbulb } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Research</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access curated research, analysis, and insights from our community of experienced investors and market professionals.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <Lightbulb className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're building a comprehensive research hub where members can share insights, publish analysis, and access collective knowledge.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Member Research</h3>
                <p className="text-sm text-gray-600">
                  Access research reports, market commentary, and investment ideas from fellow group members.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Market Analysis</h3>
                <p className="text-sm text-gray-600">
                  Stay informed with weekly market reviews, sector analysis, and macroeconomic commentary.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Educational Resources</h3>
                <p className="text-sm text-gray-600">
                  Learn from tutorials, guides, and deep dives into investment strategies and market mechanics.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Data & Tools</h3>
                <p className="text-sm text-gray-600">
                  Access proprietary data visualizations, screening tools, and analytical frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
