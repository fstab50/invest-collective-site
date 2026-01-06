import { getCloudflareContext } from '@opennextjs/cloudflare';
import Link from 'next/link';
import { FileText, Calendar, Tag, Download } from 'lucide-react';

// Note: Do not use 'edge' runtime with OpenNext Cloudflare
// The worker runtime is automatically used for all routes

interface Article {
  id: number;
  slug: string;
  title: string;
  date: string;
  topics: string;
  summary: string;
  pdf_url: string;
}

async function getArticles(): Promise<Article[]> {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const { results } = await DB.prepare(
      'SELECT id, slug, title, date, topics, summary, pdf_url FROM articles ORDER BY date DESC',
    ).all<Article>();

    return results || [];
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export default async function ResearchPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Library</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In-depth market analysis, investment theses, and economic research from our community.
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No research articles published yet.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const topics = JSON.parse(article.topics) as string[];

              return (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>

                    {/* Title */}
                    <Link href={`/research/${article.slug}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                    </Link>

                    {/* Summary */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>

                    {/* Topics */}
                    <div className="flex items-start gap-2 mb-4">
                      <Tag className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        {topics.map((topic, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <Link
                        href={`/research/${article.slug}`}
                        className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                      >
                        Read Article
                      </Link>
                      <a
                        href={article.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
