'use client';

import { ChartLine } from 'lucide-react';

export default function ThesisTrackerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChartLine className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Thesis Tracker</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track and monitor your investment theses, analyze performance, and refine your strategies based on real-time data and outcomes.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <ChartLine className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're building a powerful thesis tracking tool to help you document, monitor, and evaluate your investment ideas over time. Stay tuned for updates!
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Track Performance</h3>
                <p className="text-sm text-gray-600">
                  Monitor how your investment theses perform against benchmarks and adjust as market conditions change.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Document Insights</h3>
                <p className="text-sm text-gray-600">
                  Keep detailed records of your reasoning, catalysts, risks, and key metrics for each thesis.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Collaborate</h3>
                <p className="text-sm text-gray-600">
                  Share theses with group members, get feedback, and learn from collective insights.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Analyze Results</h3>
                <p className="text-sm text-gray-600">
                  Review historical theses to improve your process and identify patterns in your decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
