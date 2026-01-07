'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { headers } from 'next/headers';

type EventType = 'page_view' | 'article_view' | 'pdf_download' | 'topic_filter';

interface AnalyticsEvent {
  event_type: EventType;
  page_path?: string;
  article_slug?: string;
  topic?: string;
}

export async function trackEvent(event: AnalyticsEvent) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const cfCountry = headersList.get('cf-ipcountry') || '';
    const referrer = headersList.get('referer') || '';

    await DB.prepare(
      `INSERT INTO analytics_events (event_type, page_path, article_slug, topic, user_agent, country, referrer)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        event.event_type,
        event.page_path || null,
        event.article_slug || null,
        event.topic || null,
        userAgent,
        cfCountry,
        referrer,
      )
      .run();

    return { success: true };
  } catch (error) {
    console.error('Analytics tracking error:', error);
    // Don't fail the page if analytics fails
    return { success: false };
  }
}

export async function getAnalyticsSummary(days = 30) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffDateStr = cutoffDate.toISOString();

    // Total events
    const totalEvents = await DB.prepare(
      `SELECT COUNT(*) as count FROM analytics_events WHERE timestamp >= ?`,
    )
      .bind(cutoffDateStr)
      .first<{ count: number }>();

    // Article views
    const articleViews = await DB.prepare(
      `SELECT COUNT(*) as count FROM analytics_events
       WHERE event_type = 'article_view' AND timestamp >= ?`,
    )
      .bind(cutoffDateStr)
      .first<{ count: number }>();

    // PDF downloads
    const pdfDownloads = await DB.prepare(
      `SELECT COUNT(*) as count FROM analytics_events
       WHERE event_type = 'pdf_download' AND timestamp >= ?`,
    )
      .bind(cutoffDateStr)
      .first<{ count: number }>();

    // Page views
    const pageViews = await DB.prepare(
      `SELECT COUNT(*) as count FROM analytics_events
       WHERE event_type = 'page_view' AND timestamp >= ?`,
    )
      .bind(cutoffDateStr)
      .first<{ count: number }>();

    // Top pages
    const topPages = await DB.prepare(
      `SELECT page_path, COUNT(*) as views
       FROM analytics_events
       WHERE event_type = 'page_view' AND page_path IS NOT NULL AND timestamp >= ?
       GROUP BY page_path
       ORDER BY views DESC
       LIMIT 10`,
    )
      .bind(cutoffDateStr)
      .all<{ page_path: string; views: number }>();

    // Top articles
    const topArticles = await DB.prepare(
      `SELECT article_slug, COUNT(*) as views
       FROM analytics_events
       WHERE event_type = 'article_view' AND article_slug IS NOT NULL AND timestamp >= ?
       GROUP BY article_slug
       ORDER BY views DESC
       LIMIT 10`,
    )
      .bind(cutoffDateStr)
      .all<{ article_slug: string; views: number }>();

    // Top topics
    const topTopics = await DB.prepare(
      `SELECT topic, COUNT(*) as clicks
       FROM analytics_events
       WHERE event_type = 'topic_filter' AND topic IS NOT NULL AND timestamp >= ?
       GROUP BY topic
       ORDER BY clicks DESC
       LIMIT 10`,
    )
      .bind(cutoffDateStr)
      .all<{ topic: string; clicks: number }>();

    // Events by day (last 30 days)
    const eventsByDay = await DB.prepare(
      `SELECT DATE(timestamp) as date, COUNT(*) as count
       FROM analytics_events
       WHERE timestamp >= ?
       GROUP BY DATE(timestamp)
       ORDER BY date DESC
       LIMIT 30`,
    )
      .bind(cutoffDateStr)
      .all<{ date: string; count: number }>();

    return {
      summary: {
        totalEvents: totalEvents?.count || 0,
        pageViews: pageViews?.count || 0,
        articleViews: articleViews?.count || 0,
        pdfDownloads: pdfDownloads?.count || 0,
      },
      topPages: topPages.results || [],
      topArticles: topArticles.results || [],
      topTopics: topTopics.results || [],
      eventsByDay: eventsByDay.results || [],
    };
  } catch (error) {
    console.error('Analytics summary error:', error);
    return {
      summary: { totalEvents: 0, pageViews: 0, articleViews: 0, pdfDownloads: 0 },
      topPages: [],
      topArticles: [],
      topTopics: [],
      eventsByDay: [],
    };
  }
}
