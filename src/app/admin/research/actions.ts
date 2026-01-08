'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from 'next/cache';

export async function updateArticle(formData: FormData) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const slug = formData.get('slug') as string;
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const topics = formData.get('topics') as string;
    const summary = formData.get('summary') as string;
    const htmlContent = formData.get('html_content') as string;

    if (!slug || !title || !date || !topics || !summary || !htmlContent) {
      return { success: false, error: 'Missing required fields' };
    }

    const topicsArray = topics.split(',').map((t) => t.trim());

    await DB.prepare(
      `UPDATE articles
       SET title = ?, date = ?, topics = ?, summary = ?, html_content = ?, updated_at = datetime('now')
       WHERE slug = ?`,
    )
      .bind(title, date, JSON.stringify(topicsArray), summary, htmlContent, slug)
      .run();

    revalidatePath('/research');
    revalidatePath(`/research/${slug}`);
    revalidatePath('/admin/research/manage');

    return {
      success: true,
      message: 'Article updated successfully',
    };
  } catch (error) {
    console.error('Update error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function toggleArticleStatus(slug: string, currentStatus: string) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const newStatus = currentStatus === 'published' ? 'draft' : 'published';

    await DB.prepare(
      `UPDATE articles
       SET status = ?, updated_at = datetime('now')
       WHERE slug = ?`,
    )
      .bind(newStatus, slug)
      .run();

    revalidatePath('/research');
    revalidatePath(`/research/${slug}`);
    revalidatePath('/admin/research/manage');

    return {
      success: true,
      status: newStatus,
      message: `Article ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
    };
  } catch (error) {
    console.error('Status toggle error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function deleteArticle(slug: string, pdfFilename: string) {
  try {
    const { env } = getCloudflareContext();
    const { DB, RESEARCH_PDFS } = env;

    // Delete from D1
    await DB.prepare('DELETE FROM articles WHERE slug = ?').bind(slug).run();

    // Delete PDF from R2
    await RESEARCH_PDFS.delete(pdfFilename);

    revalidatePath('/research');
    revalidatePath('/admin/research/manage');

    return {
      success: true,
      message: 'Article deleted successfully',
    };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
