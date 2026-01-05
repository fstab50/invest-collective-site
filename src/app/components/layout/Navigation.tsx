'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <span className="font-semibold text-xl">Invest Collective</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {/* General Links */}
            <div className="flex gap-6">
              <Link href="/#about" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/#meetings" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Meetings
              </Link>
              <Link href="/#benefits" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Benefits
              </Link>
            </div>

            {/* Divider */}
            <span className="text-gray-400 text-lg">|</span>

            {/* Tools */}
            <div className="flex gap-6">
              <Link href="/thesis-tracker" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                Thesis Tracker
              </Link>
              <Link href="/regime-tracker" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                Regime Tracker
              </Link>
              <Link href="/cycle-navigator" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                Cycle Navigator
              </Link>
              <Link href="/research" className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                Research
              </Link>
            </div>
          </div>

          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
