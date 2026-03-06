import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
        });

      if (profileError) throw profileError;

      await initializeDefaultData(data.user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const initializeDefaultData = async (userId: string) => {
    const defaultCategories = [
      { name: 'Food & Dining', type: 'expense', color: '#10b981', icon: 'Utensils' },
      { name: 'Transportation', type: 'expense', color: '#3b82f6', icon: 'Car' },
      { name: 'Shopping', type: 'expense', color: '#8b5cf6', icon: 'ShoppingBag' },
      { name: 'Entertainment', type: 'expense', color: '#f59e0b', icon: 'Film' },
      { name: 'Bills & Utilities', type: 'expense', color: '#ef4444', icon: 'Receipt' },
      { name: 'Healthcare', type: 'expense', color: '#ec4899', icon: 'Heart' },
      { name: 'Salary', type: 'income', color: '#14b8a6', icon: 'Wallet' },
      { name: 'Freelance', type: 'income', color: '#06b6d4', icon: 'Briefcase' },
      { name: 'Investments', type: 'income', color: '#6366f1', icon: 'TrendingUp' },
    ];

    await supabase.from('categories').insert(
      defaultCategories.map(cat => ({
        ...cat,
        user_id: userId,
        is_default: true,
      }))
    );

    await supabase.from('accounts').insert({
      user_id: userId,
      name: 'Main Account',
      type: 'checking',
      balance: 0,
      color: '#3b82f6',
    });
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
