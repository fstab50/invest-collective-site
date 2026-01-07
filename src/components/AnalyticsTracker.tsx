'use client';

import { useEffect } from 'react';

interface AnalyticsTrackerProps {
  event_type: 'article_view' | 'pdf_download' | 'topic_filter';
  article_slug?: string;
  topic?: string;
}

export function AnalyticsTracker({ event_type, article_slug, topic }: AnalyticsTrackerProps) {
  useEffect(() => {
    // Track the event
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, article_slug, topic }),
    }).catch(() => {
      // Silently fail - don't break the page if analytics fails
    });
  }, [event_type, article_slug, topic]);

  return null; // This component doesn't render anything
}
