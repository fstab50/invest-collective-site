'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <Shield className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>

        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. This area is restricted to authorized administrators only.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            If you believe you should have access, please contact the site administrator.
          </p>

          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
