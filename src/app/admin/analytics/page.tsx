import { getAnalyticsSummary } from '@/lib/analytics';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import Link from 'next/link';
import { BarChart3, Eye, Download, Filter, TrendingUp, FileText, ChevronLeft } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
}

async function getArticleTitles(slugs: string[]): Promise<Map<string, string>> {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    if (slugs.length === 0) return new Map();

    const placeholders = slugs.map(() => '?').join(',');
    const { results } = await DB.prepare(
      `SELECT slug, title FROM articles WHERE slug IN (${placeholders})`,
    )
      .bind(...slugs)
      .all<Article>();

    const map = new Map<string, string>();
    results?.forEach((article) => {
      map.set(article.slug, article.title);
    });

    return map;
  } catch (error) {
    console.error('Failed to fetch article titles:', error);
    return new Map();
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalyticsSummary(30);
  const articleSlugs = analytics.topArticles.map((a) => a.article_slug);
  const articleTitles = await getArticleTitles(articleSlugs);

  const { summary, topPages, topArticles, topTopics, eventsByDay } = analytics;

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Admin Dashboard</span>
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <p className="text-gray-600">Research article performance over the last 30 days</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Page Views</h3>
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{summary.pageViews.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Article Views</h3>
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{summary.articleViews.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">PDF Downloads</h3>
              <Download className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{summary.pdfDownloads.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Events</h3>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{summary.totalEvents.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">All interactions</p>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Eye className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Most Viewed Pages</h2>
          </div>

          {topPages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No page views yet</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {topPages.map((page, index) => (
                <div key={page.page_path} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={page.page_path}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors block truncate"
                    >
                      {page.page_path === '/' ? 'Home' : page.page_path}
                    </Link>
                    <p className="text-sm text-gray-500">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Top Articles */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Most Viewed Articles</h2>
            </div>

            {topArticles.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No article views yet</p>
            ) : (
              <div className="space-y-4">
                {topArticles.map((article, index) => (
                  <div key={article.article_slug} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/research/${article.article_slug}`}
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors block truncate"
                      >
                        {articleTitles.get(article.article_slug) || article.article_slug}
                      </Link>
                      <p className="text-sm text-gray-500">{article.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Topics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Popular Topics</h2>
            </div>

            {topTopics.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No topic filters used yet</p>
            ) : (
              <div className="space-y-4">
                {topTopics.map((topic, index) => (
                  <div key={topic.topic} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/research?topic=${encodeURIComponent(topic.topic)}`}
                        className="font-medium text-gray-900 hover:text-green-600 transition-colors block truncate"
                      >
                        {topic.topic}
                      </Link>
                      <p className="text-sm text-gray-500">{topic.clicks} clicks</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Events by Day */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Activity Over Time</h2>
          </div>

          {eventsByDay.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No activity data yet</p>
          ) : (
            <div className="space-y-2">
              {eventsByDay.slice(0, 14).map((day) => {
                const maxCount = Math.max(...eventsByDay.map((d) => d.count));
                const width = maxCount > 0 ? (day.count / maxCount) * 100 : 0;

                return (
                  <div key={day.date} className="flex items-center gap-4">
                    <div className="text-sm text-gray-600 w-24 shrink-0">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: `${width}%` }}
                      />
                      <div className="absolute inset-0 flex items-center px-3">
                        <span className="text-sm font-medium text-gray-900">{day.count} events</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cloudflare Web Analytics Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Full Site Analytics</h3>
          <p className="text-blue-800 mb-4">
            For comprehensive site-wide analytics including page views, referrers, and visitor demographics, visit
            your Cloudflare Web Analytics dashboard.
          </p>
          <a
            href="https://dash.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Open Cloudflare Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}
