import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          currency?: string;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          currency?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'expense' | 'income';
          color: string;
          icon: string;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          type: 'expense' | 'income';
          color: string;
          icon: string;
          is_default?: boolean;
        };
        Update: {
          name?: string;
          color?: string;
          icon?: string;
        };
      };
      accounts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'checking' | 'savings' | 'credit' | 'cash' | 'investment';
          balance: number;
          currency: string;
          color: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          type: 'checking' | 'savings' | 'credit' | 'cash' | 'investment';
          balance?: number;
          currency?: string;
          color: string;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          balance?: number;
          is_active?: boolean;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          account_id: string;
          category_id: string | null;
          amount: number;
          type: 'income' | 'expense';
          description: string;
          date: string;
          notes: string | null;
          receipt_url: string | null;
          is_recurring: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          account_id: string;
          category_id?: string | null;
          amount: number;
          type: 'income' | 'expense';
          description: string;
          date?: string;
          notes?: string | null;
          receipt_url?: string | null;
          is_recurring?: boolean;
        };
        Update: {
          account_id?: string;
          category_id?: string | null;
          amount?: number;
          description?: string;
          date?: string;
          notes?: string | null;
        };
      };
      budget_goals: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          amount: number;
          period: 'weekly' | 'monthly' | 'yearly';
          start_date: string;
          alert_threshold: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          category_id: string;
          amount: number;
          period?: 'weekly' | 'monthly' | 'yearly';
          start_date?: string;
          alert_threshold?: number;
          is_active?: boolean;
        };
        Update: {
          amount?: number;
          period?: 'weekly' | 'monthly' | 'yearly';
          alert_threshold?: number;
          is_active?: boolean;
        };
      };
      savings_goals: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          target_amount: number;
          current_amount: number;
          deadline: string | null;
          color: string;
          is_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          target_amount: number;
          current_amount?: number;
          deadline?: string | null;
          color: string;
          is_completed?: boolean;
        };
        Update: {
          name?: string;
          target_amount?: number;
          current_amount?: number;
          deadline?: string | null;
          is_completed?: boolean;
        };
      };
      ai_insights: {
        Row: {
          id: string;
          user_id: string;
          query: string;
          response: string;
          insight_type: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          query: string;
          response: string;
          insight_type?: string | null;
        };
      };
      user_stats: {
        Row: {
          user_id: string;
          level: number;
          experience_points: number;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string | null;
          total_transactions: number;
          is_premium: boolean;
          premium_expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          level?: number;
          experience_points?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          total_transactions?: number;
          is_premium?: boolean;
          premium_expires_at?: string | null;
        };
        Update: {
          level?: number;
          experience_points?: number;
          current_streak?: number;
          longest_streak?: number;
          is_premium?: boolean;
          premium_expires_at?: string | null;
        };
      };
      achievements: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          xp_reward: number;
          requirement_type: string;
          requirement_value: number;
          tier: 'bronze' | 'silver' | 'gold' | 'platinum';
          created_at: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          user_id: string;
          achievement_id: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          full_name: string;
          role: string;
          is_active: boolean;
          joined_at: string;
          created_at: string;
        };
        Insert: {
          user_id?: string | null;
          email: string;
          full_name: string;
          role?: string;
          is_active?: boolean;
        };
        Update: {
          is_active?: boolean;
          role?: string;
        };
      };
      hackathon_config: {
        Row: {
          id: string;
          start_time: string;
          end_time: string;
          max_team_size: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
    };
    Functions: {
      is_co_owner: {
        Args: { user_uuid: string };
        Returns: boolean;
      };
      is_hackathon_active: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      can_edit_project: {
        Args: { user_uuid: string };
        Returns: boolean;
      };
    };
  };
};
