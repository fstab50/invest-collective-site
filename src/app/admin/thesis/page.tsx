import Link from 'next/link';
import { ChevronLeft, Target, TrendingUp, AlertCircle, CheckCircle, Edit, Trash2 } from 'lucide-react';

export default function ThesisManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Admin Dashboard</span>
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Thesis Management</h1>
          </div>
          <p className="text-gray-600">Manage investment theses and track their performance</p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">Coming Soon</h3>
          <p className="text-amber-800 mb-4">
            This section is under development. Below are some features we plan to implement.
          </p>
        </div>

        {/* Planned Features */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Create Thesis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Create Thesis</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Document new investment theses with rationale, entry criteria, target prices, and risk parameters.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Thesis statement and hypothesis</li>
              <li>• Entry/exit criteria</li>
              <li>• Target price and stop loss</li>
              <li>• Risk/reward analysis</li>
            </ul>
          </div>

          {/* Track Positions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Track Positions</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Monitor active positions associated with each thesis and track performance against targets.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Position size and entry price</li>
              <li>• Current P&L tracking</li>
              <li>• Progress toward targets</li>
              <li>• Risk metrics (position size, etc.)</li>
            </ul>
          </div>

          {/* Thesis Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Status Tracking</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Track thesis lifecycle from hypothesis to completion, with status indicators and notes.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Active/Watching/Closed status</li>
              <li>• Thesis validation checkpoints</li>
              <li>• Performance vs expectations</li>
              <li>• Post-mortem analysis</li>
            </ul>
          </div>

          {/* Alerts & Triggers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Alerts & Triggers</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Set automated alerts when thesis conditions are met or violated.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Entry signal alerts</li>
              <li>• Target price notifications</li>
              <li>• Stop loss warnings</li>
              <li>• Thesis invalidation triggers</li>
            </ul>
          </div>

          {/* Edit & Review */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Edit className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Edit & Review</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Update thesis details, add observations, and conduct periodic reviews.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Edit thesis parameters</li>
              <li>• Add market observations</li>
              <li>• Update conviction levels</li>
              <li>• Quarterly thesis reviews</li>
            </ul>
          </div>

          {/* Archive & History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Trash2 className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Archive & History</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Archive completed theses and maintain historical records for analysis.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Completed thesis archive</li>
              <li>• Success/failure tracking</li>
              <li>• Historical performance</li>
              <li>• Lessons learned database</li>
            </ul>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
