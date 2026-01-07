import { getCloudflareContext } from '@opennextjs/cloudflare';
import Link from 'next/link';
import { ChevronLeft, Calendar, Tag, Download, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

// Note: Do not use 'edge' runtime with OpenNext Cloudflare
// The worker runtime is automatically used for all routes

interface Article {
  id: number;
  slug: string;
  title: string;
  date: string;
  topics: string;
  summary: string;
  html_content: string;
  pdf_url: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const { results } = await DB.prepare(
      `SELECT id, slug, title, date, topics, summary, html_content, pdf_url
       FROM articles
       WHERE slug = ? AND status = 'published'`,
    )
      .bind(slug)
      .all<Article>();

    return results?.[0] || null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const topics = JSON.parse(article.topics) as string[];

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      {/* Track article view */}
      <AnalyticsTracker event_type="article_view" article_slug={article.slug} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Research</span>
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>

            <p className="text-xl text-gray-600 mb-6">{article.summary}</p>

            {/* Topics */}
            <div className="flex items-start gap-2">
              <Tag className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: article.html_content }}
            />
          </div>

          {/* Footer - Download PDF */}
          <div className="p-8 md:p-12 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Download Full Presentation</h3>
                  <p className="text-sm text-gray-600">Access the complete PDF with all details and charts</p>
                </div>
              </div>
              <a
                href={article.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </div>
          </div>
        </article>

        {/* Related Articles Section (placeholder for future) */}
        <div className="mt-12 text-center">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            View All Research Articles →
          </Link>
        </div>
      </div>
    </div>
  );
}
