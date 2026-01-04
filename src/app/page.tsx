'use client';

import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { TrendingUp, Users, Calendar, ChartLine, Lightbulb, MessageCircle } from 'lucide-react';

export default function Page() {
  return (
    <div className="size-full overflow-y-auto bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <span className="font-semibold text-xl">Invest Collective</span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#meetings" className="text-gray-700 hover:text-blue-600 transition-colors">Meetings</a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">Benefits</a>
              <a href="#join" className="text-gray-700 hover:text-blue-600 transition-colors">Join Us</a>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Grow Your Wealth Together
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join our community of passionate investors who meet weekly to share insights, discuss strategies, and navigate the markets together.
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Join Our Group
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </div>
              <div className="mt-12 flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600">Meeting Weekly for over 4 years.</div>
                  <div className="text-gray-600">Established 2002</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1666249245520-eb1f564dc421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwb2ZmaWNlJTIwZGVzayUyMHNldHVwfGVufDF8fHx8MTc2NzU1MTc3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Individual investor home office"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Our Group</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a dedicated community of traders and investors who believe that collaboration and shared knowledge lead to better investment decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1645226880663-81561dcab0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGNoYXJ0fGVufDF8fHx8MTc2NzQ2NzczN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Market analysis"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                When interpreting financial markets, isolated thoughts are the enemy of clarity We empower individual investors to make better investment decisions via peer collaboration, continuing and shared market insights. Our weekly meetings provide a structured environment to discuss market trends, analyze opportunities, and learn from each other's experiences.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Weekly market analysis and trend discussions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Portfolio reviews and strategy sharing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Educational workshops on trading techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Guest speakers from the finance industry</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of being part of an active investing community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Learning</h3>
              <p className="text-gray-600">
                Learn from experienced investors and share your own insights in a supportive, collaborative environment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ChartLine className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Market Insights</h3>
              <p className="text-gray-600">
                Stay ahead of market trends with diverse perspectives and real-time analysis from our members.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Strategy Development</h3>
              <p className="text-gray-600">
                Refine your investment strategies through constructive feedback and proven methodologies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Networking</h3>
              <p className="text-gray-600">
                Build valuable relationships with like-minded investors and expand your professional network.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Regular Sessions</h3>
              <p className="text-gray-600">
                Consistent weekly meetings keep you engaged and accountable to your investment goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Results</h3>
              <p className="text-gray-600">
                Members report improved confidence and better investment outcomes through group participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meetings Section */}
      <section id="meetings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Weekly Meetings</h2>
              <p className="text-xl text-gray-600 mb-8">
                Every week, we gather to discuss market movements, share investment ideas, and learn together. Our structured format ensures productive and insightful sessions.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">When We Meet</h3>
                    <p className="text-gray-600">Every Thursday at 7:00 PM EST</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Format</h3>
                    <p className="text-gray-600">Hybrid: In-person and virtual attendance options</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ChartLine className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Topics Covered</h3>
                    <p className="text-gray-600">Market analysis, stock picks, trading strategies, and Q&A</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3Njc0OTM1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="rounded-xl shadow-lg"
              />
              <div className="mt-6 bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Typical Meeting Agenda</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Market recap and key news (15 min)</li>
                  <li>• Member stock pitches (20 min)</li>
                  <li>• Strategy discussion (20 min)</li>
                  <li>• Q&A and networking (15 min)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Members Say</h2>
            <p className="text-xl text-blue-100">
              Hear from investors who've grown their skills with us
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "This group has transformed my approach to investing. The weekly discussions keep me informed and accountable. Best investment I've made!"
              </p>
              <div>
                <div className="font-bold text-gray-900">Sarah Chen</div>
                <div className="text-gray-500 text-sm">Member since 2022</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The diversity of perspectives here is incredible. I've learned strategies I never would have discovered on my own. Highly recommend!"
              </p>
              <div>
                <div className="font-bold text-gray-900">Michael Rodriguez</div>
                <div className="text-gray-500 text-sm">Member since 2021</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As a beginner, I was nervous to join, but everyone was so welcoming. I've grown my portfolio and my confidence significantly."
              </p>
              <div>
                <div className="font-bold text-gray-900">Emily Thompson</div>
                <div className="text-gray-500 text-sm">Member since 2023</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="join" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Take the next step in your investing journey. Connect with experienced traders and grow your wealth through collaborative learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Apply for Membership
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 transition-colors">
              Attend a Free Session
            </button>
          </div>
          <p className="text-gray-500 mt-6">
            No credit card required • Cancel anytime • First session is free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <span className="font-semibold">Invest Collective</span>
              </div>
              <p className="text-gray-400 text-sm">
                Building better investors through collaboration and shared knowledge.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#meetings" className="hover:text-white transition-colors">Meetings</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#join" className="hover:text-white transition-colors">Join Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>info@investcollective.com</li>
                <li>(555) 123-4567</li>
                <li>123 Market Street</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Invest Collective. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
