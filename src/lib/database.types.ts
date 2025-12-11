export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'user' | 'admin'
          is_active: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string
          role?: 'user' | 'admin'
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'user' | 'admin'
          is_active?: boolean
          created_at?: string
        }
      }
      links: {
        Row: {
          id: string
          user_id: string
          short_code: string
          original_url: string
          title: string
          password: string | null
          expires_at: string | null
          is_active: boolean
          clicks: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          short_code: string
          original_url: string
          title?: string
          password?: string | null
          expires_at?: string | null
          is_active?: boolean
          clicks?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          short_code?: string
          original_url?: string
          title?: string
          password?: string | null
          expires_at?: string | null
          is_active?: boolean
          clicks?: number
          created_at?: string
          updated_at?: string
        }
      }
      link_redirects: {
        Row: {
          id: string
          link_id: string
          country_code: string | null
          device_type: string | null
          redirect_url: string
          created_at: string
        }
        Insert: {
          id?: string
          link_id: string
          country_code?: string | null
          device_type?: string | null
          redirect_url: string
          created_at?: string
        }
        Update: {
          id?: string
          link_id?: string
          country_code?: string | null
          device_type?: string | null
          redirect_url?: string
          created_at?: string
        }
      }
      clicks: {
        Row: {
          id: string
          link_id: string
          country: string
          device: string
          browser: string
          referrer: string
          ip_address: string
          clicked_at: string
        }
        Insert: {
          id?: string
          link_id: string
          country?: string
          device?: string
          browser?: string
          referrer?: string
          ip_address?: string
          clicked_at?: string
        }
        Update: {
          id?: string
          link_id?: string
          country?: string
          device?: string
          browser?: string
          referrer?: string
          ip_address?: string
          clicked_at?: string
        }
      }
      bio_pages: {
        Row: {
          id: string
          user_id: string
          slug: string
          title: string
          description: string
          avatar_url: string
          theme_color: string
          background_type: string
          background_value: string
          blocks: Json
          is_published: boolean
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          slug: string
          title?: string
          description?: string
          avatar_url?: string
          theme_color?: string
          background_type?: string
          background_value?: string
          blocks?: Json
          is_published?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          slug?: string
          title?: string
          description?: string
          avatar_url?: string
          theme_color?: string
          background_type?: string
          background_value?: string
          blocks?: Json
          is_published?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      landing_pages: {
        Row: {
          id: string
          user_id: string
          slug: string
          title: string
          html_content: string
          meta_title: string
          meta_description: string
          og_image: string
          is_published: boolean
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          slug: string
          title?: string
          html_content?: string
          meta_title?: string
          meta_description?: string
          og_image?: string
          is_published?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          slug?: string
          title?: string
          html_content?: string
          meta_title?: string
          meta_description?: string
          og_image?: string
          is_published?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      multi_link_pages: {
        Row: {
          id: string
          user_id: string
          slug: string
          title: string
          description: string
          links: Json
          theme: Json
          is_published: boolean
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          slug: string
          title?: string
          description?: string
          links?: Json
          theme?: Json
          is_published?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          slug?: string
          title?: string
          description?: string
          links?: Json
          theme?: Json
          is_published?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      admin_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
