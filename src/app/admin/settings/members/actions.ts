'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from 'next/cache';

/**
 * Update member details
 */
export async function updateMember(formData: FormData) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    const id = parseInt(formData.get('id') as string);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const years_investing = formData.get('years_investing') as string;
    const trading_style = formData.get('trading_style') as string;
    const areas_of_expertise = formData.get('areas_of_expertise') as string;
    const macro_knowledge = formData.get('macro_knowledge') as string;
    const portfolio_size = formData.get('portfolio_size') as string;
    const investment_journey = formData.get('investment_journey') as string;
    const expectations = formData.get('expectations') as string;
    const referral_source = formData.get('referral_source') as string;

    if (!id || !name || !email) {
      return { success: false, error: 'Missing required fields' };
    }

    await DB.prepare(
      `UPDATE members SET
        name = ?,
        email = ?,
        phone = ?,
        years_investing = ?,
        trading_style = ?,
        areas_of_expertise = ?,
        macro_knowledge = ?,
        portfolio_size = ?,
        investment_journey = ?,
        expectations = ?,
        referral_source = ?,
        updated_at = datetime('now')
      WHERE id = ?`,
    )
      .bind(
        name,
        email,
        phone,
        years_investing,
        trading_style,
        areas_of_expertise,
        macro_knowledge,
        portfolio_size,
        investment_journey,
        expectations,
        referral_source || null,
        id,
      )
      .run();

    revalidatePath('/admin/settings/members');
    revalidatePath(`/admin/settings/members/${id}`);

    return { success: true, message: 'Member updated successfully' };
  } catch (error) {
    console.error('Error updating member:', error);
    return { success: false, error: 'Failed to update member' };
  }
}

/**
 * Update member status (pending → approved → active)
 */
export async function updateMemberStatus(
  id: number,
  newStatus: 'pending' | 'approved' | 'active',
  reviewerName: string,
) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    // Build the UPDATE query based on the new status
    let query = 'UPDATE members SET status = ?, updated_at = datetime(\'now\')';
    const params: any[] = [newStatus];

    if (newStatus === 'approved') {
      query += ', reviewed_by = ?, reviewed_at = datetime(\'now\'), approved_at = datetime(\'now\')';
      params.push(reviewerName);
    } else if (newStatus === 'active') {
      query += ', activated_at = datetime(\'now\')';
    }

    query += ' WHERE id = ?';
    params.push(id);

    await DB.prepare(query).bind(...params).run();

    revalidatePath('/admin/settings/members');
    revalidatePath(`/admin/settings/members/${id}`);

    return {
      success: true,
      status: newStatus,
      message: `Member status updated to ${newStatus}`,
    };
  } catch (error) {
    console.error('Error updating member status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

/**
 * Add admin note to member
 */
export async function addMemberNote(id: number, note: string) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    if (!note || note.trim() === '') {
      return { success: false, error: 'Note cannot be empty' };
    }

    // Get current notes
    const member = await DB.prepare('SELECT admin_notes FROM members WHERE id = ?').bind(id).first<{
      admin_notes: string | null;
    }>();

    if (!member) {
      return { success: false, error: 'Member not found' };
    }

    // Append new note with timestamp
    const timestamp = new Date().toISOString();
    const newNote = `[${timestamp}] ${note}`;
    const updatedNotes = member.admin_notes ? `${member.admin_notes}\n\n${newNote}` : newNote;

    await DB.prepare('UPDATE members SET admin_notes = ?, updated_at = datetime(\'now\') WHERE id = ?')
      .bind(updatedNotes, id)
      .run();

    revalidatePath('/admin/settings/members');
    revalidatePath(`/admin/settings/members/${id}`);

    return { success: true, message: 'Note added successfully' };
  } catch (error) {
    console.error('Error adding note:', error);
    return { success: false, error: 'Failed to add note' };
  }
}

/**
 * Delete member
 */
export async function deleteMember(id: number) {
  try {
    const { env } = getCloudflareContext();
    const { DB } = env;

    await DB.prepare('DELETE FROM members WHERE id = ?').bind(id).run();

    revalidatePath('/admin/settings/members');

    return { success: true, message: 'Member deleted successfully' };
  } catch (error) {
    console.error('Error deleting member:', error);
    return { success: false, error: 'Failed to delete member' };
  }
}
