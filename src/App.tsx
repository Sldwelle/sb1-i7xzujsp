import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
import { TeamAccessBanner } from './components/TeamAccessBanner';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Target,
  Receipt,
  PieChart,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  LogOut,
  Sparkles,
  Home,
  Award,
  Flame,
  Star,
  Crown,
  Trophy,
  Zap,
  CheckCircle2,
} from 'lucide-react';

function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activePreview, setActivePreview] = useState<'tracking' | 'goals' | 'ai' | null>(null);
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Wallet className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                BudgetFlow
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Master Your Money,<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Achieve Your Goals
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Track expenses effortlessly, set smart budgets, and get AI-powered insights
              to save more and spend wisely.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <button
                onClick={() => setActivePreview(activePreview === 'tracking' ? null : 'tracking')}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer border-2 border-transparent hover:border-emerald-400"
              >
                <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Smart Tracking</p>
              </button>
              <button
                onClick={() => setActivePreview(activePreview === 'goals' ? null : 'goals')}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer border-2 border-transparent hover:border-teal-400"
              >
                <Target className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Goal Setting</p>
              </button>
              <button
                onClick={() => setActivePreview(activePreview === 'ai' ? null : 'ai')}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer border-2 border-transparent hover:border-cyan-400"
              >
                <Sparkles className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">AI Insights</p>
              </button>
            </div>

            {activePreview && (
              <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-emerald-200 animate-in fade-in slide-in-from-top-4 duration-300">
                {activePreview === 'tracking' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                      Smart Transaction Tracking
                    </h3>
                    <p className="text-gray-600">Effortlessly log every expense and income in seconds</p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg border border-red-200">
                        <ArrowDownRight className="w-5 h-5 text-red-600" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Coffee Shop</p>
                          <p className="text-xs text-gray-600">Food & Dining</p>
                        </div>
                        <p className="font-bold text-red-600">-$4.50</p>
                      </div>

                      <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Freelance Project</p>
                          <p className="text-xs text-gray-600">Income</p>
                        </div>
                        <p className="font-bold text-green-600">+$250.00</p>
                      </div>

                      <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg border border-red-200">
                        <ArrowDownRight className="w-5 h-5 text-red-600" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Netflix Subscription</p>
                          <p className="text-xs text-gray-600">Entertainment</p>
                        </div>
                        <p className="font-bold text-red-600">-$15.99</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly Total</span>
                        <span className="text-2xl font-bold text-emerald-600">+$229.51</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePreview === 'goals' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Target className="w-6 h-6 text-teal-600" />
                      Smart Goal Setting
                    </h3>
                    <p className="text-gray-600">Set budgets and savings goals with visual progress tracking</p>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">Groceries Budget</p>
                            <p className="text-sm text-gray-600">$320 of $400</p>
                          </div>
                          <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-bold">80%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">Vacation Fund</p>
                            <p className="text-sm text-gray-600">$1,850 of $3,000</p>
                          </div>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">62%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" style={{ width: '62%' }}></div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">Emergency Fund</p>
                            <p className="text-sm text-gray-600">$4,500 of $10,000</p>
                          </div>
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-bold">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activePreview === 'ai' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-cyan-600" />
                      AI-Powered Insights
                    </h3>
                    <p className="text-gray-600">Get personalized recommendations to optimize your spending</p>

                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
                        <div className="flex items-start gap-3">
                          <div className="bg-cyan-500 rounded-full p-2">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Spending Pattern Detected</p>
                            <p className="text-sm text-gray-700">You spend 40% more on dining out on weekends. Consider meal prepping to save $120/month.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
                        <div className="flex items-start gap-3">
                          <div className="bg-emerald-500 rounded-full p-2">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Savings Opportunity</p>
                            <p className="text-sm text-gray-700">Your grocery spending decreased by 15% this month. Great job! Keep it up to reach your vacation goal faster.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 rounded-full p-2">
                            <AlertCircle className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Budget Alert</p>
                            <p className="text-sm text-gray-700">You're 80% through your entertainment budget with 10 days left. Consider free activities this week.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {isSignUp ? 'Start your financial journey' : 'Continue managing your finances'}
                </p>
              </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              <p className="text-center text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Start free, upgrade when you need more</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-2">forever</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Up to 3 budget goals</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">100 transactions per month</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">2 account connections</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic AI insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Gamification with achievements</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Mobile responsive design</span>
                </div>
              </div>

              <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                Get Started Free
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 border-2 border-emerald-400 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Crown className="w-4 h-4" />
              POPULAR
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white">Premium</h3>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">$9.99</span>
                  <span className="text-emerald-100 ml-2">/month</span>
                </div>
                <p className="text-emerald-100 mt-2">or $99/year (save 17%)</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Everything in Free, plus:</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Unlimited budget goals</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Unlimited transactions</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Unlimited account connections</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Advanced AI spending coach</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Custom categories & tags</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Export data (CSV, PDF)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Priority support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Early access to new features</span>
                </div>
              </div>

              <button className="w-full bg-white text-emerald-600 font-bold py-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
                Start Premium Trial
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            All plans include 256-bit encryption, automatic backups, and 99.9% uptime guarantee
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [budgetGoals, setBudgetGoals] = useState<any[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState<any[]>([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddSavings, setShowAddSavings] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    account_id: '',
    category_id: '',
    amount: '',
    type: 'expense',
    description: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [newBudget, setNewBudget] = useState({
    category_id: '',
    amount: '',
    period: 'monthly',
  });

  const [newSavings, setNewSavings] = useState({
    name: '',
    target_amount: '',
    deadline: '',
    color: '#3b82f6',
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    const [transData, accData, catData, budData, savData, statsData, achData, userAchData] = await Promise.all([
      supabase
        .from('transactions')
        .select('*, categories(name, color, icon), accounts(name)')
        .eq('user_id', user!.id)
        .order('date', { ascending: false })
        .limit(100),
      supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user!.id)
        .eq('is_active', true),
      supabase
        .from('categories')
        .select('*')
        .eq('user_id', user!.id)
        .order('name'),
      supabase
        .from('budget_goals')
        .select('*, categories(name, color, icon)')
        .eq('user_id', user!.id)
        .eq('is_active', true),
      supabase
        .from('savings_goals')
        .select('*')
        .eq('user_id', user!.id)
        .eq('is_completed', false),
      supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle(),
      supabase
        .from('achievements')
        .select('*')
        .order('tier', { ascending: true }),
      supabase
        .from('user_achievements')
        .select('*, achievements(*)')
        .eq('user_id', user!.id)
        .order('unlocked_at', { ascending: false }),
    ]);

    if (transData.data) setTransactions(transData.data);
    if (accData.data) setAccounts(accData.data);
    if (catData.data) setCategories(catData.data);
    if (budData.data) setBudgetGoals(budData.data);
    if (savData.data) setSavingsGoals(savData.data);
    if (statsData.data) setUserStats(statsData.data);
    if (achData.data) setAchievements(achData.data);
    if (userAchData.data) setUserAchievements(userAchData.data);

    if (!statsData.data) {
      await supabase.from('user_stats').insert({
        user_id: user!.id,
      });
      const { data } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();
      if (data) setUserStats(data);
    }
  };

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('transactions').insert({
        user_id: user!.id,
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
      });

      if (error) throw error;

      const account = accounts.find(a => a.id === newTransaction.account_id);
      if (account) {
        const newBalance = newTransaction.type === 'income'
          ? account.balance + parseFloat(newTransaction.amount)
          : account.balance - parseFloat(newTransaction.amount);

        await supabase
          .from('accounts')
          .update({ balance: newBalance })
          .eq('id', newTransaction.account_id);
      }

      setShowAddTransaction(false);
      setNewTransaction({
        account_id: '',
        category_id: '',
        amount: '',
        type: 'expense',
        description: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
      loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addBudgetGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('budget_goals').insert({
        user_id: user!.id,
        ...newBudget,
        amount: parseFloat(newBudget.amount),
      });

      if (error) throw error;

      setShowAddBudget(false);
      setNewBudget({ category_id: '', amount: '', period: 'monthly' });
      loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSavingsGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('savings_goals').insert({
        user_id: user!.id,
        ...newSavings,
        target_amount: parseFloat(newSavings.target_amount),
      });

      if (error) throw error;

      setShowAddSavings(false);
      setNewSavings({ name: '', target_amount: '', deadline: '', color: '#3b82f6' });
      loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAIInsight = async () => {
    if (!aiQuery.trim()) return;

    setLoading(true);
    try {
      const currentDate = new Date();
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const monthTransactions = transactions.filter(t =>
        new Date(t.date) >= firstDay
      );

      const totalIncome = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const totalExpenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const categorySpending: any = {};
      monthTransactions
        .filter(t => t.type === 'expense' && t.categories)
        .forEach(t => {
          const catName = t.categories.name;
          categorySpending[catName] = (categorySpending[catName] || 0) + parseFloat(t.amount);
        });

      let response = '';

      if (aiQuery.toLowerCase().includes('track') || aiQuery.toLowerCase().includes('on track')) {
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : '0';
        response = `Based on this month's data: You've earned $${totalIncome.toFixed(2)} and spent $${totalExpenses.toFixed(2)}, saving ${savingsRate}% of your income. `;

        if (parseFloat(savingsRate) >= 20) {
          response += "Excellent work! You're saving well above the recommended 20% threshold.";
        } else if (parseFloat(savingsRate) >= 10) {
          response += "Good progress! Try to increase your savings rate toward 20%.";
        } else {
          response += "Consider reviewing your expenses to increase your savings rate.";
        }
      } else if (aiQuery.toLowerCase().includes('spending') || aiQuery.toLowerCase().includes('spend')) {
        const topCategories = Object.entries(categorySpending)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 3);

        response = `Your top spending categories this month:\n`;
        topCategories.forEach(([cat, amount]: any, idx) => {
          response += `${idx + 1}. ${cat}: $${amount.toFixed(2)}\n`;
        });

        response += `\nConsider setting budget goals for these categories to control spending.`;
      } else if (aiQuery.toLowerCase().includes('save') || aiQuery.toLowerCase().includes('saving')) {
        const netSavings = totalIncome - totalExpenses;
        response = `This month you're ${netSavings >= 0 ? 'saving' : 'overspending by'} $${Math.abs(netSavings).toFixed(2)}. `;

        if (netSavings > 0) {
          response += `Great job! Consider allocating this to your savings goals.`;
        } else {
          response += `Review your expenses and identify areas to cut back.`;
        }
      } else {
        response = `Based on your recent activity:\n\n- Total Income: $${totalIncome.toFixed(2)}\n- Total Expenses: $${totalExpenses.toFixed(2)}\n- Net Savings: $${(totalIncome - totalExpenses).toFixed(2)}\n\nAsk me specific questions like "Am I on track?", "Where am I spending most?", or "How can I save more?"`;
      }

      setAiResponse(response);

      await supabase.from('ai_insights').insert({
        user_id: user!.id,
        query: aiQuery,
        response: response,
        insight_type: 'spending_analysis',
      });
    } catch (err: any) {
      setAiResponse('Error generating insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentMonth = new Date();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

  const monthTransactions = transactions.filter(t =>
    new Date(t.date) >= firstDay
  );

  const totalIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  const totalAccountBalance = accounts.reduce((sum, a) => sum + parseFloat(a.balance), 0);

  const expenseCategories: any = {};
  monthTransactions
    .filter(t => t.type === 'expense' && t.categories)
    .forEach(t => {
      const catName = t.categories.name;
      expenseCategories[catName] = (expenseCategories[catName] || 0) + parseFloat(t.amount);
    });

  const topExpenseCategories = Object.entries(expenseCategories)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 5);

  const budgetProgress = budgetGoals.map(goal => {
    const spent = monthTransactions
      .filter(t => t.type === 'expense' && t.category_id === goal.category_id)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const percentage = (spent / goal.amount) * 100;
    const isOverBudget = percentage > goal.alert_threshold * 100;

    return { ...goal, spent, percentage: Math.min(percentage, 100), isOverBudget };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                BudgetFlow
              </span>
              {!userStats?.is_premium && (
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full hover:shadow-lg transition-all flex items-center gap-1"
                >
                  <Crown className="w-3 h-3" />
                  Go Premium
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {userStats && (
                <div className="flex items-center gap-3 mr-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowAchievements(true)}>
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-lg">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-600 font-medium">Level {userStats.level}</div>
                      <div className="text-xs text-gray-500">{userStats.experience_points} XP</div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-emerald-300"></div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div className="text-left">
                      <div className="text-xs text-gray-600 font-medium">{userStats.current_streak} day streak</div>
                      <div className="text-xs text-gray-500">Best: {userStats.longest_streak}</div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-emerald-300"></div>
                  <button
                    onClick={() => setShowAchievements(true)}
                    className="flex items-center gap-1 hover:bg-emerald-100 px-2 py-1 rounded-lg transition-colors"
                  >
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span className="text-xs font-bold text-gray-700">{userAchievements.length}/{achievements.length}</span>
                  </button>
                </div>
              )}
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('transactions')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeView === 'transactions'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Receipt className="w-4 h-4 inline mr-2" />
                Transactions
              </button>
              <button
                onClick={() => setActiveView('budgets')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeView === 'budgets'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Target className="w-4 h-4 inline mr-2" />
                Budgets
              </button>
              <button
                onClick={() => setShowAICoach(true)}
                className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI Coach
              </button>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-all"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TeamAccessBanner />
        {activeView === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => setShowAddTransaction(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Transaction
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Balance</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      ${totalAccountBalance.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <Wallet className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500">Across all accounts</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Income</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-1">
                      ${totalIncome.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-sm text-emerald-600 flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  This month
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expenses</p>
                    <p className="text-3xl font-bold text-red-600 mt-1">
                      ${totalExpenses.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-xl">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <ArrowDownRight className="w-4 h-4" />
                  This month
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Net Savings</p>
                    <p className={`text-3xl font-bold mt-1 ${netBalance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      ${Math.abs(netBalance).toFixed(2)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${netBalance >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                    <DollarSign className={`w-6 h-6 ${netBalance >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
                  </div>
                </div>
                <p className={`text-sm flex items-center gap-1 ${netBalance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {netBalance >= 0 ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {netBalance >= 0 ? 'Great job!' : 'Overspending'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-600" />
                  Spending by Category
                </h2>
                {topExpenseCategories.length > 0 ? (
                  <div className="space-y-4">
                    {topExpenseCategories.map(([category, amount]: any) => {
                      const percentage = (amount / totalExpenses) * 100;
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">{category}</span>
                            <span className="text-gray-900 font-semibold">
                              ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No expense data yet</p>
                )}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    Accounts
                  </h2>
                </div>
                <div className="space-y-3">
                  {accounts.map(account => (
                    <div
                      key={account.id}
                      className="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all"
                      style={{ borderLeftWidth: '4px', borderLeftColor: account.color }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">{account.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{account.type}</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          ${parseFloat(account.balance).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {budgetProgress.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    Budget Goals
                  </h2>
                  <button
                    onClick={() => setShowAddBudget(true)}
                    className="text-sm px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-all"
                  >
                    <Plus className="w-4 h-4 inline mr-1" />
                    Add Goal
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {budgetProgress.map(budget => (
                    <div
                      key={budget.id}
                      className={`p-4 rounded-xl border-2 ${
                        budget.isOverBudget ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">{budget.categories.name}</p>
                        {budget.isOverBudget && <AlertCircle className="w-5 h-5 text-red-600" />}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                          </span>
                          <span className={`font-semibold ${budget.isOverBudget ? 'text-red-600' : 'text-emerald-600'}`}>
                            {budget.percentage.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              budget.isOverBudget
                                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            }`}
                            style={{ width: `${budget.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {savingsGoals.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    Savings Goals
                  </h2>
                  <button
                    onClick={() => setShowAddSavings(true)}
                    className="text-sm px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-all"
                  >
                    <Plus className="w-4 h-4 inline mr-1" />
                    Add Goal
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savingsGoals.map(goal => {
                    const percentage = (goal.current_amount / goal.target_amount) * 100;
                    return (
                      <div key={goal.id} className="p-4 rounded-xl border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-2">{goal.name}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              ${goal.current_amount.toFixed(2)} / ${goal.target_amount.toFixed(2)}
                            </span>
                            <span className="font-semibold text-emerald-600">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          {goal.deadline && (
                            <p className="text-xs text-gray-500">
                              Deadline: {new Date(goal.deadline).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-600" />
                Recent Transactions
              </h2>
              <div className="space-y-2">
                {transactions.slice(0, 5).map(transaction => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          transaction.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <TrendingUp className={`w-5 h-5 text-emerald-600`} />
                        ) : (
                          <TrendingDown className={`w-5 h-5 text-red-600`} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.categories?.name || 'Uncategorized'} •{' '}
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'transactions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">All Transactions</h1>
              <button
                onClick={() => setShowAddTransaction(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Transaction
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="space-y-2">
                {transactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          transaction.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <TrendingUp className={`w-5 h-5 text-emerald-600`} />
                        ) : (
                          <TrendingDown className={`w-5 h-5 text-red-600`} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.categories?.name || 'Uncategorized'} •{' '}
                          {transaction.accounts?.name} •{' '}
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        {transaction.notes && (
                          <p className="text-sm text-gray-400 mt-1">{transaction.notes}</p>
                        )}
                      </div>
                    </div>
                    <p
                      className={`text-xl font-bold ${
                        transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'budgets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Budget Goals</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddSavings(true)}
                  className="px-6 py-3 bg-white text-emerald-700 border-2 border-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Savings Goal
                </button>
                <button
                  onClick={() => setShowAddBudget(true)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Budget Goal
                </button>
              </div>
            </div>

            {budgetProgress.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Active Budgets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {budgetProgress.map(budget => (
                    <div
                      key={budget.id}
                      className={`p-6 rounded-xl border-2 ${
                        budget.isOverBudget ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-gray-900">{budget.categories.name}</p>
                        {budget.isOverBudget && <AlertCircle className="w-6 h-6 text-red-600" />}
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Spent</span>
                          <span className="font-semibold text-gray-900">
                            ${budget.spent.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Budget</span>
                          <span className="font-semibold text-gray-900">
                            ${budget.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              budget.isOverBudget
                                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            }`}
                            style={{ width: `${budget.percentage}%` }}
                          />
                        </div>
                        <p className={`text-center font-semibold ${
                          budget.isOverBudget ? 'text-red-600' : 'text-emerald-600'
                        }`}>
                          {budget.percentage.toFixed(0)}% Used
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {savingsGoals.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Savings Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savingsGoals.map(goal => {
                    const percentage = (goal.current_amount / goal.target_amount) * 100;
                    const remaining = goal.target_amount - goal.current_amount;
                    return (
                      <div key={goal.id} className="p-6 rounded-xl border border-gray-200">
                        <p className="text-lg font-bold text-gray-900 mb-3">{goal.name}</p>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Current</span>
                            <span className="font-semibold text-gray-900">
                              ${goal.current_amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Target</span>
                            <span className="font-semibold text-gray-900">
                              ${goal.target_amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          <div className="pt-2 space-y-1">
                            <p className="text-center font-semibold text-emerald-600">
                              {percentage.toFixed(0)}% Complete
                            </p>
                            <p className="text-center text-sm text-gray-600">
                              ${remaining.toFixed(2)} remaining
                            </p>
                            {goal.deadline && (
                              <p className="text-center text-xs text-gray-500">
                                Due: {new Date(goal.deadline).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {showAddTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Transaction</h2>
            <form onSubmit={addTransaction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'income' | 'expense' })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                    required
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  placeholder="Coffee at Starbucks"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Account</label>
                  <select
                    value={newTransaction.account_id}
                    onChange={(e) => setNewTransaction({ ...newTransaction, account_id: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                    required
                  >
                    <option value="">Select account</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={newTransaction.category_id}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category_id: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    {categories
                      .filter(cat => cat.type === newTransaction.type)
                      .map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTransaction(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddBudget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Budget Goal</h2>
            <form onSubmit={addBudgetGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={newBudget.category_id}
                  onChange={(e) => setNewBudget({ ...newBudget, category_id: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  required
                >
                  <option value="">Select category</option>
                  {categories
                    .filter(cat => cat.type === 'expense')
                    .map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  placeholder="500.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Period</label>
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  required
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddBudget(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddSavings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Savings Goal</h2>
            <form onSubmit={addSavingsGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Name</label>
                <input
                  type="text"
                  value={newSavings.name}
                  onChange={(e) => setNewSavings({ ...newSavings, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  placeholder="Emergency Fund"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={newSavings.target_amount}
                  onChange={(e) => setNewSavings({ ...newSavings, target_amount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  placeholder="10000.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline (Optional)</label>
                <input
                  type="date"
                  value={newSavings.deadline}
                  onChange={(e) => setNewSavings({ ...newSavings, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddSavings(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAICoach && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Spending Coach</h2>
                  <p className="text-gray-600">Get personalized financial insights</p>
                </div>
              </div>
              <button
                onClick={() => setShowAICoach(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                <p className="text-gray-700 font-medium mb-3">Try asking:</p>
                <div className="space-y-2">
                  <button
                    onClick={() => { setAiQuery('Am I on track with my budget?'); }}
                    className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-emerald-50 transition-all text-sm font-medium text-gray-700"
                  >
                    Am I on track with my budget?
                  </button>
                  <button
                    onClick={() => { setAiQuery('Where am I spending the most?'); }}
                    className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-emerald-50 transition-all text-sm font-medium text-gray-700"
                  >
                    Where am I spending the most?
                  </button>
                  <button
                    onClick={() => { setAiQuery('How can I save more money?'); }}
                    className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-emerald-50 transition-all text-sm font-medium text-gray-700"
                  >
                    How can I save more money?
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Question</label>
                <textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                  rows={3}
                  placeholder="Ask me anything about your finances..."
                />
              </div>

              <button
                onClick={getAIInsight}
                disabled={loading || !aiQuery.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get AI Insights
                  </>
                )}
              </button>

              {aiResponse && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                  <div className="flex items-start gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">AI Insight</p>
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed">{aiResponse}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showAchievements && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
                  <p className="text-gray-600">You've unlocked {userAchievements.length} of {achievements.length} achievements</p>
                </div>
              </div>
              <button
                onClick={() => setShowAchievements(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {userStats && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 mb-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">Level {userStats.level}</p>
                    <p className="text-sm text-gray-600">Current Level</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{userStats.experience_points}</p>
                    <p className="text-sm text-gray-600">Total XP</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{userStats.longest_streak}</p>
                    <p className="text-sm text-gray-600">Best Streak</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{userAchievements.length}</p>
                    <p className="text-sm text-gray-600">Achievements</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {['bronze', 'silver', 'gold', 'platinum'].map((tier) => {
                const tierAchievements = achievements.filter((a) => a.tier === tier);
                const tierColors = {
                  bronze: 'from-orange-700 to-amber-600',
                  silver: 'from-gray-400 to-gray-500',
                  gold: 'from-yellow-500 to-yellow-600',
                  platinum: 'from-cyan-400 to-blue-500',
                };

                return (
                  <div key={tier}>
                    <h3 className={`text-lg font-bold mb-3 bg-gradient-to-r ${tierColors[tier as keyof typeof tierColors]} bg-clip-text text-transparent capitalize`}>
                      {tier} Tier
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tierAchievements.map((achievement) => {
                        const isUnlocked = userAchievements.some(
                          (ua) => ua.achievement_id === achievement.id
                        );
                        const iconMap: Record<string, any> = {
                          Zap, TrendingUp, Award, Trophy, Crown, Flame, Target, CheckCircle2, Star, PiggyBank: Wallet,
                        };
                        const IconComponent = iconMap[achievement.icon] || Award;

                        return (
                          <div
                            key={achievement.id}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              isUnlocked
                                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300'
                                : 'bg-gray-50 border-gray-200 opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`p-3 rounded-xl ${
                                  isUnlocked
                                    ? `bg-gradient-to-r ${tierColors[tier as keyof typeof tierColors]}`
                                    : 'bg-gray-300'
                                }`}
                              >
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-gray-900">{achievement.name}</h4>
                                  {isUnlocked && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Zap className="w-4 h-4 text-yellow-600" />
                                  <span className="text-xs font-bold text-gray-700">+{achievement.xp_reward} XP</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
                  <p className="text-gray-600">Unlock powerful features to supercharge your finances</p>
                </div>
              </div>
              <button
                onClick={() => setShowPremiumModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-2xl border-2 border-gray-200">
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">FREE PLAN</p>
                  <p className="text-4xl font-bold text-gray-900">$0</p>
                  <p className="text-gray-600 mt-1">Forever</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Up to 3 budget goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">100 transactions per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Basic AI insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">2 accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Basic categories</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-400 shadow-xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  RECOMMENDED
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold text-orange-700 mb-2">PREMIUM PLAN</p>
                  <div className="flex items-end justify-center gap-2">
                    <p className="text-4xl font-bold text-gray-900">$9.99</p>
                    <p className="text-gray-600 mb-1">/month</p>
                  </div>
                  <p className="text-gray-600 mt-1">or $99/year (save 17%)</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Unlimited budget goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Unlimited transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Advanced AI insights & forecasting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Unlimited accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Custom categories & icons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Export to CSV/PDF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Receipt attachments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Crown className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900 font-medium">Exclusive premium badge</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5" />
                  Upgrade to Premium
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
              <h3 className="font-bold text-gray-900 mb-3">Why Go Premium?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-600 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Smarter Insights</p>
                    <p className="text-xs text-gray-600 mt-1">Get AI-powered forecasting and spending predictions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-teal-600 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Unlimited Goals</p>
                    <p className="text-xs text-gray-600 mt-1">Track as many budgets and savings goals as you need</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-600 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Premium Features</p>
                    <p className="text-xs text-gray-600 mt-1">Export reports, attach receipts, and get priority support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MainApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Wallet className="w-16 h-16 text-emerald-600 mx-auto animate-pulse" />
          <p className="text-xl font-semibold text-gray-700">Loading BudgetFlow...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
