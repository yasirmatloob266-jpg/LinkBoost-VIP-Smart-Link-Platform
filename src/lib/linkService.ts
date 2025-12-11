import { supabase } from './supabase';
import { generateShortCode } from './utils';

export const linkService = {
  async createLink(data: {
    originalUrl: string;
    title?: string;
    customCode?: string;
    password?: string;
    expiresAt?: string;
  }) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    let shortCode = data.customCode || generateShortCode();

    const { data: existingLink } = await supabase
      .from('links')
      .select('short_code')
      .eq('short_code', shortCode)
      .maybeSingle();

    if (existingLink) {
      shortCode = generateShortCode(8);
    }

    const { data: link, error } = await supabase
      .from('links')
      .insert({
        user_id: user.data.user.id,
        short_code: shortCode,
        original_url: data.originalUrl,
        title: data.title || '',
        password: data.password || null,
        expires_at: data.expiresAt || null,
      })
      .select()
      .single();

    if (error) throw error;
    return link;
  },

  async updateLink(linkId: string, data: {
    originalUrl?: string;
    title?: string;
    password?: string;
    expiresAt?: string;
    isActive?: boolean;
  }) {
    const { data: link, error } = await supabase
      .from('links')
      .update({
        ...(data.originalUrl && { original_url: data.originalUrl }),
        ...(data.title !== undefined && { title: data.title }),
        ...(data.password !== undefined && { password: data.password }),
        ...(data.expiresAt !== undefined && { expires_at: data.expiresAt }),
        ...(data.isActive !== undefined && { is_active: data.isActive }),
      })
      .eq('id', linkId)
      .select()
      .single();

    if (error) throw error;
    return link;
  },

  async deleteLink(linkId: string) {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', linkId);

    if (error) throw error;
  },

  async getUserLinks() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getLinkByCode(shortCode: string) {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('short_code', shortCode)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getLinkAnalytics(linkId: string) {
    const { data, error } = await supabase
      .from('clicks')
      .select('*')
      .eq('link_id', linkId)
      .order('clicked_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async recordClick(linkId: string, clickData: {
    country?: string;
    device?: string;
    browser?: string;
    referrer?: string;
    ipAddress?: string;
  }) {
    const { error: clickError } = await supabase
      .from('clicks')
      .insert({
        link_id: linkId,
        country: clickData.country || '',
        device: clickData.device || '',
        browser: clickData.browser || '',
        referrer: clickData.referrer || '',
        ip_address: clickData.ipAddress || '',
      });

    if (clickError) console.error('Click recording error:', clickError);

    const { error: updateError } = await supabase.rpc('increment', {
      row_id: linkId,
    });

    if (updateError) {
      const { data: link } = await supabase
        .from('links')
        .select('clicks')
        .eq('id', linkId)
        .single();

      if (link) {
        await supabase
          .from('links')
          .update({ clicks: (link.clicks || 0) + 1 })
          .eq('id', linkId);
      }
    }
  },
};
